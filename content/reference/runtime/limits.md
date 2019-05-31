---
title: Limits
---

## Plans

Workers plans are separate from any Cloudflare plan (Free, Professional, Business) you may have. Everyone has access to the Free tier Workers platform by default. Upgrading to the Unlimited (Paid) plan will affect the number of requests your scripts can handle, as well as the compute time available per request.

## Script Size

A Workers script plus any [Asset Bindings](/reference/tooling/api/bindings) can be up to 1MB in size after compression.

## Number of Scripts

Unless otherwise negotiated as a part of an enterprise level contract, all Workers accounts are limited to a maximum of 30 scripts at any given time.

**Note:** app Workers scripts do not count towards this limit.

## Number of Requests Limit

Unlimited (Paid) Workers scripts automatically scale onto thousands of Cloudflare edge servers around the world; there is no general limit to the number of requests per second Workers can handle.

Cloudflare's abuse protection methods do not affect well-intentioned traffic. However, if you send many thousands of requests per second from a small number of client IP addresses, you can inadvertently trigger Cloudflare's abuse protection. If you expect to receive `1015` errors in response to traffic or expect your application to incur these errors, contact Cloudflare to increase your limit.

Accounts using the Workers free tier are limited to a maximum of 100,000 requests per day, with a burst rate limit of 1000 requests per 10 minutes. This limit applies at the account level, meaning that requests on your workers.dev subdomain count toward the same limit as your zoned domains. Visitors who run into the rate limit will be served a Cloudflare 1015 error page, however if you are calling your script programmatically, you can detect the rate limit page and handle it yourself by looking for HTTP status code 429. Upgrading to a paid plan will automatically lift this limit.

## CPU/Execution Time Limit

Most Workers requests consume less than a millisecond. It’s rare to find a normally operating Workers script that exceeds the CPU time limit.

| Plan                      | CPU   |
| ------------------------- | ----- |
| Free                      | 10ms  |
| Unlimited (Paid)          | 10ms+ |

The 10ms the Free plan allows is enough runtime for most use cases, including application hosting. If you expect to exceed these limits, Cloudflare is happy to discuss options.

There is no limit on the real runtime for a Workers script. As long as the client that sent the request remains connected, the Workers script can continue processing, making subrequests, and setting timeouts on behalf of that request. When the client disconnects, all tasks associated with that client request are canceled. You can use [`event.waitUntil()`](/reference/runtime/apis/fetch-event/) to delay cancellation for another 30 seconds or until the promise passed to `waitUntil()` completes.

## Memory

Only one Workers instance runs on each of the many global Cloudflare edge servers. Each Workers instance can consume up to 128MB of memory. Use [global variables](/reference/runtime/apis/standard/) to persist data between requests on individual nodes; note however, that nodes are occasionally evicted from memory.

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
