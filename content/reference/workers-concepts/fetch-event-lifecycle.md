---
title: The `FetchEvent` Lifecycle
---

When working with the [`FetchEvent`](/reference/runtime/apis/fetch-event) inside the Workers runtime, it helps to have a good idea of its lifecycle.

This lifecyle starts when a [Request Object](/reference/runtime/apis/fetch#Request) triggers the `FetchEvent`-- this happens when the fuction is called via [HTTP(S) routes](/reference/workers-concepts/routes), or when `respondWith()` or `waitUntil()` are called on the `Request` object within the Worker code. The life of a `RequestEvent` is determined by the method call that triggered it:

## `passThroughOnException()`

This causes the script to "fail open" (meaning the exectution of code is not halted) on unhandled exceptions. Instead of returning a runtime error response, the runtime proxies the request to its destination. To prevent JavaScript errors from causing entire requests to fail on uncaught exceptions, `passThroughOnException()` causes the worker to act as if the exception wasn’t there. This allows you to yield control to your origin server.

## `respondWith()`

This intercepts the request and allows to send a custom response. This is useful when you wish to modify the response before it is sent back to the requester.

If a `fetch` event handler does not call `respondWith()`, the runtime delivers the event to the next registered `fetch` event handler. If no event handler calls `respondWith()`, the runtime proxies the request to its destination.

## `waitUntil()`

 Extends the lifetime of the event using a `Promise` passed into the function. Use this method to notify the runtime to wait for tasks, such as streaming and caching, that run longer than the usual time it takes to send a response. This is good for handling logging and analytics to third-party services, where you don't want to block the `response`.
