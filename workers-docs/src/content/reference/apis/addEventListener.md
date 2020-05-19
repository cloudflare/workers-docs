---
title: addEventListener
weight: 3
---

To define triggers for a Worker script to execute. Currently the only event type supported is [`FetchEvent`](/reference/apis/fetch-event).

If multiple event listeners are registered, when an event handler does not call `respondWith()` the runtime delivers the event to the next registered event handler.

## Usage

```js
addEventListener('fetch', event => {…})
```

`event` is of type [`FetchEvent`](/reference/apis/fetch-event)
