---
title: Limits
weight: 4
---

## Plans

Workers plans are separate from any Cloudflare plan (Free, Professional, Business) you may have. Everyone has access to the Free tier Workers platform by default. Upgrading to the Unlimited (Paid) plan will affect the number of requests your scripts can handle, as well as the compute time available per request.

## Script Size

A Workers script plus any [Asset Bindings](/tooling/api/bindings) can be up to 1MB in size after compression.

## Number of Scripts

Unless otherwise negotiated as a part of an enterprise level contract, all Workers accounts are limited to a maximum of 30 scripts at any given time.

**Note:** app Workers scripts do not count towards this limit.

## Number of Requests Limit

Unlimited (Paid) Workers scripts automatically scale onto thousands of Cloudflare edge servers around the world; there is no general limit to the number of requests per second Workers can handle.

Cloudflare's abuse protection methods do not affect well-intentioned traffic. However, if you send many thousands of requests per second from a small number of client IP addresses, you can inadvertently trigger Cloudflare's abuse protection. If you expect to receive `1015` errors in response to traffic or expect your application to incur these errors, contact Cloudflare to increase your limit.

Accounts using the Workers free tier are limited to a maximum of 100,000 requests per day, with a burst rate limit of 1000 requests per 10 minutes. This limit applies at the account level, meaning that requests on your workers.dev subdomain count toward the same limit as your zoned domains. Visitors who run into the rate limit will be served a Cloudflare 1015 error page, however if you are calling your script programmatically, you can detect the rate limit page and handle it yourself by looking for HTTP status code 429. Upgrading to a paid plan will automatically lift this limit.

## CPU/Execution Time Limit

| Plan             | CPU  |
| ---------------- | ---- |
| Free             | 10ms |
| Unlimited (Paid) | 50ms |

Most Workers requests consume less than a millisecond. It’s rare to find a normally operating Workers script that exceeds the CPU time limit. The 10ms the Free plan allows is enough runtime for most use cases, including application hosting.

There is no limit on the real runtime for a Workers script. As long as the client that sent the request remains connected, the Workers script can continue processing, making subrequests, and setting timeouts on behalf of that request. When the client disconnects, all tasks associated with that client request are canceled. You can use [`event.waitUntil()`](/reference/apis/fetch-event/) to delay cancellation for another 30 seconds or until the promise passed to `waitUntil()` completes.

## Memory

Only one Workers instance runs on each of the many global Cloudflare edge servers. Each Workers instance can consume up to 128MB of memory. Use [global variables](/reference/apis/standard/) to persist data between requests on individual nodes; note however, that nodes are occasionally evicted from memory.

Use the [TransformStream API](/reference/apis/streams/) to stream responses if you are concerned about memory usage. This avoids loading an entire response into memory.

## Subrequests

### Can a Workers script make subrequests to load other sites on the Internet?

Yes. Use the [Fetch API](/reference/apis/fetch/) to make arbitrary requests to other Internet resources.

### How many subrequests can I make?

The limit for subrequests a Workers script can make is 50 per request. Each subrequest in a redirect chain counts against this limit. This means that the number of subrequests a Workers script makes could be greater than the number of `fetch(request)` calls in the script.

### Can I make a subrequest after my Workers has responded to the user?

Yes, you can use [`event.waitUntil()`](/reference/apis/fetch-event) to register asynchronous tasks that may continue after the response has been returned.

### How long can a subrequest take?

There is no hard limit on the amount of real time a Worker may use. As long as the client which sent a request remains connected, the Worker may continue processing, making subrequests, and setting timeouts on behalf of that request.

When the client disconnects, all tasks associated with that client’s request are proactively canceled. If the Worker passed a promise to [`event.waitUntil()`](/reference/apis/fetch-event), cancellation will be delayed until the promise has completed or until an additional 30 seconds have elapsed, whichever happens first.

## Simultaneous Open Connections

While handling a request, each Worker script is allowed to have up to six connections open simultaneously. The connections opened by the following API calls all count toward this limit:

- the `fetch()` method of the [Fetch API](/reference/apis/fetch/)
- `get()`, `put()`, `list()`, and `delete()` methods of [Workers KV Namespace objects](/reference/storage/api/#worker-api)
- `put()`, `match()`, and `delete()` methods of [Cache objects](/reference/apis/cache/)

Once a Worker has six connections open, it can still attempt to open additional connections. However, these attempts are put in a pending queue - the connections won't be actually be initiated until one of the currently open connections has closed. Since earlier connections can delay later ones, if a Worker tries to make many simultaneous subrequests, its later subrequests may appear to take longer to start.

If the system detects that a Worker is deadlocked on open connections - for instance, if the Worker has pending connection attempts but has no in-progress reads or writes on the connections that it already has open - then the least-recently-used open connection will be canceled to unblock the Worker. If the Worker later attempts to use a canceled connection, an exception will be thrown. These exceptions should rarely occur in practice, though, since it's uncommon for a Worker to open a connection that it doesn't have an immediate use for.
