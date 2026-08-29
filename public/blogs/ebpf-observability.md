# eBPF-Based Observability: Monitoring Without the Overhead

Every engineering team faces the same tension: you want deep visibility into your systems, but every instrumentation point adds latency, memory overhead, and operational complexity. Traditional observability agents — sidecars, daemons, language-level tracers — all consume resources on the hosts they monitor.

At PhonePe, we explored a different approach: **eBPF (extended Berkeley Packet Filter)** — a kernel-level technology that lets you attach lightweight programs to system calls, network events, and kernel functions without modifying application code or restarting processes.

## Why eBPF?

The conventional model for observability looks like this:

```
Application → SDK/Agent → Collector → Backend
```

Every layer adds overhead. SDKs instrument every function call. Agents consume CPU and memory. In a fleet of 25,000+ servers, even a 2% overhead per host translates to hundreds of cores wasted.

eBPF flips this model:

```
Application → [kernel-attached eBPF program] → Userspace daemon → Backend
```

The eBPF programs run **inside the kernel**, attached to hooks like:

- **System calls** (`read`, `write`, `connect`, `accept`)
- **Network events** (TCP retransmits, connection drops)
- **Scheduler events** (context switches, run queue latency)
- **File system operations** (I/O latency, block device throughput)

No application code changes. No restarts. No SDK overhead.

## What We Built

### 1. Network-Level Request Visibility

One of our earliest wins was using eBPF to trace TCP connections at the kernel level. This gave us visibility into:

- **Request drops** at the proxy level that application-level APIs couldn't capture
- **Connection pool exhaustion** before it manifested as application errors
- **Network latency** between services, broken down by DNS resolution vs. actual TCP handshake vs. data transfer

```c
// Simplified eBPF program for tracing TCP connect events
SEC("kprobe/tcp_v4_connect")
int trace_tcp_connect(struct pt_regs *ctx) {
    u32 pid = bpf_get_current_pid_tgid() >> 32;
    // Record connection attempt with timestamp
    // Attach metadata: source IP, dest IP, dest port
    // Send to userspace via BPF ring buffer
    return 0;
}
```

### 2. File System and Disk I/O Profiling

When our bare-metal provisioning platform (Senzu) was slow during firmware uploads, eBPF helped us pinpoint the bottleneck without adding any tracing overhead:

```bash
# Using bpftrace to profile block I/O latency
bpftrace -e '
tracepoint:block:block_rq_complete {
    @us = hist(args->nr_sector);
}
interval:s:1 { print(@us); clear(@us); }
```

The output showed that 95th percentile I/O latency spiked during concurrent firmware writes — a finding that led us to implement write throttling in the upload pipeline.

### 3. Container-Aware Metrics

In a containerized environment, traditional metrics collection struggles with PID namespace isolation. eBPF operates at the kernel level, so it naturally sees through namespace boundaries:

- Map container IDs to network connections
- Track per-cgroup CPU and memory usage
- Correlate container restarts with kernel OOM events

## Integration with OpenTelemetry

The key insight was that eBPF doesn't replace OpenTelemetry — it **feeds** it. We built a lightweight userspace daemon that:

1. Reads events from eBPF maps
2. Transforms them into OpenTelemetry spans and metrics
3. Sends them to our existing OBX pipeline

This means all the correlation, dashboarding, and alerting infrastructure we built for application-level telemetry works seamlessly with kernel-level data.

## Lessons Learned

- **eBPF programs must be small and fast.** The kernel verifier limits instruction count and rejects programs with unbounded loops. This is a feature, not a bug — it forces you to think carefully about what data to collect.

- **BCC vs. libbpf vs. cilium/ebpf (Go):** We use `cilium/ebpf` for production Go services and `bpftrace` for ad-hoc investigation. BCC is great for prototyping but has higher startup overhead.

- **Kernel version matters.** eBPF features vary significantly between kernel versions. We standardize on kernel 5.10+ for our fleet to ensure access to features like BPF ring buffers and CO-RE (Compile Once, Run Everywhere).

- **Start with questions, not data.** The biggest temptation with eBPF is to collect everything. Instead, start with specific questions: "Why are requests slow between service A and B?" and build targeted probes.

## What's Next

We're exploring using eBPF for:

- **Runtime security monitoring** (detecting suspicious syscall patterns)
- **Automatic service dependency discovery** (no manual instrumentation needed)
- **Performance regression detection** (comparing kernel-level baselines across deployments)

The goal is a system where new services get observability for free — just deploy, and the kernel does the rest.

---

_This post reflects work done at PhonePe. The techniques and tools described are applicable to any large-scale distributed system running on Linux._
