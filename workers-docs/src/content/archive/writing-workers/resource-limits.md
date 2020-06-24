---
title: "Resource Limits"
weight: 100
---

An individual Worker script may consume up to:

- 5-50 milliseconds CPU time per request, depending on Cloudflare Plan
- 128MB memory at any given time

Note that the CPU time quota is per request, while the memory quota is per Worker instance.
Cloudflare runs Worker instances on many machines in many regions, automatically scaling
them as necessary.

If an individual request exceeds its CPU time quota, that request will be canceled,
but the script will be allowed to continue serving other requests. If the memory quota is exceeded
at any time, the script will be evicted from memory and all requests it was servicing will
be canceled, but the Worker will be automatically restarted to serve the next request that
comes in.

## CPU Time

Most Worker requests consume less than a single millisecond. It’s rare for us to find a
Worker script which is operating as intended and runs into the CPU time limit.

Here is the Worker CPU time limit based on Cloudflare Plan:

- Free: 5ms
- Pro: 10ms
- Business: 50ms
- Enterprise: 50ms+ depending on contract

In general the 5ms offered to free plans is sufficient for all practical use-cases, including
application hosting. If you have a usage which violates these limits, please reach out and we
will be happy to discuss other options.

## Real Time

There is no hard limit on the amount of real time a Worker may use. As long as the client
which sent a request remains connected, the Worker may continue processing, making subrequests, and
setting timeouts on behalf of that request.

When the client disconnects, all tasks associated with that client's request are proactively
canceled. If `event.waitUntil()` has been used, cancellation will be delayed until the promise
passed to `waitUntil()` completes, or until an additional 30 seconds has elapsed, whichever happens
first.

## Memory

We run at most one Worker instance on each of the many servers we run at our edge locations
around the world. Each instance can consume up to 128MB of memory. By using global variables
you can persist data between requests on an individual node, but note that nodes are occasionally
evicted from memory.

If you are concerned about memory usage, the solution is often to stream your responses
(potentially using the [TransformStream API](/workers/archive/recipes/streaming-responses)
rather than loading an entire response into memory.

## Requests

Your Worker automatically scales onto thousands of servers around the world; there is no
general limit to the number of requests per second Workers can handle.

Cloudflare does impose a number of abuse protection methods which are designed not to
affect well-intentioned traffic. If you send many thousands of requests
per second from a small number of client IP addresses, you can inadvertently trigger
some of the protection methods. If you receive 1015 errors in response to traffic
you believe should be allowed, please contact us to have the limits adjusted.

If you have an application which you expect to exceed these limits, feel free to
[contact us](https://support.cloudflare.com) to have them raised.
