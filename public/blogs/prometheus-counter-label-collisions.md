# How Prometheus Counters Work — and How Two Sources Inflate One Series

Counters look like the simplest metric in Prometheus. They only go up. The exporter sends an absolute total, Prometheus takes periodic snapshots, and `rate()` subtracts them.

That model holds only while one process owns the series. When two processes export the same metric name **and the same label set**, they stop being two series. Prometheus sees one counter that jumps up and down, and `rate()` does the only thing it can: it assumes every drop is a restart. The result is phantom traffic — sometimes orders of magnitude more than the system ever served.

## A counter is cumulative state, not an event stream

A counter is a number kept in memory by the process. Every request increments it. A scrape reads the current total; it does not receive one event per request.

```
10:00:00  http_requests_total{service="api"} 1000
10:00:15  http_requests_total{service="api"} 1045
```

The second sample does not mean 45 requests happened *at* 10:00:15. It means 45 requests happened between the two scrapes. `rate()` and `increase()` estimate what happened in that gap.

The important part is how Prometheus identifies the thing being counted. A time series is the metric name plus the **complete label set**:

```
http_requests_total{service="api", instance="10.0.0.1:9100"} 100
http_requests_total{service="api", instance="10.0.0.2:9100"} 200
```

Those are two series. Remove `instance` and they become one:

```
http_requests_total{service="api"} 100
http_requests_total{service="api"} 200
```

Prometheus has no way to know these came from different processes. The second sample is simply a new value for the first series.

## What rate() and increase() do with a reset

Prometheus assumes a counter is monotonically increasing. When it sees a sample lower than the previous one, it concludes the process restarted and the counter reset to zero. The algorithm is roughly:

```go
result := last - first
prev := first

for _, curr := range samples[1:] {
    if curr < prev {
        result += prev // assume a reset, then climb back to curr
    }
    prev = curr
}

// extrapolate the result to the edges of the range
```

This is correct for one process with a real restart. If a counter goes `1000 → 1045 → 12`, Prometheus reads the drop as a reset and counts the pre-reset progress plus the new 12.

It is catastrophic when the drop is not a restart.

## Two exporters, one label set

Suppose two instances are serving the same service. Instance A has handled 100 requests; instance B has handled 200. Both export the same metric with the same labels because the instance identity was dropped somewhere between the SDK and Prometheus.

The collector now has one output series, and whichever instance was processed last supplies the value for that scrape. If scrapes alternate between A and B, Prometheus stores this:

| Scrape | Target | Raw counter | Stored sample | What Prometheus infers |
|--------|--------|-------------|---------------|------------------------|
| 1 | instance-a | 100 | 100 | baseline |
| 2 | instance-b | 200 | 200 | +100 |
| 3 | instance-a | 100 | 100 | dropped 100 → assumed reset, +100 |
| 4 | instance-a | 100 | 100 | flat |
| 5 | instance-b | 200 | 200 | +100 |

The series reads `100 → 200 → 100 → 100 → 200`. No process restarted. But at scrape 3, `200 → 100` looks exactly like a reset.

`increase()` over that window computes:

```
last - first            = 200 - 100 = 100
reset at 200 → 100      = +200
reported increase       = 300
```

The two processes had served 300 requests in their lifetime before this window, and **zero** new requests during it. Prometheus reports 300 requests anyway.

Keep alternating the scrapes and the number keeps climbing. With 20 scrapes over roughly five minutes at a 15-second interval, and the counters still sitting at 100 and 200, the reset arithmetic alone contributes **1,900 requests** before extrapolation. Every `200 → 100` transition adds another full 200 to the result. Nothing restarted; nothing was served.

The same thing happens through `rate()`, which divides that invented total by the range in seconds. A dashboard, an SLO burn-rate alert, or an autoscaler then reacts to traffic that never existed. The error compounds with every flip and with the absolute size of the counters — on a chart it looks like a metric explosion.

## Where the identity gets lost

The collision usually happens before Prometheus ever sees the samples.

**The OpenTelemetry Collector flattens resources.** A collector receives metrics from many services and resource contexts. Unless resource attributes are converted to Prometheus labels, rich identity such as `service.name`, `service.instance.id`, `k8s.pod.name`, and `host.name` may only appear on `target_info` — not on every metric. Two resources with the same metric name and the same remaining attributes become one exported series, and the last writer wins for that scrape.

**Two collectors write the same series.** Running two collector pipelines, or two collectors, that export the same metric to the same backend under the same labels has the same effect. The backend sees one series with two writers.

**Prometheus-side relabeling removes the distinction.** Dropping `instance` with `labeldrop`, overwriting `job`/`instance`, scraping the same target through two configs, or federating series under identical labels all collapse the identity. By default, Prometheus assigns each scrape target a distinct `instance` label (its address), which normally prevents this. A collision means that identity was removed, overwritten, or two producers share one scrape endpoint.

## Two different explosions

It helps to separate two failures that both look like "too many metrics":

- **Series collision** (this article): different producers share one label set, so their cumulative totals alias into one series. The counter appears to reset, and `rate()` invents traffic.
- **Cardinality explosion**: every producer gets a unique label set, but the label values are unbounded — request IDs, user IDs, raw URLs, pod UIDs. The series count grows without limit.

The fix for the first is a **stable, bounded identity label** on each series. The fix for the second is to keep those labels bounded and drop the unbounded ones. Adding a unique label per request to fix a collision just moves the problem.

## What to take care of

### 1. Keep a unique identity on every series

Promote stable resource attributes to labels: `instance`, `job`, `service.instance.id` (often normalized to `service_instance_id`), `k8s.pod.name`, `container`, `cluster`, and `region`. In the Collector:

```yaml
exporters:
  prometheus:
    endpoint: "0.0.0.0:8889"
    resource_to_telemetry_conversion:
      enabled: true
```

For remote write:

```yaml
exporters:
  prometheusremotewrite:
    endpoint: "http://mimir:9009/api/v1/push"
    resource_to_telemetry_conversion:
      enabled: true
```

Then check the actual `/metrics` output. Verify that two instances produce two distinct label sets instead of assuming the exporter did it.

### 2. One writer per series

Do not scrape both the application and the collector if both expose the same metric. Do not run two collector pipelines that export the same series to the same backend. If two paths must coexist temporarily, add a `collector` or `pipeline` label so the series stay distinct, or drop one copy at ingestion.

### 3. Do not erase identity during relabeling

This is a common accidental fix for high cardinality, and it creates the collision:

```yaml
metric_relabel_configs:
  - action: labeldrop
    regex: instance
```

Keep `instance`, or replace it with an equally unique source label. Use `honor_labels: true` only when the exporter emits a complete, unique identity; otherwise the scrape target's identity is the only thing keeping series apart.

### 4. Aggregate after rate(), never before

```promql
sum by (service_name) (rate(http_requests_total[5m]))
```

Summing raw counters across processes is meaningless — they started counting at different times. Rate first, then aggregate.

### 5. Treat unexpected resets as a bug signal

```promql
resets(http_requests_total[15m])
```

This should be `0` unless processes actually restarted. Alert when it rises without a deploy or restart. Compare `increase()` with an independent source such as load-balancer logs or access-log request counts. If the numbers disagree, suspect aliasing before suspecting the application.

### 6. Guard the scrape and cardinality limits

Set `sample_limit`, `label_limit`, `label_name_length_limit`, and `label_value_length_limit` in the scrape config. Monitor `prometheus_tsdb_head_series`, `scrape_samples_scraped`, `up`, and `scrape_duration_seconds`. Drop high-cardinality labels at ingestion, and never put request IDs, session IDs, or raw URLs in labels.

### 7. Keep counter semantics consistent

Do not mix cumulative and delta temporality for the same series. If an SDK or pipeline emits deltas, convert once — for example with the Collector's `deltatocumulative` processor — and keep a single path to the backend. Two paths with different temporality manufacture resets even when the labels are correct.

Also remember that `increase()` extrapolation can return fractional values for an integer counter. That is expected; the invented reset is the real problem.

### 8. Test the failure locally

Run a small Prometheus with two fake exporters that expose the same labels. Scrape them alternately and assert that `increase()` disagrees with the known request count. Then add a distinct `instance` label, scrape again, and assert the result matches. `promtool check metrics` validates exposition, and `promtool query instant` lets you check the PromQL result before it reaches a dashboard.

## The short version

A counter is a per-process total. Prometheus identifies a series by the full label set. Two totals under one label set are not two counters — they are one counter that appears to reset. `rate()` and `increase()` treat each apparent reset as lost progress and add it back, inventing requests.

Keep producer identity on the series, allow one writer per series, and aggregate with `sum(rate(...))` rather than `sum(counter)`. The counter is not lying. It is answering a question about two processes that the label set never asked separately.
