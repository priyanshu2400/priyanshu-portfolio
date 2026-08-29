# Handling Multi-Process Python Workers for Metrics Collection

If you've ever deployed a Python web application with Gunicorn or uWSGI, you've probably hit this: **your OpenTelemetry metrics go silent after the first request.**

The root cause is subtle, and it took us a deep dive into Python's `os.fork()` semantics and OpenTelemetry's SDK internals to solve it properly. Here's the full story.

## The Problem

Gunicorn uses a pre-fork model: the master process forks worker processes to handle requests. This is great for concurrency, but it plays havoc with OpenTelemetry's metrics pipeline.

Here's what happens:

```
1. Master process starts
2. OTel SDK initializes → creates Meter, exports configured
3. Master forks worker processes
4. Workers inherit the parent's Meter object
5. Workers try to export metrics... but the connection belongs to the parent
6. Metrics go silent, or worse, get sent with wrong process context
```

The core issue: **after `fork()`, the child process inherits file descriptors, socket connections, and memory state from the parent — but these belong to the parent's context.** The OpenTelemetry SDK's meter and exporter are tied to the parent's connection, which the child can't safely use.

## Why Standard Solutions Don't Work

The OpenTelemetry docs suggest calling `MeterProvider.shutdown()` and creating a new one in the child. But this doesn't account for:

1. **PID drift** — Gunicorn's `preload_app` option loads the app in the master, then forks. If a worker crashes and is respawned, its PID changes, but any state tied to the old PID persists.

2. **In-flight metrics** — If a worker is mid-request when it forks (or when metrics are re-initialized), metrics can be double-counted or lost.

3. **Instrument registration** — Instruments (counters, histograms, etc.) registered before the fork carry stale references.

## Our Solution: Post-Fork Meter Re-initialization

We built a two-part solution:

### Part 1: Post-Fork Hook

Gunicorn provides a `post_fork` hook that runs in the child process after forking. We use this to tear down and recreate the OTel meter:

```python
# gunicorn_conf.py

def post_fork(server, worker):
    """Reinitialize OTel metrics after fork."""
    from opentelemetry import metrics
    from opentelemetry.sdk.metrics import MeterProvider
    from opentelemetry.sdk.metrics.export import PeriodicExportingMetricReader

    # Shutdown the inherited (stale) provider
    old_provider = metrics.get_meter_provider()
    if hasattr(old_provider, 'shutdown'):
        old_provider.shutdown()

    # Create fresh provider for this worker
    reader = PeriodicExportingMetricReader(
        exporter=OTLPMetricExporter(),
        export_interval_millis=30000,
    )
    new_provider = MeterProvider(metric_readers=[reader])
    metrics.set_meter_provider(new_provider)

    server.log.info(f"OTel metrics reinitialized for worker {worker.pid}")
```

### Part 2: PID Drift Detection

The deeper problem is that OpenTelemetry's `BatchSpanProcessor` and `PeriodicExportingMetricReader` spawn background threads. After `fork()`, these threads don't exist in the child — only the main thread survives. But if the child tries to use objects that reference the parent's threads, you get deadlocks or silent failures.

We added a PID check at export time:

```python
import os
import threading

class PIDAwareMetricReader:
    """Wraps a metric reader to detect PID drift after fork."""

    def __init__(self, inner_reader):
        self._inner = inner_reader
        self._pid = os.getpid()
        self._lock = threading.Lock()

    def collect(self, callback):
        current_pid = os.getpid()

        if current_pid != self._pid:
            # PID changed — we're in a forked child with stale state
            self._reinitialize()

        return self._inner.collect(callback)

    def _reinitialize(self):
        with self._lock:
            current_pid = os.getpid()
            if current_pid == self._pid:
                return  # Another thread already handled it

            self._pid = current_pid
            # Reset internal state for new process context
            self._inner._exporter = self._create_exporter()
```

## The uWSGI Variant

uWSGI handles forking differently than Gunicorn. The key difference: uWSGI can use multiple worker modes (`fork`, `thread`, `uwsgi`), and the forking happens at a different point in the lifecycle.

For uWSGI, we hook into the `worker-manager` phase:

```python
# uwsgi_config.py

def worker_after_fork(uwsgi_worker):
    """uWSUI-specific post-fork hook."""
    from opentelemetry import metrics

    # Force re-initialization
    provider = metrics.get_meter_provider()
    if hasattr(provider, 'shutdown'):
        try:
            provider.shutdown(timeout=5)
        except Exception:
            pass  # Best effort — parent's connection may already be closed

    # Re-initialize with fresh connections
    init_telemetry()
```

## Testing the Fix

We validated the fix with a chaos test:

```python
import gunicorn.app.base
import time
import signal

class StressApplication(gunicorn.app.base.BaseApplication):
    def __init__(self):
        super().__init__()

    def load(self):
        return create_app()

    def CONFIGURATION(self):
        return {
            "bind": "0.0.0.0:8000",
            "workers": 4,
            "worker_class": "sync",
            "timeout": 5,
            "post_fork": post_fork,
        }

# Kill and respawn workers repeatedly
# Verify metrics continuity across restarts
```

We ran the stress test for 72 hours, killing and respawning workers every 30 seconds. Before the fix, metrics dropped to zero within minutes. After the fix, metrics flowed continuously with zero gaps.

## Key Takeaways

1. **`fork()` and stateful libraries don't mix.** OpenTelemetry, logging formatters, database connection pools — all need explicit re-initialization after fork.

2. **Test with actual forking, not just multiple processes.** `multiprocessing.Process` behaves differently from `os.fork()` in important ways.

3. **PID is not a reliable identifier in pre-fork models.** Always check whether you're in the same process you think you're in.

4. **Background threads die at fork.** If your metric reader or span processor uses background threads, they won't survive `fork()`. Plan accordingly.

5. **The fix belongs in the deployment config, not the application code.** `gunicorn_conf.py` and `uwsgi_config.py` are the right places for fork-related hooks — keep your application code fork-agnostic.

---

_This post is based on production issues encountered while building OBX, PhonePe's centralized observability platform. The solutions described have been validated across thousands of production deployments._
