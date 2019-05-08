# Cache API

## Overview

By default Cloudflare provides cache space per domain for serving static assets from our Edge network. This reduces the time it takes visitors to navigate your site by reducing the distance the data has to travel. It also reduces the traffic load on your web server by returning the same response for identical requests.

This is great for static assets like images, html, and css, but much of the traffic moving across the web is dynamic data that is requested via AJAX requests. By default, this kind of traffic is not cached, and therefore misses out on the benefits of caching.

The Cache API described by the [Service Worker](TODO) specification provides a way to customize your cache's behavior using JavaScript.

## The Cache Object

The Cloudflare Workers runtime exposes a single global Cache object, `caches.default`.

This differs from web browsers' Cache API in that they do not expose any default cache object.

#### Syntax

``` javascript
let cache = caches.default
```

### Methods

#### `put`

Adds a response keyed to the given request to the cache. Returns a promise which resolves to `undefined` once the cache has stored the response. 

##### Syntax

```javascript
cache.put(request, response)
```

##### Parameters

`request`: Either a string or a [`Request`](TODO: link fetch api request reference) object to serve as the key. If a string is passed, it will be interpreted as the URL for a new Request object.

`response`: A [`Response`](TODO: link fetch api response reference) object to store under the given key.

##### Invalid Parameters

`cache.put` will throw an error if:

* the `request` passed has a method other than `GET`
* the `response` passed has a `status` of [`206 Partial Content`](https://httpstatuses.com/206)
* the `response` passed contains the header `Vary: *` (required by Cache API specification)

##### Headers

Our implementation of the Cache API respects the following HTTP headers on the response passed to `put()`:

* `Cache-Control`: Controls caching directives. Consistent with [Cloudflare Cache-Control Directives](https://support.cloudflare.com/hc/en-us/articles/115003206852-Origin-Cache-Control#h_4250342181031546894839080). See also [Expiring cache objects](#expiring-cache-objects)
* `Cache-Tag`: Allows the resource to be purged by tag(s) later. (Enterprise only)
* `ETag`: Allows `cache.match()` to evaluate conditional requests with `If-None-Match`.
* `Expires`: A string that specifies when the resource becomes invalid. See also [Expiring cache objects](#expiring-cache-objects)
* `Last-Modified`: Allows `cache.match()` to evaluate conditional requests with `If-Modified-Since`.

This differs from web browsers' Cache API in that they do not honor any headers on the request or response.

**Note:** Responses with `Set-Cookie` headers will never be cached, as this sometimes indicates that
the response contains unique data. To store a response with a `Set-Cookie` header, either delete
that header or set `Cache-Control: private=Set-Cookie` on the response before calling `cache.put()`.
Using the `Cache-Control` method will allow the response to be stored, but without the `Set-Cookie`
header.

#### `match`

Returns a promise wrapping the response object keyed to that request.

##### Syntax

```javascript
cache.match(request, options)
```

##### Parameters

`request`: The string or [`Request`](TODO: link fetch api request reference) object used as the lookup key. If a string is passed, it will be interpreted as the URL for a new Request object.

`options`: The options object may contain one possible property:

* `ignoreMethod` (bool): Consider the request method to be GET, regardless of its actual value.

Unlike the browser Cache API, Cloudflare Workers does not support the `ignoreSearch` or `ignoreVary` options on `match()` at this time. This behavior can be accomplished by removing query strings or HTTP headers at `put()` time.

Our implementation of the Cache API respects the following HTTP headers on the request passed to `match()`:

* `Range`: Results in a 206 response if a matching response is found. Note that our cache always respects range requests, whether or not an `Accept-Ranges` header is on the response.
* `If-Modified-Since`: Results in a 304 response if a matching response is found with a `Last-Modified` header whose value is after the time point listed in `If-Modified-Since`.
* `If-None-Match`: Results in a 304 response if a matching response is found with an `ETag` header whose value matches one of the values in `If-None-Match`.

`cache.match()` never sends a subrequest to the origin. If no matching response is found in cache, the promise that `cache.match()` returns gets fulfilled with `undefined`.

#### `delete`

Deletes the `Response` object from the cache and returns a `Promise` for a boolean. `true` means the response was cached and has now been deleted; `false` means the response was not in the cache at the time of deletion.

##### Syntax

``` javascript
cache.delete(request, options)
```

##### Parameters

`request`: The string or [`Request`](TODO: link fetch api request reference) object used as the lookup key. If a string is passed, it will be interpreted as the URL for a new Request object.

`optons`: The options object may contain one possible property:

* `ignoreMethod` (bool): Consider the request method to be GET, regardless of its actual value.

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
};
```

## Interacting with the Cloudflare Cache

Conceptually, every individual zone on Cloudflare has its own cache space. There are three ways to interact with these cache spaces: using a browser, using [`fetch()`](TODO: Link Fetch API Reference) from a Worker, and using the Cache API from a Worker.

### From a Browser

External requests from browsers check to see which zone a URL matches, and read through that zone's cache.

### From your Workers scripts

The Cache API provided by the Workers runtime always uses your own zone's cache, no matter what. You can never store a response in a different zone's cache. For these purposes, your workers.dev scripts are considered part of their own zone.

#### Using `fetch`

Calling [`fetch()`](TODO: Link FetchAPI reference)  from your Workers script checks to see if the URL matches a different zone. If it does, it reads through that zone's cache. Otherwise, it reads through its own zone's cache, even if the URL is for a non-Cloudflare site.

`fetch()` requests a URL and automatically applies caching rules based on your Cloudflare settings. It does not allow you to modify objects before they reach cache, or inspect if an object is in cache before making a request.

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

``` javascript
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
    let dirs = requestUrl.pathname.split("/")

    // Drop first and last element so that we only get necessary parts of the path
    dirs = dirs.slice(1, -1)

    // Cache tags are comma delimited, so we should encode commas
    dirs = dirs.map(encodeURIComponent)

    for (let i = 0; i < dirs.length; i++) {
      tags[i] = requestUrl.hostname + "/" + dirs.slice(0, i+1).join("/") + "/*"
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
