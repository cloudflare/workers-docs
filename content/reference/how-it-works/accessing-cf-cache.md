---
title: Accessing the Cloudflare Cache
---

## Quick Start

```javascript
addEventListener('fetch', event => event.respondWith(handle(event)))

async function handle(event) {
  let cache = caches.default
  let response = await cache.match(event.request)

  if (!response) {
    response = doSuperComputationallyHeavyThing()
    event.waitUntil(cache.put(event.request, response.clone()))
  }

  return response
}
```

## Interacting with the Cloudflare Cache

Conceptually, every individual zone on Cloudflare has its own cache space. There are three ways to interact with these cache spaces: using a browser, using [`fetch()`](../fetch) from a Worker, and using the Cache API from a Worker.

### From a Browser

External requests from browsers check to see which zone a URL matches, and read through that zone's cache.

### From your Workers scripts

The Cache API provided by the Workers runtime always uses your own zone's cache, no matter what. You can never store a response in a different zone's cache. For these purposes, your workers.dev scripts are considered part of their own zone.

#### Using `fetch`

Calling [`fetch()`](../fetch) from your Workers script checks to see if the URL matches a different zone. If it does, it reads through that zone's cache. Otherwise, it reads through its own zone's cache, even if the URL is for a non-Cloudflare site.

[`fetch()`](../fetch) requests a URL and automatically applies caching rules based on your Cloudflare settings. It does not allow you to modify objects before they reach cache, or inspect if an object is in cache before making a request.

#### Using `cache-default`

The Cache API's `caches.default` Cache object allows you to:

- fetch a response for a URL if and only if it is cached using `Cache.match()`.
- explicitly store a response in the cache using `Cache.put()`.

If your Worker uses the Cache API to store a response for a URL ...

- ... on your own zone, and that URL [is cacheable/has a Cache Everything page rule](https://support.cloudflare.com/hc/en-us/articles/115000150272-How-do-I-use-Cache-Everything-with-Cloudflare-), then every Worker on every zone which `fetch()`es that URL and every browser request will see the response your Worker stored.
- ... on a different Cloudflare zone, then the only way to retrieve that response is via your Worker's Cache API.
- ... on a non-Cloudflare site, then your own zone's Worker will see the response your Worker stored if it `fetch()`es that URL, but no other Worker or browser will see that response.

## Expiring cache objects

You can specify any TTL for an object via the `Cache-Control` header, or an absolute expiration date via the `Expires` header. If it is not accessed frequently enough, it may be evicted from cache. There are no guarantees about how long an object stays in cache.

Setting the Cache-Control header on the response you put into the cache will modify the edge cache time. If you have Browser TTL set in the Cloudflare dashboard, it will override the client-facing TTL set by Cache-Control.

## Examples

### Add Cache-Tag to response

This script will add [cache tags](https://support.cloudflare.com/hc/en-us/articles/206596608-How-to-Purge-Cache-Using-Cache-Tags-Enterprise-only-) to the response corresponding to directories in the request. For example, the url `https://www.example.com/foo/bar/baz.jpg` will get the header:
`Cache-Tag: www.example.com/foo/*,www.example.com/foo/bar/*`

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

/**
 * Fetch a request and add a tag
 * @param {Request} request
 */
async function handleRequest(event) {
  let request = event.request
  let cache = caches.default

  let response = await cache.match(request)

  if (!response) {
    let requestUrl = new URL(event.request.url)
    let tags = []
    let dirs = requestUrl.pathname.split('/')

    // Drop first and last element so that we only get necessary parts of the path
    dirs = dirs.slice(1, -1)

    // Cache tags are comma delimited, so we should encode commas
    dirs = dirs.map(encodeURIComponent)

    for (let i = 0; i < dirs.length; i++) {
      tags[i] = requestUrl.hostname + '/' + dirs.slice(0, i + 1).join('/') + '/*'
    }

    response = await fetch(request)
    response = new Response(response.body, response)
    response.headers.append('Cache-Tag', tags.join(','))
    event.waitUntil(cache.put(request, response.clone()))
  }

  return response
}
```

### Caching POST requests

```javascript
async function handleRequest(event) {
  let request = event.request
  let response

  if (request.method == 'POST') {
    let body = await request.clone().text()
    let hash = await sha256(body)
    let url = new URL(request.url)
    url.pathname = "/posts" + url.pathname + hash

    // Convert to a GET to be able to cache
    let cacheKey = new Request(url, {headers: request.headers, method: 'GET'})

    let cache = caches.default
    //try to find the cache key in the cache
    response = await cache.match(cacheKey)

    // otherwise, fetch from origin
    if (!response) {
      // makes POST to the origin
      response = await fetch(request.url, newRequest)
      event.waitUntil(cache.put(cacheKey, response.clone()))
    } else {
    response = await fetch(request)
  }
  return response
}

async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message)

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  // convert bytes to hex string
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('')
  return hashHex
}
```

## FAQ

### Where are cache objects stored?

Objects are stored in the local datacenter that handles the request. They are not replicated to any other datacenters.

### What are the usage limits on the cache API?

- 50 total `put()`, `match()`, or `delete()` calls per request, using the same quota as fetch()
- 500 MBs total `put()` per request
- Each `put()` with a valid `Content-Length` header may be up to 50MB
- A `put()` with `Transfer-Encoding: chunked` may be up to 500MB, but it will block subsequent `put()`s until the transfer is complete.

### How do I check if a response is cached?

If a response has filled the cache, you will see a response header `CF-Cache-Status: HIT`

