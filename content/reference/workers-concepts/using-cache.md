---
title: Using the Cache API
---

Cloudflare provides cache space per domain for serving static assets from our Edge network. This reduces visitors take to navigate your site by reducing the distance the data must travel. It also reduces the traffic load on your web server by returning the same response for identical requests. This is great for static assets like images, HTML, and CSS, but much of the traffic moving across the web is dynamic data requested using AJAX requests. Note that this traffic is not cached, and therefore misses out on the benefits of caching.

The [Cache API](/reference/runtime/apis/cache) provides a way to customize your cache behavior using JavaScript.

## Quick Start

This example uses `addEventListener` to manage the response.


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

Conceptually, every individual zone on Cloudflare has its own cache space. There are three ways to interact with your cache:
* In a browser
* Use [`fetch()`](/reference/runtime/apis/fetch) from a Workers script
* Use the Cache API from a Workers script.

### In a Browser

External requests from browsers check the zone the URL matches, and reads through that cache.

### Fetch in a Workers script

The Cache API provided by the Workers runtime always uses the cache in your own zone, no matter what. You can never store a response in another zone's cache. This is why workers.dev scripts are considered part of their own zone.

#### Using [`fetch`](/reference/runtime/apis/fetch)

Calling `fetch` from your Workers script checks to see if the URL matches a different zone. If it does, it reads through that zone's cache. Otherwise, it reads through its own zone's cache, even if the URL is for a non-Cloudflare site.

`fetch` requests a URL and automatically applies caching rules based on your Cloudflare settings. `fetch` does not allow you to modify objects before they reach the cache or inspect if an object is in the cache before making a request.

#### Using `cache-default`

The `caches.default` Cache API Cache object allows you to:

* Fetch a response for a URL if (and only if) it is cached using `Cache.match()`.
* Explicitly store a response in the cache using `Cache.put()`.

If your Workers script uses the Cache API to store a response for a URL ...

* ... on your own zone and that URL [is cacheable or has a _Cache Everything_ page rule](https://support.cloudflare.com/hc/en-us/articles/115000150272-How-do-I-use-Cache-Everything-with-Cloudflare-), then every Workers on every zone that `fetch()`es that URL and every browser request sees the response your Workers stored.
* ... on a different Cloudflare zone, then the only way to retrieve that response is using a Workers Cache API.
* ... on a non-Cloudflare site, then your own zone's Workers sees the response your Workers stored if it `fetch()`es that URL, but no other Workers or browser sees that response.

## Expiring cache objects

You can specify any TTL for an object in the `Cache-Control` header or an absolute expiration date in the `Expires` header. If it is not accessed frequently enough, it may be evicted from cache.

**Note:** There are no guarantees for how long an object stays in the cache.

Set the `Cache-Control` header on the response stored in cache modifies the edge-cache time.

**Note:** The **Browser TTL** setting in your Cloudflare dashboard overrides the client-facing TTL set by `Cache-Control`.

## Examples

### Add Cache-Tag to response

This script adds [cache tags](https://support.cloudflare.com/hc/en-us/articles/206596608-How-to-Purge-Cache-Using-Cache-Tags-Enterprise-only-) to the response corresponding to directories in the request. For example, the URL  `https://www.example.com/foo/bar/baz.jpg` gets the header:

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

Cache objects are stored in the local datacenter handling the request and are not replicated to other datacenters.

### What are the usage limits on the cache API?

- 50 total `put()`, `match()`, or `delete()` calls per-request, using the same quota as `fetch()`
- 500 MBs total `put()` per-request
- up to 50MB for each `put()` with a valid `Content-Length` header
- up to 500MB for a `put()` with `Transfer-Encoding: chunked`. Note that this blocks subsequent `put()`s until the transfer completes.

### How do I check if a response is cached?

If a response fills the cache, the response header contains `CF-Cache-Status: HIT`.
