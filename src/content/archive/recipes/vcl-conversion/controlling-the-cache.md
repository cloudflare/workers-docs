---
title: 'Controlling the Cache'
---

VCL is often used to define the caching behavior for a CDN. VCL is a very explicit language, so when doing a VCL to Workers conversion, there are many behaviors you will get by default, and don't have to worry about implementing with Workers.

### With Workers:

By default, Workers will follow the Cloudflare caching behavior. You can read more [here about how Cloudflare decides what to cache](https://support.cloudflare.com/hc/en-us/articles/202775670-How-Do-I-Tell-Cloudflare-What-to-Cache-).

- On request, Cloudflare will determine whether something is deemed cacheable.
- By default, Cloudflare will cache static content (based on a whitelist of file extensions).
- Cacheability can be overriden with certain Page Rules or settings.
- Only responses to GET and HEAD methods will get cached by default.
- After Cloudflare has decided to cache something, its expiration time will be determined based on the Cache-Control header sent by the origin.
- How long something is cached for can be overriden with Page Rules, or using the `cf` attribute in a request.
- Each zone has its own private cache key namespace. That means that two Workers operating within the same zone (even on different hostnames) may share cache using custom cache keys, but Workers operating on behalf of different zones cannot affect each other's cache.
- You can only override cache keys when making requests within your own zone, or requests to hosts that are not on Cloudflare. When making a request to another Cloudflare zone (e.g. belonging to a different Cloudflare customer), that zone fully controls how its own content is cached within Cloudflare; you cannot override it.
- To check whether an asset is being cached on Cloudflare, you may inspect the `Cf-Cache-Status` header. Note that this header will not be available from the Preview UI, but will be present in requests hitting the Worker.

### With VCL:

You will find some of the following snippets in your VCL. Although you can be explicit, Cloudflare will define these settings for you by default:

```vcl
    if (req.request != "HEAD" && req.request != "GET") {
```

```vcl
  if ((beresp.status == 500 || beresp.status == 503) && req.restarts < 1 && (req.request == "GET" || req.request == "HEAD")) {
    restart;
  }
  if(req.restarts > 0 ) {
    set beresp.http.Restarts = req.restarts;
  }
  if (beresp.http.Set-Cookie) {
    set req.http.Cachetype = "SETCOOKIE";
    return (pass);
  }
  if (beresp.http.Cache-Control ~ "private") {
    set req.http.Cachetype = "PRIVATE";
    return (pass);
  }

```

### Caching HTML (or other non-whitelisted file extensions):

```javascript
// Force Cloudflare to cache an asset
fetch(event.request, { cf: { cacheEverything: true } })
```

Setting the cache level to Cache Everything will override the default "cacheability" of the asset. For TTL, Cloudflare will still rely on headers set by the origin.

### Overriding TTL:

```javascript
// Force response to be cached for 300 seconds.
fetch(event.request, { cf: { cacheTtl: 300 } })
```

This option forces Cloudflare to cache the response for this request, regardless of what headers are seen on the response. This is equivalent to setting two page rules: ["Edge Cache TTL"](https://support.cloudflare.com/hc/en-us/articles/200168376-What-does-edge-cache-expire-TTL-mean-) and ["Cache Level" (to "Cache Everything")](https://support.cloudflare.com/hc/en-us/articles/200172266-What-do-the-custom-caching-options-mean-in-Page-Rules-).

### Overriding Browser TTL (or setting client facing Cache-Control headers:

```javascript
async function fetchAndApply(request) {
  let response = await fetch(request)

  // Make response headers mutable
  response = new Response(response.body, response)

  response.headers.set('Cache-Control', 'max-age=1500')

  return response
}
```

### Override based on origin response code:

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

### Custom Cache Keys

_This feature is available to enterprise users only._

```javascript
// Set cache key for this request to "some-string".
fetch(event.request, { cf: { cacheKey: 'some-string' } })
```

A request's cache key is what determines if two requests are "the same" for caching purposes. If a request has the same cache key as some previous request, then we can serve the same cached response for both.

Normally, Cloudflare computes the cache key for a request based on the request's URL. Sometimes, though, you'd like different URLs to be treated as if they were the same for caching purposes. For example, say your web site content is hosted from both Amazon S3 and Google Cloud Storage -- you have the same content in both places, and you use a Worker to randomly balance between the two. However, you don't want to end up caching two copies of your content! You could utilize custom cache keys to cache based on the original request URL rather than the subrequest URL:

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
    })
  )
})
```

### Setting surrogate keys (Cache-Tags)

_This feature is available to enterprise users only._

Cache-Tags (known to VCL users as surrogate keys) allow a website owner to add tags to items cached at Cloudflare’s edge. The purpose is for a Cloudflare Enterprise customer to be able to purge cached content with the specified cache-tags.

You can set Cache-Tags by adding the Cache-Tag response header, and using the [Cache API](/archive/reference/cache-api/) to put the response (with the header) back in the cache.

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
