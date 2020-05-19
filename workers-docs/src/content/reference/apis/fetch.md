---
title: fetch()
weight: 2
---

## Overview

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provides an interface for asyncronously fetching resources via HTTP requests inside of a Worker.

## Global

The `fetch` method is implemented on the ServiceWorkerGlobalScope. See [MDN documentation ](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) for more information.

_Note: Asynchronous tasks such as `fetch` are not executed at the top level in a Worker script and must be executed within a FetchEvent handler such as [`respondWith`](/reference/apis/fetch-event#methods). Learn more about [Request Contexts](/about/tips/request-context)._

## Syntax

`fetch(request:`[`Request`](/reference/apis/request)`| String, init?:`[`RequestInit`](/reference/apis/request)`) : Promise <`[`Response`](/reference/apis/response)`>`

Where request is the request or the string of the URL.

## Usage

```js
addEventListener('fetch', (event) => {
  event.respondWith(eventHandler(event))
})
// note: don’t use fetch here
async function eventHandler(event) {
  // fetch available here
  const resp = await fetch(event.request)
  return resp
}
```

Examples:

- [Fetch HTML](/templates/pages/fetch_html)
- [Fetch JSON](/templates/pages/fetch_json)
- [Cache using Fetch](/templates/pages/cache_ttl/)
