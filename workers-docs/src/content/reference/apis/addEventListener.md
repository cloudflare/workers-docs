---
title: addEventListener()
weight: 3
---

To define triggers for a Worker script to execute. Currently the only event type supported is [`FetchEvent`](/reference/apis/fetch-event).

## Syntax

`addEventListener(type: 'fetch', handler: (event: `[`FetchEvent`](/reference/apis/fetch-event)`) => void): void`

If multiple event listeners are registered, when an event handler does not call `respondWith()` the runtime delivers the event to the next registered event handler.
