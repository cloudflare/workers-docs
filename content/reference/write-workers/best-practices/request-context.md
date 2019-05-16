---
title: The Request Context
---

It is important to note that due to [how workers are executed](../), some APIs are only available inside a request context.

## When is the `Request` context active?

### During a [Fetch Event](../../apis/fetch-event) callback:

```javascript
addEventListener('fetch', event => {
  // the request context is active here via the event parameter
  event.respondWith(/*...*/)
})
```

### When passing a promise to `FetchEvent.respondWith()`

If you pass a Response promise to `FetchEvent.respondWith()`, the request context is active during any asynchronous tasks which run before the Response promise has settled. You can pass the event to an async handler, for example:

```javascript
addEventListener('fetch', event => {
  event.respondWith(eventHandler(event))
})

async function eventHandler(event){
  // the request context is available in this function as it is passed in via the event parameter
  // because we passed this to the .respondWith() above, the request context is available until
  // this function has completed
  return new Response('Hello, Workers!')
}
```

## What happens when attempting to access an inactive `Request` context?

Any attempt to use APIs such as `fetch()` or access `Request` context during script startup will throw an exception:

```javascript
const promise = fetch('https://example.com/') // ERROR
```

This code snippet will throw during script startup, and no code after it would execute.
