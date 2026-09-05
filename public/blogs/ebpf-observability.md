# What eBPF Taught Me About Linux Observability

We had a production incident where requests were being dropped at the proxy layer. Application logs showed nothing — every request that reached the app was handled correctly. The problem was that some requests never reached the application at all.

Our existing observability stack — application-level metrics, APM agents, log aggregation — couldn't see it. The drops were happening in the kernel, below the layer where our instruments lived.

That's when I started looking at eBPF.

## The gap in observability

The conventional model for observability looks like this:

```
Application → SDK/Agent → Collector → Backend
```

Every layer adds overhead. SDKs instrument every function call. Agents consume CPU and memory. But more importantly: **if the problem happens below the application layer, application-level instruments can't see it.**

In our case, Nginx was dropping connections at the TCP level. The application never saw the request. Our APM agent, attached to the application process, had no visibility into what Nginx's kernel-level connection handling was doing.

## What eBPF changes

eBPF runs programs **inside the kernel**, attached to hooks like system calls, network events, and scheduler events. No application code changes. No restarts. No SDK overhead.

```
Application → [kernel-attached eBPF program] → Userspace daemon → Backend
```

For our problem, this meant we could trace TCP connect events at the kernel level:

```c
SEC("kprobe/tcp_v4_connect")
int trace_tcp_connect(struct pt_regs *ctx) {
    u32 pid = bpf_get_current_pid_tgid() >> 32;
    // Record connection attempt with timestamp
    // Attach metadata: source IP, dest IP, dest port
    // Send to userspace via BPF ring buffer
    return 0;
}
```

This gave us visibility into request drops at the proxy level — the exact layer where our problem was happening.

## What I built

I wrote a small eBPF-based tool that traces TCP connections at the kernel level. It captures:

- **Request drops** at the proxy level that application-level APIs can't see
- **Connection pool exhaustion** before it manifests as application errors
- **Network latency** broken down by DNS resolution, TCP handshake, and data transfer

The tool runs as a lightweight daemon. It attaches to kprobes on `tcp_v4_connect`, `tcp_v4_close`, and `tcp_retransmit_skb`. Events are sent to userspace via BPF ring buffers and forwarded to our existing Prometheus/Grafana stack.

## The overhead question

The biggest concern with any observability tool is overhead. eBPF programs run in the kernel, so a poorly written program can slow down every system call.

In practice, the overhead was negligible. Our eBPF programs are small — they read a few registers, copy a fixed-size struct to the ring buffer, and return. At 10,000 connections per second, the CPU overhead was under 0.1%.

Compare that to a userspace agent that polls `/proc/net/tcp` every second — that approach reads the entire TCP table repeatedly, which scales poorly with connection count.

## What I learned

eBPF didn't replace our existing observability stack. It filled a gap. Application-level instruments are still essential for understanding business logic, request flow, and application errors. But for infrastructure-level visibility — kernel events, network behavior, scheduler latency — eBPF gives you something that no userspace agent can: visibility without overhead.

The lesson wasn't "eBPF is better." The lesson was "observability has layers, and you need the right tool for each layer."
