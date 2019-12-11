---
title: "Reference"
alwaysopen: false
weight: 70
---

## JavaScript / ECMAScript

Cloudflare Workers uses the V8 JavaScript engine from Google Chrome. The Workers runtime is updated at least once a week, to at least the version that is currently used by Chrome's stable release. This means you can safely use latest JavaScript features, with no need for "transpilers".

## Standard APIs

This is a summary of the JavaScript APIs available to Cloudflare Worker scripts, and links to their
documentation on [MDN](https://developer.mozilla.org/). Cloudflare currently implements a
subset of these APIs, as shown on this table. We are adding support for more APIs all the
time -- [let us know](https://community.cloudflare.com/c/developers/workers) if we're missing one
you need.

| API                                                                                      | Support                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ECMAScript Builtins](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) | Everything supported by current Google Chrome stable release. <br> [WebAssembly]({{< ref "/tooling/api/bindings" >}}) <br> `eval()` and `new Function()` are disallowed for security reasons. <br> `Date.now()` returns the time of last I/O; it does not advance during code execution.                             |
| [Service Worker API](https://developer.mozilla.org/docs/Web/API/Service_Worker_API)      | `"fetch"` event <br> [Cache API]({{< ref "archive/reference/cache-api.md" >}})[^no-playground]                                                                                                                                                                                                                                                      |
| [Web Global APIs](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope)  | Base64 utility methods <br> Timers[^request-ctx]                                                                                                                                                                                                                                                                                                    |
| [Encoding API](https://developer.mozilla.org/docs/Web/API/Encoding_API)                  | UTF-8                                                                                                                                                                                                                                                                                                                                               |
| [URL API](https://developer.mozilla.org/docs/Web/API/URL)                                | http://, https:// schemes                                                                                                                                                                                                                                                                                                                           |
| [Fetch API](https://developer.mozilla.org/docs/Web/API/Fetch_API)[^request-ctx]          | `fetch()`, Headers, Request, and Response classes <br> (some features inapplicable to the edge, such as CORS-related properties, are not implemented)                                                                                                                                                                                               |
| [Streams API](https://developer.mozilla.org/docs/Web/API/Streams_API)[^request-ctx]      | ReadableStream/WritableStream classes (except constructors) <br> TransformStream (zero-argument constructor)                                                                                                                                                                                                                                        |
| [Web Crypto API](https://developer.mozilla.org/docs/Web/API/Web_Crypto_API)              | Cryptographically-secure random number generation[^request-ctx] <br> Digest (SHA family, MD5) <br> Sign and verify (HMAC (with SHA family, MD5), RSASSA-PKCS1-v1\_5, ECDSA) <br> Encrypt and decrypt (AES-GCM, AES-CBC) <br> Key derivation (PBKDF2) <br> Key generation (AES-GCM, HMAC) <br> Raw key import/export for all of the above algorithms |

[^request-ctx]: Some APIs are only available inside a *request context*. A request
    context is active during a `"fetch"` event callback, and, if you pass a Response promise to
    `FetchEvent.respondWith()`, any asynchronous tasks which run before the Response promise has
    settled. Any attempt to use such APIs during script startup will throw an exception.

    For example:

    {{<highlight javascript>}}
const promise = fetch("https://example.com/")       // ERROR

addEventListener("fetch", event => {
  event.respondWith(fetch("https://example.com/"))  // OK
})
{{</highlight>}}

    This code snippet **will throw** during script startup, and the `"fetch"` event
    listener will never be registered.

[^no-playground]: Some APIs are only available in production, and not in the *playground*.
    The playgrounds are the Workers instances which power cloudflareworkers.com and the
    Workers editor UI on dash.cloudflare.com. They do not currently provide Cloudflare features
    other than Workers.
