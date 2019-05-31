---
title: Limits
---

This section describes various limitations associated with your account.

A Workers script plus any [Asset Bindings](/reference/tooling/api/bindings) can be up to 1MB in size after compression.

## Number of Scripts Limits

This lists the number of Workers scripts you can run in your Cloudflare deployments.

| Plan          | Number of Scripts |
| ------------- | ----------------- |
| `workers.dev` | 30                |
| Subscribed    | 30                |

**Note:** app Workers scripts do not count towards this limit.

## Number of Requests Limit

Workers scripts automatically scale onto thousands of Cloudflare Edge servers around the world; there is no general limit to the number of requests per second Workers can handle.

Cloudflare's abuse protection methods do not affect well-intentioned traffic. However, if you send many thousands of requests per second from a small number of client IP addresses, you can inadvertently trigger Cloudflare's abuse protection. If you expect to receive `1015` errors in response to traffic or expect your application to incur these errors, contact Cloudflare to increase your limit.

## CPU/Execution Time Limit

Most Workers requests consume less than a millisecond. It’s rare to find a normally operating Workers script that exceeds the CPU time limit.

| Plan       | CPU   |
| ---------- | ----- |
| Free       | 10ms  |
| Pro        | 10ms  |
| Business   | 50ms  |
| Enterprise | 50ms+ |

The 10ms the Free plan allows is enough runtime for most use cases, including application hosting. If you expect to exceed these limits, Cloudflare is happy to discuss options.

There is no limit on the real runtime for a Workers script. As long as the client that sent the request remains connected, the Workers script can continue processing, making subrequests, and setting timeouts on behalf of that request. When the client disconnects, all tasks associated with that client request are canceled. You can use [`event.waitUntil()`](/reference/runtime/apis/fetch-event/) to delay cancellation for another 30 seconds or until the promise passed to `waitUntil()` completes.

## Memory

Only one Workers instance runs on each of the many global Cloudflare Edge servers. Each Workers instance can consume up to 128MB of memory. Use [global variables](/reference/runtime/apis/standard/) to persist data between requests on individual nodes; note however, that nodes are occasionally evicted from memory.

Use the [TransformStream API](/reference/runtime/apis/streams/) to stream responses if you are concerned about memory usage. This avoids loading an entire response into memory.

## Subrequests

### Can a Workers script make subrequests to load other sites on the Internet?

Yes. Use the [Fetch API](/reference/runtime/apis/fetch/) to make arbitrary requests to other Internet resources.

### How many subrequests can I make?

The limit for subrequests a Workers script can make is 50 per request. Each subrequest in a redirect chain counts against this limit. This means that the number of subrequests a Workers script makes could be greater than the number of `fetch(request)` calls in the script.

### Can I make a subrequest after my Workers has responded to the user?

Yes, you can use [`event.waitUntil()`](/reference/runtime/apis/fetch-event) to register asynchronous tasks that may continue after the response has been returned.

### How long can a subrequest take?

There is no individual subrequest runtime limit, but all subrequests must initate in the first 15 seconds of Workers script execution.
