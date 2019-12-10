---
title: Using the Cache
weight: 3
---

Workers provide a way to customize cache behavior using Cloudflare's classic CDN as well as a private cache space. To learn about the benefits of caching see our Learning Center's article on [What is Caching?](https://www.cloudflare.com/learning/cdn/what-is-caching/)

## Interacting with the Cloudflare Cache

Conceptually, there are two ways to interact with Cloudflare's Cache using a Worker:

- Store responses on Cloudflare's classic CDN, which can be done through calling `fetch()` in a Workers script. Custom cache behavior via a Worker include:
  - Setting Cloudflare cache rules (i.e. operating on the cf object)
  - Setting custom cache headers (i.e. Cache-control). This can impact browser as well as Cloudflare Cache behavior.
- Store responses on a zone scoped namespace separate from Cloudflare's traditional cache using the Cache API from a Workers script. One can control cache behavior of even assets not proxied on Cloudflare.

We won't discuss in this article, but other means to control Cloudflare's cache include: Page rules and Cloudflare cache settings. I highly recommend the article [How to Control Cloudflare's cache](https://support.cloudflare.com/hc/en-us/articles/202775670) if you wish to avoid writing Javascript with still some granularity of control.

### [Cache API](/reference/apis/cache)

The Cache API creates a private cache key namespace for each zone using Cloudflare's Global Network. Cache objects are stored in the local datacenter handling the request and are not replicated to other datacenters.

**How is the Cache API different from `fetch()`?** `fetch()` requests a URL and automatically applies caching rules based on your Cloudflare settings. It does not allow you to modify objects before they reach cache, or inspect if an object is in cache before making a request.

The Cache API's `caches.default` Cache object allows you to:

- Fetch a response for a URL if (and only if) it is cached using `caches.default.match(..)`.

- Explicitly store a response in the cache using `caches.default.put(..)` and explicitly delete `caches.default.delete(..)`.

**What are the usage limits on the cache API?**

- 50 total `put()`, `match()`, or `delete()` calls per-request, using the same quota as `fetch()`

- 5 GBs total `put()` per-request

- For Free, Pro, Business:

  - up to 512MB for each `put()` with a valid `Content-Length` header

  - up to 512MB for a `put()` with `Transfer-Encoding: chunked`. Note that this blocks subsequent `put()`s until the transfer completes.

- For Enterprise:

  - up to 5GBs for each `put()` with a valid `Content-Length` header

  - up to 5GBs for a `put()` with `Transfer-Encoding: chunked`. Note that this blocks subsequent `put()`s until the transfer completes.

  Using the Cache API will _not_ set a `Cf-Cache-Status` header.

### Cloudflare's CDN

Cloudflare's traditional CDN will work by default on static assets even without Workers. The namespace used by the Cache API is stored separate from Cloudflare's CDN though both exist on Cloudflare's Global Network.

In the context of Workers a [`fetch`](/reference/apis/fetch) provided by the runtime communicates with the traditional Cloudflare cache. First, `fetch` checks to see if the URL matches a different zone. If it does, it reads through that zone's cache. Otherwise, it reads through its own zone's cache, even if the URL is for a non-Cloudflare site. Cache settings on `fetch` automatically apply caching rules based on your Cloudflare settings. `fetch` does not allow you to _modify or inspect objects_ before they reach the cache, but does allow you to modify _how it will cache_.

When a response fills the cache, the response header contains `CF-Cache-Status: HIT`. You can tell an object is attempting to cache if one sees the `CF-Cache-Status` at all.

Phew.. that sounds like a lot, but some examples should help make sense. Here are ways to customize Cloudflare CDN's cache behavior on a given request:

#### Caching HTML (or other non-whitelisted file extensions):

```javascript
// Force Cloudflare to cache an asset
fetch(event.request, { cf: { cacheEverything: true } })
```

Setting the cache level to Cache Everything will override the default "cacheability" of the asset. For TTL, Cloudflare will still rely on headers set by the origin.

#### Overriding TTL:

```javascript
// Force response to be cached for 300 seconds.
fetch(event.request, { cf: { cacheTtl: 300 } })
```

This option forces Cloudflare to cache the response for this request, regardless of what headers are seen on the response. This is equivalent to setting two page rules: ["Edge Cache TTL"](https://support.cloudflare.com/hc/en-us/articles/200168376-What-does-edge-cache-expire-TTL-mean-) and ["Cache Level" (to "Cache Everything")](https://support.cloudflare.com/hc/en-us/articles/200172266-What-do-the-custom-caching-options-mean-in-Page-Rules-).

#### Override based on origin response code:

_This feature is available to enterprise users only._

```javascript
// Force response to be cached for 86400 seconds for 200 status codes, 1 second for 404,
// and do not cache 500 errors
fetch(request, { cf: { cacheTtlByStatus: { '200-299': 86400, 404: 1, '500-599': 0 } } })
```

This option is a version of the `cacheTtl` feature which chooses a TTL based on the response's status code. If the response to this request has a status code that matches, Cloudflare will cache for the instructed time, and override cache directives sent by the origin.

TTL values:

- Positive TTL values indicate in seconds how long Cloudflare should cache the asset for
- `0` TTL will cause assets to get cached, but expire immediately (revalidate from origin every time)
- `-1`, or any negative value will instruct Cloudflare not to cache at all

#### Custom Cache Keys

_This feature is available to enterprise users only._

A request's cache key is what determines if two requests are "the same" for caching purposes. If a request has the same cache key as some previous request, then we can serve the same cached response for both. For more about cache keys see [Using Custom Cache Keys](https://support.cloudflare.com/hc/en-us/articles/115004290387) support article.

```javascript
// Set cache key for this request to "some-string".
fetch(event.request, { cf: { cacheKey: 'some-string' } })
```

Normally, Cloudflare computes the cache key for a request based on the request's URL. Sometimes, though, you'd like different URLs to be treated as if they were the same for caching purposes. For example, say your web site content is hosted from both Amazon S3 and Google Cloud Storage - you have the same content in both places, and you use a Worker to randomly balance between the two. However, you don't want to end up caching two copies of your content. You could utilize custom cache keys to cache based on the original request URL rather than the subrequest URL:

```javascript
addEventListener('fetch', event => {
  let url = new URL(event.request.url)
  if (Math.random() < 0.5) {
    url.hostname = 'example.s3.amazonaws.com'
  } else {
    url.hostname = 'example.storage.googleapis.com'
  }

  let request = new Request(url, event.request)
  event.respondWith(
    fetch(request, {
      cf: { cacheKey: event.request.url },
    }),
  )
})
```

Remember, Workers operating on behalf of different zones cannot affect each other's cache. You can only override cache keys when making requests within your own zone (in the above example `event.request.url` was the key stored), or requests to hosts that are not on Cloudflare. When making a request to another Cloudflare zone (e.g. belonging to a different Cloudflare customer), that zone fully controls how its own content is cached within Cloudflare; you cannot override it.

### Overriding Browser Cache (Cache-Control headers)

Browsers determine what to cache through the response headers sent from Cloudflare.

```javascript
async function fetchAndApply(request) {
  let response = await fetch(request)

  // Make response headers mutable
  response = new Response(response.body, response)

  response.headers.set('Cache-Control', 'max-age=1500')

  return response
}
```
