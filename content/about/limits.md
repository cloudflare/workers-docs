---
title: Limits
weight: 4
---

- [Plans](#plans)
- [Script Size](#script-size)
- [Number of Scripts](#number-of-scripts)
- [Request Limits](#request-limits)
  - [Burst Rate Limit](#burst-rate-limit)
  - [Daily Request Limit](#daily-request-limit)
     - [Fail Open](#fail-open)
     - [Fail Closed](#fail-closed)
- [CPU/Execution Time Limit](#cpu-execution-time-limit)
- [Memory](#memory)
- [Subrequests](#subrequests)
- [Simultaneous Open Connections](#simultaneous-open-connections)
  
## Plans

Workers plans are separate from any Cloudflare plan (Free, Professional, Business) you may have. Everyone has access to the Free tier Workers platform by default and are subject to the [free tier request limits](#request-limits). Upgrading to the Unlimited (Paid) plan lifts the restrictions and increases your CPU time limit.

| Plan             | [CPU Limit](#cpu-execution-time-limit) | [Daily Request Limit](#daily-request-limit) | [Burst Rate Limit](#burst-rate-limit) |
| ---------------- | --------------------------------------- | ------------------------------------------- | ------------------------------------- |
| Free             | 10ms                                    | 100,000                                     | 1000 requests per 10 min              |
| Unlimited (Paid) | 50ms                                    | none                                        | none                                  |

See definitions for the types of limits and behavior below.
Script size, number of scripts, subrequests, and available memory are not affected by plan type.

## Script Size

A Workers script plus any [Asset Bindings](/tooling/api/bindings) can be up to **1MB** in size after compression.

## Number of Scripts

Unless otherwise negotiated as a part of an enterprise level contract, all Workers accounts are limited to a maximum of **30 scripts at any given time**.

**Note:** App Workers scripts do not count towards this limit.

## Request Limits

Unlimited (Paid) Workers scripts automatically scale onto thousands of Cloudflare edge servers around the world; there is no general limit to the number of requests per second Workers can handle.

Cloudflare's abuse protection methods do not affect well-intentioned traffic. However, if you send many thousands of requests per second from a small number of client IP addresses, you can inadvertently trigger Cloudflare's abuse protection. If you expect to receive `1015` errors in response to traffic or expect your application to incur these errors, contact Cloudflare to increase your limit.

The burst rate and daily request limits apply at the account level, meaning that requests on your workers.dev subdomain count toward the same limit as your zones. Upgrade to a paid plan to automatically lift these limits.

### Burst Rate Limit

Accounts using the Workers *free* tier are subject to a burst rate limit of **1000 requests per 10 minutes**. Users visiting a rate limited site will receive a Cloudflare 1015 error page. However if you are calling your script programmatically, you can detect the rate limit page and handle it yourself by looking for HTTP status code 429.

### Daily Request Limit

Accounts using the Workers *free* tier are subject to a **daily request limit of 100,000 requests**. Free tier daily requests counts reset at midnight UTC. A Worker that fails as a result of daily request limit errors can be configured by setting its corresponding [route](/about/routes/) in two modes: _Fail open_ and _Fail closed_.

#### Fail Open

Routes in fail open mode will bypass the failing Worker and prevent it from operating on incoming traffic. Incoming requests will behave as if there was no Worker.

#### Fail Closed

Routes in fail closed mode will display a Cloudflare 1027 error page to visitors, signifying the Worker has been temporarily disabled. We recommend this option if your Worker is performing security related tasks.

<!-- Add workers request limit error code -->

## CPU/Execution Time Limit

Most Workers requests consume less than a millisecond. It’s rare to find a normally operating Workers script that exceeds the CPU time limit. A Worker may consume up to **10ms on the free tier** and **50ms on the Unlimited tier**. The 10ms allowance on the Free plan is enough execution time for most use cases including application hosting.

There is no limit on the real runtime for a Workers script. As long as the client that sent the request remains connected, the Workers script can continue processing, making subrequests, and setting timeouts on behalf of that request. When the client disconnects, all tasks associated with that client request are canceled. You can use [`event.waitUntil()`](/reference/apis/fetch-event/) to delay cancellation for another 30 seconds or until the promise passed to `waitUntil()` completes.

## Memory

Only one Workers instance runs on each of the many global Cloudflare edge servers. Each Workers instance can consume up to **128MB** of memory. Use [global variables](/reference/apis/standard/) to persist data between requests on individual nodes; note however, that nodes are occasionally evicted from memory.

Use the [TransformStream API](/reference/apis/streams/) to stream responses if you are concerned about memory usage. This avoids loading an entire response into memory.

## Subrequests

### Can a Workers script make subrequests to load other sites on the Internet?

Yes. Use the [Fetch API](/reference/apis/fetch/) to make arbitrary requests to other Internet resources.

### How many subrequests can I make?

The limit for subrequests a Workers script can make is **50 per request**. Each subrequest in a redirect chain counts against this limit. This means that the number of subrequests a Workers script makes could be greater than the number of `fetch(request)` calls in the script.

### Can I make a subrequest after my Workers has responded to the user?

Yes, you can use [`event.waitUntil()`](/reference/apis/fetch-event) to register asynchronous tasks that may continue after the response has been returned.

### How long can a subrequest take?

There is **no hard limit** on the amount of real time a Worker may use. As long as the client which sent a request remains connected, the Worker may continue processing, making subrequests, and setting timeouts on behalf of that request.

When the client disconnects, all tasks associated with that client’s request are proactively canceled. If the Worker passed a promise to [`event.waitUntil()`](/reference/apis/fetch-event), cancellation will be delayed until the promise has completed or until an additional 30 seconds have elapsed, whichever happens first.

## Simultaneous Open Connections

While handling a request, each Worker script is allowed to have up to **six connections open simultaneously**. The connections opened by the following API calls all count toward this limit:

- the `fetch()` method of the [Fetch API](/reference/apis/fetch/)
- `get()`, `put()`, `list()`, and `delete()` methods of [Workers KV Namespace objects](/reference/storage/api/#worker-api)
- `put()`, `match()`, and `delete()` methods of [Cache objects](/reference/apis/cache/)

Once a Worker has six connections open, it can still attempt to open additional connections. However, these attempts are put in a pending queue - the connections won't be actually be initiated until one of the currently open connections has closed. Since earlier connections can delay later ones, if a Worker tries to make many simultaneous subrequests, its later subrequests may appear to take longer to start.

If the system detects that a Worker is deadlocked on open connections - for instance, if the Worker has pending connection attempts but has no in-progress reads or writes on the connections that it already has open - then the least-recently-used open connection will be canceled to unblock the Worker. If the Worker later attempts to use a canceled connection, an exception will be thrown. These exceptions should rarely occur in practice, though, since it's uncommon for a Worker to open a connection that it doesn't have an immediate use for.
