---
title: The Request Context
---

It is important to note that due to [how workers are executed](../), some APIs are only available inside a request context. A request context is active during a [Fetch Event](../../apis/fetch-event) callback, and, if you pass a Response promise to FetchEvent.respondWith(), any asynchronous tasks which run before the Response promise has settled. Any attempt to use such APIs during script startup will throw an exception.

For example:

```javascript
const promise = fetch('https://example.com/') // ERROR

addEventListener('fetch', event => {
  event.respondWith(fetch('https://example.com/')) // OK
})
```

This code snippet will throw during script startup, and the `"fetch"` event
listener will never be registered.

