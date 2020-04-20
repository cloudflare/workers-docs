---
title: 'Cache using fetch: cache HTML, TTL and Custom Keys'
hidden: true
---

### Caching HTML (or other dynamic - not cached by default) resources:

```javascript
// Force Cloudflare to cache an asset
fetch(event.request, { cf: { cacheEverything: true } })
```

Setting the cache level to Cache Everything will override the default "cacheability" of the asset. For TTL, Cloudflare will still rely on headers set by the origin.

### Custom Cache Keys

_This feature is available to enterprise users only._

A request's cache key is what determines if two requests are "the same" for caching purposes. If a request has the same cache key as some previous request, then we can serve the same cached response for both. For more about cache keys see [Using Custom Cache Keys](https://support.cloudflare.com/hc/en-us/articles/115004290387) support article.

```javascript
// Set cache key for this request to "some-string".
fetch(event.request, { cf: { cacheKey: 'some-string' } })
```

Normally, Cloudflare computes the cache key for a request based on the request's URL. Sometimes, though, you'd like different URLs to be treated as if they were the same for caching purposes. For example, say your web site content is hosted from both Amazon S3 and Google Cloud Storage - you have the same content in both places, and you use a Worker to randomly balance between the two. However, you don't want to end up caching two copies of your content. You could utilize custom cache keys to cache based on the original request URL rather than the subrequest URL:

```javascript
addEventListener('fetch', (event) => {
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

Remember, Workers operating on behalf of different zones cannot affect each other's cache. You can only override cache keys when making requests within your own zone (in the above example `event.request.url` was the key stored), or requests to hosts that are not on Cloudflare. When making a request to another Cloudflare zone (e.g. belonging to a different Cloudflare customer), that zone fully controls how its own content is cached within Cloudflare; you cannot override it.

### Override based on origin response code:

_This feature is available to enterprise users only._

```javascript
// Force response to be cached for 86400 seconds for 200 status codes, 1 second for 404,
// and do not cache 500 errors
fetch(request, {
  cf: { cacheTtlByStatus: { '200-299': 86400, 404: 1, '500-599': 0 } },
})
```

This option is a version of the `cacheTtl` feature which chooses a TTL based on the response's status code. If the response to this request has a status code that matches, Cloudflare will cache for the instructed time, and override cache directives sent by the origin.

TTL values:

- Positive TTL values indicate in seconds how long Cloudflare should cache the asset for
- `0` TTL will cause assets to get cached, but expire immediately (revalidate from origin every time)
- `-1`, or any negative value will instruct Cloudflare not to cache at all
