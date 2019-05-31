---
title: The Request Context
---

## What is the `Request` context?

Request context is the context of the `"fetch"` event callback. It is important to note that due to how workers are executed, asynchronous tasks (e.g. `fetch `) can only be run *inside* the request context.

During a [Fetch Event](/reference/runtime/apis/fetch-event/) callback:

```javascript
addEventListener('fetch', event => {
  // the request context is available here
  event.respondWith(/*...*/)
})
```

## When is the `Request` context active?

### When passing a promise to `FetchEvent.respondWith()`

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

## What happens when attempting to access an inactive `Request` context?

Any attempt to use APIs such as `fetch()` or access `Request` context during script startup will throw an exception:

```javascript
const promise = fetch('https://example.com/') // ERROR
async function eventHandler(event){..}
```

This code snippet will throw during script startup, and the `"fetch"` event
listener will never be registered.
