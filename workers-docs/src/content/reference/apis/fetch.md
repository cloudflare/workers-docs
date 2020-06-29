---
title: fetch()
weight: 2
---

## Overview

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provides an interface for asynchronously fetching resources via HTTP requests inside of a Worker.

## Global

The `fetch` method is implemented on the ServiceWorkerGlobalScope. See [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) for more information.

_Note: Asynchronous tasks such as `fetch` are not executed at the top level in a Worker script and must be executed within a FetchEvent handler such as [`respondWith`](/reference/apis/fetch-event#methods). Learn more about [Request Contexts](/about/tips/request-context)._

## Syntax

`fetch(request: `[`Request`](/reference/apis/request)` | string, init?: `[`RequestInit`](/reference/apis/request)`) : Promise<`[`Response`](/reference/apis/response)`>`

`request`: A [`Request`](/reference/apis/request) object or a string representing the URL to be fetched.

## Usage

```js
addEventListener('fetch', (event) => {
  // NOTE: don’t use fetch here, as we're not in an async scope yet
  event.respondWith(eventHandler(event))
})
async function eventHandler(event) {
  // fetch can be awaited here since `event.respondWith()` waits for the Promise it receives to settle
  const resp = await fetch(event.request)
  return resp
}
```

## Examples

- [Fetch HTML](/templates/pages/fetch_html)
- [Fetch JSON](/templates/pages/fetch_json)
- [Cache using Fetch](/templates/pages/cache_ttl/) 