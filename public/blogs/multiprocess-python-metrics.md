# Why My Python Metrics Died After Gunicorn Forked

I had a working metrics pipeline. Locally, it was perfect. In production, after the first request, everything went silent.

No errors. No timeouts. Just an empty dashboard where there used to be data.

That's when I learned the hardest lesson about Python process models and OpenTelemetry: **what works in a single process will quietly break in a forked one.**

## What I expected

I expected my OpenTelemetry metrics to keep working after deploying to Gunicorn. The SDK was configured. The OTLP exporter was pointed at the collector. Locally, I could see counters, histograms, everything.

In production with 4 Gunicorn workers, I expected the same thing — just more of it.

## What actually happened

After deploying, the first request would produce metrics. Then nothing. The dashboard went flat. No errors in the logs. No exporter failures. The metrics just stopped.

The OpenTelemetry SDK was initialized in the Gunicorn master process. When Gunicorn forked worker processes, each child inherited the parent's `MeterProvider`, exporter, and connection — but those belonged to the parent's context. The child couldn't safely use them.

## The fork problem

Gunicorn uses a pre-fork model:

```
1. Master process starts
2. OTel SDK initializes → creates Meter, exports configured
3. Master forks worker processes
4. Workers inherit the parent's Meter object
5. Workers try to export metrics... but the connection belongs to the parent
6. Metrics go silent, or worse, get sent with wrong process context
```

After `fork()`, the child inherits file descriptors, socket connections, and memory state — but the OpenTelemetry SDK's meter and exporter are tied to the parent's connection. The child can't safely use them.

## How I debugged it

I started by adding logging to the exporter. Nothing showed up — no export calls, no errors. That told me the issue wasn't the collector or the network. It was the SDK itself.

Then I checked the process IDs. The exporter was running in the master process's PID, not the worker's. That's when I understood: after forking, the child had a reference to the parent's exporter, but the parent's background thread (the one that periodically collects and exports metrics) didn't exist in the child.

The child had the object. It didn't have the thread.

## The fix: post-fork re-initialization

The solution was to tear down the inherited `MeterProvider` and create a fresh one in each worker, using Gunicorn's `post_fork` hook:

```python
def post_fork(server, worker):
    """Reinitialize OTel metrics after fork."""
    from opentelemetry import metrics
    from opentelemetry.sdk.metrics import MeterProvider
    from opentelemetry.sdk.metrics.export import PeriodicExportingMetricReader

    old_provider = metrics.get_meter_provider()
    if hasattr(old_provider, 'shutdown'):
        old_provider.shutdown()

    reader = PeriodicExportingMetricReader(
        exporter=OTLPMetricExporter(),
        export_interval_millis=30000,
    )
    new_provider = MeterProvider(metric_readers=[reader])
    metrics.set_meter_provider(new_provider)
```

Each worker now gets its own exporter with its own connection. No more stale references.

## The deeper problem: PID drift

After solving the immediate issue, I found a second one. If a Gunicorn worker crashes and is respawned, its PID changes — but any state tied to the old PID persists. I wrapped the metric reader with a PID-awareness check:

```python
import os
import threading

class PIDAwareMetricReader:
    def __init__(self, inner_reader):
        self._inner = inner_reader
        self._pid = os.getpid()
        self._lock = threading.Lock()

    def collect(self, callback):
        if os.getpid() != self._pid:
            self._reinitialize()
        return self._inner.collect(callback)
```

This ensures metrics survive worker respawns without stale state.

## What I learned

OpenTelemetry's SDK assumes a single-process model. Python's process model doesn't always give you that. If you're using any pre-fork server (Gunicorn, uWSGI, mod\_wsgi), you need to handle post-fork re-initialization yourself.

The fix isn't hard. But knowing you need it — that's the part that took me a day.
