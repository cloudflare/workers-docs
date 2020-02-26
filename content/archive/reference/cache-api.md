---
title: Cache API
alwaysopen: false
weight: 10
---

# Introduction to the Cache API

The Cache API gives you fine grained control of reading and writing from cache, and deciding exactly when to fetch data from your origin. 

This API is strongly influenced by the web browsers’ Cache API, but there are some important differences (documented below).

## Quick start: What does it look like to use the Cache API?

{{< highlight javascript >}}
self.addEventListener('fetch', event => event.respondWith(handle(event)))

async function handle(event) {
  let cache = caches.default
  let response = await cache.match(event.request)

  if (!response) {
    response = doSuperComputationallyHeavyThing()
    event.waitUntil(cache.put(event.request, response.clone()))
  }

  return response
};
{{< / highlight >}}

# Detailed documentation

## The default `Cache` object

The Cloudflare Workers runtime exposes a single global Cache object, `caches.default`.

This differs from web browsers' Cache API in that they do not expose any default cache object.

## Using a `Cache` object

A Cache object exposes three methods. Each method accepts a Request object or string value as its first parameter. If a string is passed, it will be interpreted as the URL for a new Request object.

### `cache.put(request, response)`

Adds a response keyed to the given request to the cache. Note that the request method must be GET.

Returns a promise which resolves to `undefined` once the cache has stored the response.

Our implementation of the Cache API respects the following HTTP headers on the response passed to `put()`:

* `Cache-Control`: Controls caching directives.
* `Cache-Tag`: Allows the resource to be purged by tag(s) later.
* `ETag`: Allows `cache.match()` to evaluate conditional requests with `If-None-Match`.
* `Expires`: A string that specifies when the resource becomes invalid.
* `Last-Modified`: Allows `cache.match()` to evaluate conditional requests with `If-Modified-Since`.

This differs from web browsers' Cache API in that they do not honor any headers on the request or response.

**Note:** Responses with `Set-Cookie` headers will never be cached, as this sometimes indicates that
the response contains unique data. To store a response with a `Set-Cookie` header, either delete
that header or set `Cache-Control: private=Set-Cookie` on the response before calling `cache.put()`.
Using the `Cache-Control` method will allow the response to be stored, but without the `Set-Cookie`
header.

### `cache.match(request, options)`

Returns a promise for the response object keyed to that request.

The options object may contain one possible property:

* `ignoreMethod` (bool): Consider the request method to be GET, regardless of its actual value.

Unlike the browser Cache API, Cloudflare Workers does not support the `ignoreSearch` or `ignoreVary` options on `match()` at this time. This behavior can be accomplished by removing query strings or HTTP headers at `put()` time.

Our implementation of the Cache API respects the following HTTP headers on the request passed to `match()`:

* `Range`: Results in a 206 response if a matching response is found. Note that our cache always respects range requests, whether or not an `Accept-Ranges` header is on the response.
* `If-Modified-Since`: Results in a 304 response if a matching response is found with a `Last-Modified` header whose value is after the time point listed in `If-Modified-Since`.
* `If-None-Match`: Results in a 304 response if a matching response is found with an `ETag` header whose value matches one of the values in `If-None-Match`.

`cache.match()` never sends a subrequest to the origin. If no matching response is found in cache, the promise that `cache.match()` returns gets fulfilled with `undefined`.

### `cache.delete(request, options)`

Deletes the response object from the cache and returns a promise for a boolean. True means the response was cached and has now been deleted; false means the response was not in the cache at the time of deletion.

The options object may contain one possible property:

* `ignoreMethod` (bool): Consider the request method to be GET, regardless of its actual value.

# FAQ

## Who can use the Cache API?

Any customer who uses Workers. Some features are enterprise-only (e.g. cache tags).

## Where are these objects stored?

Objects are stored in the local datacenter that handles the request. They are not replicated to any other datacenters.

## How long do objects stay in cache?

You can specify any TTL for an object via the `Cache-Control` header, or an absolute expiration date via the `Expires` header. If it is not accessed frequently enough, it may be evicted from cache. There are no guarantees about how long an object stays in cache.

## What are the usage limits on the cache API?

 * 50 total `put()`, `match()`, or `delete()` calls per request, using the same quota as fetch()
 * 500 MBs total `put()` per request
 * Each `put()` with a valid `Content-Length` header may be up to 50MB
 * A `put()` with `Transfer-Encoding: chunked` may be up to 500MB, but it will block subsequent `put()`s until the transfer is complete.

## How is this related to `fetch()`

`fetch()` requests a URL and automatically applies caching rules based on your Cloudflare settings. It does not allow you to modify objects before they reach cache, or inspect if an object is in cache before making a request.

The Cache API's `caches.default` Cache object allows you to:

* fetch a response for a URL if and only if it is cached using `Cache.match()`.
* explicitly store a response in the cache using `Cache.put()`.

## How is this related to regular Cloudflare cache

Conceptually, every individual zone on Cloudflare has its own cache space. There are three ways to interact with these cache spaces: using the Cache API from a Worker, using `fetch()` from a Worker, and using a browser. Each method follows a different rule:

* The Cache API in your Worker always uses your own zone's cache, no matter what. You can never store a response in a different zone's cache.
* `fetch()` in your Worker checks to see if the URL matches a different zone. If it does, it reads through that zone's cache. Otherwise, it reads through your own zone's cache, even if the URL is for a non-Cloudflare site.
* External requests from browsers check to see which zone a URL matches, and read through that zone's cache.

Therefore, if your Worker uses the Cache API to store a response for a URL ...

* ... on your own zone, and that URL [is cacheable/has a Cache Everything page rule](https://support.cloudflare.com/hc/en-us/articles/115000150272-How-do-I-use-Cache-Everything-with-Cloudflare-), then every Worker on every zone which `fetch()`es that URL and every browser request will see the response your Worker stored.
* ... on a different Cloudflare zone, then the only way to retrieve that response is via your Worker's Cache API.
* ... on a non-Cloudflare site, then your own zone's Worker will see the response your Worker stored if it `fetch()`es that URL, but no other Worker or browser will see that response.

## Can I purge objects added in the Cache API?

Yes. You can purge either by URL or by setting a `Cache-Tag` header on the response and purging by tag.

## How do I check if a response is cached?

If a response has filled the cache, you will see a response header `CF-Cache-Status: HIT`

## I'm setting a Cache-Control header, but the Cache-Control header in the response doesn't seem to match

Setting the Cache-Control header on the response you put into the cache will modify the edge cache time. If you have Browser TTL set in the Cloudflare dashboard, it will override the client-facing TTL set by Cache-Control. 

# Examples

## Add Cache-Tag to response

This script will add [cache tags](https://support.cloudflare.com/hc/en-us/articles/206596608-How-to-Purge-Cache-Using-Cache-Tags-Enterprise-only-) to the response corresponding to directories in the request. For example, the url `https://www.example.com/foo/bar/baz.jpg` will get the header:
`Cache-Tag: www.example.com/foo/*,www.example.com/foo/bar/*`

{{< highlight javascript >}}

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

{{< / highlight >}}

## Caching POST requests
{{< highlight javascript >}}
async function handleRequest(event) {
  let request = event.request
  let response

  if (request.method == 'POST') {
    let body = await request.clone().text()
    let hash = await sha256(body)

    let url = new URL(request.url)
    url.pathname = "/posts" + url.pathname + hash

    // Convert to a GET to be able to cache
    let getRequest = new Request(url, {headers: request.headers, method: 'GET'})

    let cache = caches.default
    //try to find the cache key in the cache
    response = await cache.match(getRequest)

    // otherwise, fetch from origin
    if (!response) {
      // makes POST to the origin
      response = await fetch(request.url, newRequest)
      event.waitUntil(cache.put(getRequest, response.clone()))
    }
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

{{< / highlight >}}
