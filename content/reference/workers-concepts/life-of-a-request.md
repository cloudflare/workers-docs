---
Title: Life of a Request in the Workers Runtime
---

# The Overview

In order to discuss how a request to a Worker is handled, first we must discuss the differences between the Cloudflare Worker runtime and the `ServiceWorker` it is modeled after. 

## Differences between `ServiceWorker` and Cloudflare Worker functions

`ServiceWorker` functions are a "pull" system, as in the `ServiceWorker` is pulled in from a remote server-- this gives a `ServiceWorker` a few steps that do not occur in a Cloudflare Worker: the main flow is download the code, install the code, and activate it. You can read more [on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

Cloudflare Workers do not require these steps because the Worker function is already available locally, so the event that starts off a Worker fuction is when a call is made to a URL that matches the zone and route of a Worker function-- this fires a `fetch` event on that Worker

## The `fetch` event in a Cloudflare Worker

When the Workers runtime triggers a `fetch` event, it also creates a [FetchEvent Object](/reference/runtime/apis/fetch-event) to pass to the first event handler in the Worker function registered for `fetch`.

## The Request Context

At this point in time; the time in which the `fetch` event is being handled, we are in what is called the `Request` context. This context allows us to use functions such as `fetch()` inside our Worker.

```javascript
addEventListener('fetch', event => {
  // the request context is available here
  event.respondWith(/*...*/)
})
```

### When is the `Request` context active?

Beyond inside the initial `fetch` handler of your Worker function, the `Request` context is available:

#### When passing a promise to `FetchEvent.respondWith()`

If you pass a Response promise to `FetchEvent.respondWith()`, the request context is active during any asynchronous tasks which run before the Response promise has settled. You can pass the event to an async handler, for example:

```javascript
addEventListener('fetch', event => {
  event.respondWith(eventHandler(event))
})
// no request context here
async function eventHandler(event){
  // request context is available here
  return new Response('Hello, Workers!')
}
```

### What happens when attempting to access an inactive `Request` context?

Any attempt to use APIs such as `fetch()` or access `Request` context during script startup will throw an exception:

```javascript
const promise = fetch('https://example.com/') // ERROR
async function eventHandler(event){..}
```

This code snippet will throw during script startup, and the `"fetch"` event
listener will never be registered.

## Handling a `fetch` event in a Cloudflare Worker

The event handler that catches the `fetch` event can use any of the following to control what happens next:

### `respondWith()`

Intercepts the request and allows users to send a custom response. 	Intercepts the request and allows users to send a custom response. 
If a `fetch` event handler does not call `respondWith()`, the runtime delivers the event to the next registered `fetch` event handler. If no event handler calls `respondWith()`, the runtime proxies the request to the origin. Note: If no origin is setup (always true for workers.dev sites), then you must have a `respondWith()` called for a valid response.

### `waitUntil()`

Extends the lifetime of the event using a `Promise` passed into the function. Use this method to notify the runtime to wait for tasks, such as streaming and caching, that run longer than the usual time it takes to send a response. This is good for handling logging and analytics to third-party services, where you don't want to block the `response`. 

### `passThroughOnException()`	

Causes the script to "fail open" (meaning the execution of code is not halted) on unhandled exceptions. Instead of returning a runtime error response, the runtime proxies the request to its destination. To prevent JavaScript errors from causing entire requests to fail on uncaught exceptions, `passThroughOnException()` causes the Worker to act as if the exception wasn’t there. This allows you to yield control to your origin server.



* How the Workers runtime treats requests differently from regular ServiceWorkers [in place]
* How Workers measures time: CPU usage
* The `FetchEvent` lifecycle, and how it affects your Worker [in place]
* The `Request` context, and how it affects your Worker code [in place]
* How `fetch()` calls are handled from inside a Worker
* When does a Worker stop running?