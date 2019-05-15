---
title: Cache API
---

## Overview

By default Cloudflare provides cache space per domain for serving static assets from our Edge network. This reduces the time it takes visitors to navigate your site by reducing the distance the data has to travel. It also reduces the traffic load on your web server by returning the same response for identical requests.

This is great for static assets like images, html, and css, but much of the traffic moving across the web is dynamic data that is requested via AJAX requests. By default, this kind of traffic is not cached, and therefore misses out on the benefits of caching.

The Cache API described by the [Service Worker](https://w3c.github.io/ServiceWorker/#cache) specification provides a way to customize your cache's behavior using JavaScript.

## The Cache Object

The Cloudflare Workers runtime exposes a single global Cache object, `caches.default`.

This differs from web browsers' Cache API in that they do not expose any default cache object.

#### Syntax

```javascript
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

`request`: Either a string or a [`Request`](../fetch#request) object to serve as the key. If a string is passed, it will be interpreted as the URL for a new Request object.

`response`: A [`Response`](../fetch#response) object to store under the given key.

##### Invalid Parameters

`cache.put` will throw an error if:

- the `request` passed has a method other than `GET`
- the `response` passed has a `status` of [`206 Partial Content`](https://httpstatuses.com/206)
- the `response` passed contains the header `Vary: *` (required by Cache API specification)

##### Headers

Our implementation of the Cache API respects the following HTTP headers on the response passed to `put()`:

- `Cache-Control`: Controls caching directives. Consistent with [Cloudflare Cache-Control Directives](https://support.cloudflare.com/hc/en-us/articles/115003206852-Origin-Cache-Control#h_4250342181031546894839080). See also [Expiring cache objects](#expiring-cache-objects)
- `Cache-Tag`: Allows the resource to be purged by tag(s) later. (Enterprise only)
- `ETag`: Allows `cache.match()` to evaluate conditional requests with `If-None-Match`.
- `Expires`: A string that specifies when the resource becomes invalid. See also [Expiring cache objects](#expiring-cache-objects)
- `Last-Modified`: Allows `cache.match()` to evaluate conditional requests with `If-Modified-Since`.

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

`request`: The string or [`Request`](../fetch#request) object used as the lookup key. If a string is passed, it will be interpreted as the URL for a new Request object.

`options`: The options object may contain one possible property:

- `ignoreMethod` (bool): Consider the request method to be GET, regardless of its actual value.

Unlike the browser Cache API, Cloudflare Workers does not support the `ignoreSearch` or `ignoreVary` options on `match()` at this time. This behavior can be accomplished by removing query strings or HTTP headers at `put()` time.

Our implementation of the Cache API respects the following HTTP headers on the request passed to `match()`:

- `Range`: Results in a 206 response if a matching response is found. Note that our cache always respects range requests, whether or not an `Accept-Ranges` header is on the response.
- `If-Modified-Since`: Results in a 304 response if a matching response is found with a `Last-Modified` header whose value is after the time point listed in `If-Modified-Since`.
- `If-None-Match`: Results in a 304 response if a matching response is found with an `ETag` header whose value matches one of the values in `If-None-Match`.

`cache.match()` never sends a subrequest to the origin. If no matching response is found in cache, the promise that `cache.match()` returns gets fulfilled with `undefined`.

#### `delete`

Deletes the `Response` object from the cache and returns a `Promise` for a boolean. `true` means the response was cached and has now been deleted; `false` means the response was not in the cache at the time of deletion.

##### Syntax

```javascript
cache.delete(request, options)
```

##### Parameters

`request`: The string or [`Request`](../fetch#request) object used as the lookup key. If a string is passed, it will be interpreted as the URL for a new Request object.

`optons`: The options object may contain one possible property:

- `ignoreMethod` (bool): Consider the request method to be GET, regardless of its actual value.

