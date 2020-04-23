---
title: Metrics
weight: 4
---

- [Worker Script Metrics](#worker-script-metrics)
  - [Invocation statuses](#invocation-statuses)
  - [Requests](#requests)
  - [CPU time](#cpu-time)
- [Zone Metrics](#zone-metrics)
  - [Total requests](#total-requests)
  - [Status codes](#status-codes)
  - [Bandwidth](#bandwidth)
  - [Subrequests](#subrequests)
- [GraphQL](#graphql)

Workers metrics show performance and usage of your Workers and help diagnose issues.

Workers Metrics are available in Zone and Worker script contexts.

## Worker Script Metrics

Aggregates request data for an individual Worker script across all zones including your workers.dev subdomain. On your [Workers dashboard](https://dash.cloudflare.com/?account=workers/overview), click on any Worker to view its metrics.

Worker script metrics can be inspected by time ranges within the last 30 days. The dashboard includes the charts and information described below.

### Invocation statuses

Worker invocation statuses indicate whether a Worker script executed successfully or failed to generate a response in the Workers runtime. Invocation statuses differ from HTTP status codes. In some cases, a Worker script invocation succeeds but does not generate a successful HTTP status because of another error encountered outside of the Workers runtime. Some invocation statuses result in a [Workers error code](/about/tips/debugging/#error-pages-generated-by-workers) being returned to the client.

| Invocation status      | Definition                                                               | Workers Error code | GraphQL field          |
| ---------------------- | ------------------------------------------------------------------------ | ------------------ | ---------------------- |
| Success                | Worker script executed successfully                                      |                    | `success`              |
| Client Disconnected    | HTTP client (i.e. the browser) disconnected before the request completed |                    | `clientDisconnected`   |
| Script Threw Exception | Worker script threw an unhandled Javascript exception                    | 1101               | `scriptThrewException` |
| ¹ Exceeded Resources   | Worker script exceeded runtime limits                                    | 1102, 1027         | `exceededResources`    |
| ² Internal Error       | Workers runtime encountered an error                                     |                    | `internalError`        |

_¹ The Exceeded Resources status may appear when the Worker exceeds a [runtime limit](/about/limits/#request-limits). The most common cause is excessive CPU time, but is also caused by a script exceeding startup time or free tier limits._

_² The Internal Error status may appear when the Workers runtime fails to process a request due to an internal failure in our system. These errors are not caused by any issue with the Worker code nor any resource limit. While requests with Internal Error status are rare, we expect that some may appear during normal operation. These requests are not counted towards usage for billing purposes. If you notice an elevated rate of requests with Internal Error status, please check www.cloudflarestatus.com._

### Requests

This chart shows historical request counts from the Workers runtime broken down into successful requests, errored requests, and subrequests.

- **Total**: All incoming requests registered by a Worker script. Requests blocked by [WAF](https://www.cloudflare.com/waf/) or other security features will not count.
- **Successful requests**: Success and Client Disconnected invocation statuses.
- **Errored requests**: Every other invocation status.
- **Subrequests**: Requests triggered by calling `fetch` from within a Worker script. A subrequest that throws an uncaught error will not be counted.

### CPU Time

The CPU time chart shows historical CPU time data broken down into relevant quantiles using [reservoir sampling](https://en.wikipedia.org/wiki/Reservoir_sampling). You can learn more about interpreting quantiles [here](https://www.statisticshowto.com/quantile-definition-find-easy-steps/). In some cases, higher quantiles may appear to exceed [CPU time limits](/about/limits/#cpu-execution-time-limit) without generating invocation errors because of a mechanism in the Workers runtime that allows rollover CPU time for requests below the CPU limit.

## Zone Metrics

Aggregates request data for all scripts assigned to any [routes](/about/routes/) defined for a zone. On your Cloudflare dashboard, click the analytics tab to [view the dashboard](https://dash.cloudflare.com/?zone=analytics/workers).

Zone data can be scoped by time range within the last 30 days. The dashboard includes charts and information described below.

### Subrequests

This chart shows subrequests - requests triggered by calling `fetch` from within a Worker script - broken down by cache status.

- **Uncached**: requests answered directly by your origin server or other servers responding to subrequests
- **Cached**: requests answered by Cloudflare’s [cache](https://www.cloudflare.com/learning/cdn/what-is-caching/). As Cloudflare caches more of your content, it accelerates content delivery and reduces load on your origin.

### Bandwidth

This chart shows historical bandwidth usage for all scripts on a zone broken down by cache status.

### Status Codes

This chart shows historical requests for all scripts on a zone broken down by HTTP status code.

### Total Requests

This chart shows historical data for all scripts on a zone broken down by successful requests, failed requests, and subrequests. These request types are categorized by HTTP status code where 200-level requests are successful and 400 to 500-level requests are failed.

## GraphQL

Worker script metrics are powered by GraphQL. Learn more about querying our data sets in the [API documentation](https://developers.cloudflare.com/analytics/graphql-api/features/data-sets/).
