---
title: The FetchEvent Lifecycle
---

When working with the [`fetch` event](/reference/runtime/apis/fetch-event) inside the Workers runtime, it helps to have a good idea of its lifecycle.

The FetchEvent lifecycle starts when Cloudflare's edge network receives a request whose URL matches both a zone and a route for a Worker function; this causes the Workers runtime to trigger a `fetch` event and creates a [FetchEvent Object](/reference/runtime/apis/fetch-event) to pass to the first event handler in the Worker function registered for `'fetch'`. Then the event handler can use any of the following to control what happens next:

## `respondWith()`

Intercepts the request and allows users to send a custom response. 

If a `fetch` event handler does not call `respondWith()`, the runtime delivers the event to the next registered `fetch` event handler. If no event handler calls `respondWith()`, the runtime proxies the request to the origin. Note: If no origin is setup (always true for workers.dev sites), then you must have a `respondWith()` called for a valid response.

## `waitUntil()`

 Extends the lifetime of the event using a `Promise` passed into the function. Use this method to notify the runtime to wait for tasks, such as streaming and caching, that run longer than the usual time it takes to send a response. This is good for handling logging and analytics to third-party services, where you don't want to block the `response`.

## `passThroughOnException()`

Causes the script to "fail open" (meaning the execution of code is not halted) on unhandled exceptions. Instead of returning a runtime error response, the runtime proxies the request to its destination. To prevent JavaScript errors from causing entire requests to fail on uncaught exceptions, `passThroughOnException()` causes the Worker to act as if the exception wasn’t there. This allows you to yield control to your origin server.
