# Standard APIs

The Workers Runtime provides the following standardized APIs for use by scripts running at the Edge.

It is important to note that due to [how workers are executed](TODO: link to "How Workers Work"), some APIs are only available inside a request context. A request context is active during a [Fetch Event](TODO: hashlink) callback, and, if you pass a Response promise to FetchEvent.respondWith(), any asynchronous tasks which run before the Response promise has settled. Any attempt to use such APIs during script startup will throw an exception.

For example:

``` javascript
const promise = fetch("https://example.com/")       // ERROR

addEventListener("fetch", event => {
  event.respondWith(fetch("https://example.com/"))  // OK
})
```

This code snippet will throw during script startup, and the `"fetch"` event
listener will never be registered.

Also, some APIs are only available in production, and not in the playground. The playgrounds are the Workers instances which power cloudflareworkers.com and the Workers editor UI on dash.cloudflare.com.

## JavaScript Standards

All of the standard built-in objects supported by the current [Google Chrome stable release](TODO: link to google chrome release notes) are supported, with a few notable exceptions:

* `eval()` is not allowed for security reasons.
* `new Function` is not allowed for security reasons.
* `Date.now()` returns the time of the last I/O; it does not advance during code execution.

[Go to the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

## Service Worker API

[FetchEvent](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent).

[Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache)

## Web Global APIs

The following methods are available per the [Worker Global Scope](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope):

* `atob()`
* `btoa()`
* `clearInterval()`
* `clearTimeout()`
* `setInterval()`
* `setTimeout()`

## Encoding API

Both TextEncoder and TextDecoder support UTF-8 encoding/decoding.

[Go to the docs](https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API)

## URL API

The URL API supports urls conforming to http and https schemes.

[Go to the docs](https://developer.mozilla.org/en-US/docs/Web/API/URL)

## Fetch API

[Fetch](https://developer.mozilla.org/docs/Web/API/Fetch_API) is implemented as expected within a Service Worker, with the exception of some features inapplicable to the edge, such as CORS-related properties.

* TODO: expand list of supported features

## Stream API

The [Request]() object implements [WritableStream]().

The [Response]() object implements [ReadableStream]().

An object implementing both WritableStream and ReadableStream can be instantiated using the zero-argument constructor [TransformStream()]()

## Web Crypto API

Cryptographically-secure random number generation
Digest (SHA family, MD5)
Sign and verify (HMAC (with SHA family, MD5), RSASSA-PKCS1-v1_5, ECDSA)
Encrypt and decrypt (AES-GCM, AES-CBC)
Key derivation (PBKDF2)
Key generation (AES-GCM, HMAC)
Raw key import/export for all of the above algorithms

