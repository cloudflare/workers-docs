---
title: Metrics
weight: 4
---

Workers metrics are designed to help you better understand the behavior of your Worker scripts and discover and diagnose issues by providing detailed Workers usage and performance insights.

Workers Metrics are available in Per Zone and Per Worker script contexts.

- [Per Worker Script Metrics](#per-worker-script-metrics)
  - [Invocation statuses](#invocation-statuses)
  - [Worker requests](#worker-requests)
  - [CPU time](#cpu-time)
- [Per Zone Metrics](#per-zone-metrics)
  - [Total requests](#total-requests)
  - [Status codes](#status-codes)
  - [Bandwidth](#bandwidth)
  - [Subrequests](#subrequests)
- [GraphQL](#graphql)

## Per Worker Script Metrics

Cumulates request data for an individual Worker script across all zones including your workers.dev subdomain. On your [Workers dashboard](https://dash.cloudflare.com/?account=workers/overview), click on any Worker to view its metrics.

Per Worker Script data can be scoped by time range within the last 30 days. The dashboard includes charts and information described below.

### Invocation statuses

Worker invocation statuses indicate whether a Worker request successfully completed or if it failed for a variety of reasons. Invocation statuses are different from HTTP status codes. In some cases, a successful Worker script invocation might not generate a successful HTTP status because of another error encountered outside of the Workers runtime.

Worker invocation statuses are summarized below:

| Error code             | Definition                                                               |
| ---------------------- | ------------------------------------------------------------------------ |
| Success                | Worker script executed successfully                                      |
| Client Disconnected    | HTTP client (i.e. the browser) disconnected before the request completed |
| Script Threw Exception | Worker script threw a Javascript exception during execution              |
| Exceeded Resources     | Worker script exceeded CPU time limits set by the Workers runtime        |
| \*Internal Error       | Workers runtime encountered an error                                     |

\*Internal errors may appear from time to time for a variety of reasons.

Worker invocation statuses are converted to camel-case in Workers GraphQL results.

### Worker Requests

This chart shows historical request counts from the Workers runtime broken down into successful requests, failed requests, and subrequests.

- Successful requests are composed of Success and Client Disconnected invocation statuses.
- Failed requests are composed of every other invocation status.
- Subrequests are requests triggered by calling `fetch`. If a script makes 2 subrequests but throws an uncaught error during the second subrequest, 1 subrequest will be counted.

### CPU Time

The CPU time chart shows historical CPU time data broken down into relevant quantiles. In some cases, higher quantiles may appear to exceed [CPU time limits](/about/limits/#cpu-execution-time-limit) because of a mechanism in the Workers runtime that allows rollover CPU time for requests below the CPU limit.

## Per Zone Metrics

Cumulates request data for all scripts assigned to any routes defined for a zone. On your Cloudflare dashboard, click the analytics tab to [view the dashboard](https://dash.cloudflare.com/?zone=analytics/workers).

Per Zone data can be scoped by time range within the last 30 days. The dashboard includes charts and information described below.

### Total Requests

This chart shows historical data for all scripts on a zone broken down by successful requests, failed requests, and subrequests. These request types are categorized by HTTP status code where 200-level requests are successful and 400 to 500-level requests are failed.

### Status Codes

HTTP statuses for all scripts on a zone broken down by status code.

### Bandwidth

This chart shows historical bandwidth usage for all scripts on a zone broken down by cache status.

### Subrequests

This chart shows subrequests - requests triggered by calling `fetch` - broken down by cache status.

- Uncached - requests answered directly by your origin server or other servers responding to subrequests
- Cached - requests answered by Cloudflare’s cache

As Cloudflare caches more of your content, it accelerates content delivery and reduces load on your origin.

## GraphQL

Per Worker script metrics are powered by GraphQL. Learn more about querying our data sets in the [API documentation](https://developers.cloudflare.com/analytics/graphql-api/features/data-sets/).
