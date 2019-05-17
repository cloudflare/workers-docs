---
title: Limitations
---

## Bundle Size

A Worker script plus any [Asset Bindings](TODO) can be up to 1MB in size after compression.

## Number of Scripts

| Plan        | Number of Scripts |
| ----------- | ----------------- |
| Workers.dev | 50                |
| Paid        | 1000              |

app worker scripts do not count towards the limit

## Number of Requests

Your Worker automatically scales onto thousands of servers around the world; there is no general limit to the number of requests per second Workers can handle.

Cloudflare does impose a number of abuse protection methods which are designed not to affect well-intentioned traffic. If you send many thousands of requests per second from a small number of client IP addresses, you can inadvertently trigger some of the protection methods. If you receive 1015 errors in response to traffic you believe should be allowed, please contact us to have the limits adjusted.

If you have an application which you expect to exceed these limits, feel free to contact us to have them raised.

## CPU/execution time

Most Worker requests consume less than a single millisecond. It’s rare for us to find a Worker script which is operating as intended and runs into the CPU time limit.

| Plan       | CPU   |
| ---------- | ----- |
| Free       | 5ms   |
| Pro        | 10ms  |
| Business   | 50ms  |
| Enterprise | 50ms+ |

In general the 5ms offered to free plans is sufficient for all practical use-cases, including application hosting. If you have a usage which violates these limits, please reach out and we will be happy to discuss other options.

There is no hard limit on the amount of real time a Worker may use. As long as the client which sent a request remains connected, the Worker may continue processing, making subrequests, and setting timeouts on behalf of that request.

When the client disconnects, all tasks associated with that client’s request are proactively canceled. If event.waitUntil() has been used, cancellation will be delayed until the promise passed to waitUntil() completes, or until an additional 30 seconds has elapsed, whichever happens first.

## Memory

We run at most one Worker instance on each of the many servers we run at our edge locations around the world. Each instance can consume up to 128MB of memory. By using global variables you can persist data between requests on an individual node, but note that nodes are occasionally evicted from memory.

If you are concerned about memory usage, the solution is often to stream your responses (potentially using the TransformStream API) rather than loading an entire response into memory.

## Subrequests

### Can my Worker make subrequests to load other sites on the Internet?

Yes, your Worker can use the Fetch API to make arbitrary requests to other Internet resources.

### How many subrequests can I make?

We currently limit the number of subrequests a script can make to 50. This is a temporary limit which we plan to remove soon.

Note that each subrequest in a redirect chain counts against this limit, so the number of subrequests a script makes may end up being greater than the number of fetch(request) calls that are in the script.

### Can I make a subrequest after my Worker has responded to the user?

Yes, you can use event.waitUntil() to register asynchronous tasks that may continue after the response has been returned.

### How long can a subrequest take?

There is no individual subrequest duration limit, but all subrequests must be initated in the first 15 seconds of your script’s execution.
