---
title: Controlling Cloudflare Features
---

You can use a Worker to control how other Cloudflare features affect the request. Your Worker runs after security features, but before everything else. Therefore, a Worker cannot affect the operation of security features (since they already finished), but it can affect other features, like [Polish](https://blog.cloudflare.com/introducing-polish-automatic-image-optimizati/) or [ScrapeShield](https://blog.cloudflare.com/introducing-scrapeshield-discover-defend-dete/), or how Cloudflare caches the response.

Cloudflare features are controlled through the `cf` property of a request. Setting `cf` is kind of like setting `headers`. You can add `cf` to a request object by making a copy:

```javascript
// Disable ScrapeShield for this request.
let request = new Request(event.request, { cf: { scrapeShield: false } })
```

Alternatively, you can set `cf` directly on `fetch()`:

```javascript
// Disable ScrapeShield for this request.
fetch(event.request, { cf: { scrapeShield: false } })
```

Note: Invalid or incorrectly-named settings in the `cf` object will be silently ignored. Be careful to test that you are getting the behavior you want. Currently, settings in the `cf` object cannot be tested in the playground.

## Polish

```javascript
// Sets Polish mode to "lossless" mode for this request.
fetch(event.request, { cf: { polish: 'lossless' } })
```

Sets [Polish](https://blog.cloudflare.com/introducing-polish-automatic-image-optimizati/) mode. The possible values are "lossy", "lossless", or "off".

## AutoMinify

```javascript
// Minify JavaScript and CSS, but not HTML.
fetch(event.request, { cf: { minify: { javascript: true, css: true, html: false } } })
```

Enables or disables [AutoMinify](https://www.cloudflare.com/website-optimization/) for various file types. The value is an object containing boolean fields for `javascript`, `css`, and `html`.

## Mirage

```javascript
// Disable Mirage for this request.
fetch(event.request, { cf: { mirage: false } })
```

Disables [Mirage](https://www.cloudflare.com/website-optimization/mirage/) for this request. When you specify this option, the value should always be `false`.

## ScrapeShield

```javascript
// Disable ScrapeShield for this request.
fetch(event.request, { cf: { scrapeShield: false } })
```

Disables [ScrapeShield](https://blog.cloudflare.com/introducing-scrapeshield-discover-defend-dete/) for this request. When you specify this option, the value should always be `false`.

## Apps

```javascript
// Disable apps for this request.
fetch(event.request, { cf: { apps: false } })
```

Disables [Cloudflare Apps](https://www.cloudflare.com/apps/) for this request. When you specify this option, the value should always be `false`.

## Resolve Override

```javascript
// Sends the request to `us-east.example.com` instead of the host
// specified in the request URL.
fetch(event.request, { cf: { resolveOverride: 'us-east.example.com' } })
```

Redirects the request to an alternate origin server. You can use this, for example, to implement load balancing across several origins.

You can achieve a similar effect by simply changing the request URL. For example:

```javascript
let url = new URL(event.request.url)
url.hostname = 'us-east.example.com'
fetch(url, event.request)
```

However, there is an important difference: If you use `resolveOverride` to change the origin, then the request will be sent with a `Host` header matching the original URL. Often, your origin servers will all expect the `Host` header to specify your web site's main hostname, not the hostname of the specific replica. This is where `resolveOverride` is needed.

For security reasons, `resolveOverride` is only honored when both the URL hostname and the `resolveOverride` hostname are orange-cloud hosts within your own zone. Otherwise, the setting is ignored. Note that CNAME hosts are allowed. So, if you want to resolve to a hostname that is under a different domain, first declare a CNAME record within your own zone's DNS mapping to the external hostname, then set `resolveOverride` to point to that CNAME record.

## Custom Cache Keys

*This feature is available to enterprise users only.*

```javascript
// Set cache key for this request to "some-string".
fetch(event.request, { cf: { cacheKey: 'some-string' } })
```

A request's cache key is what determines if two requests are "the same" for caching purposes. If a request has the same cache key as some previous request, then we can serve the same cached response for both.

Normally, Cloudflare computes the cache key for a request based on the request's URL. Sometimes, though, you'd like different URLs to be treated as if they were the same for caching purposes. For example, say your web site content is hosted from both Amazon S3 and Google Cloud Storage -- you have the same content in both places, and you use a Worker to randomly balance between the two. However, you don't want to end up caching two copies of your content! You could utilize custom cache keys to cache based on the original request URL rather than the subrequest URL:

```javascript
addEventListener('fetch', event => {
  let url = new URL(event.request.url);
  if (Math.random() < 0.5) {
    url.hostname = 'example.s3.amazonaws.com'
  } else {
    url.hostname = 'example.storage.googleapis.com'
  }

  let request = new Request(url, event.request)
  event.respondWith(fetch(request, {
    cf: { cacheKey: event.request.url }
  }))
})
```

Notes:

* Each zone has its own private cache key namespace. That means that two Workers operating within the same zone (even on different hostnames) may share cache using custom cache keys, but Workers operating on behalf of different zones cannot affect each other's cache.
* You can only override cache keys when making requests within your own zone, or requests to hosts that are not on Cloudflare. When making a request to another Cloudflare zone (e.g. belonging to a different Cloudflare customer), that zone fully controls how its own content is cached within Cloudflare; you cannot override it.
* URLs that are fetch()ed with a custom cache key *cannot be purged* using a URL purge. However you can use the Cache API and [set a Cache Tag on the response object](/reference/cache-api/) if you need to purge the URL. 

## Override Cache TTL

```javascript
// Force response to be cached for 300 seconds.
fetch(event.request, { cf: { cacheTtl: 300 } })
```

This option forces Cloudflare to cache the response for this request, regardless of what headers are seen on the response. This is equivalent to setting two page rules: ["Edge Cache TTL"](https://support.cloudflare.com/hc/en-us/articles/200168376-What-does-edge-cache-expire-TTL-mean-) and ["Cache Level" (to "Cache Everything")](https://support.cloudflare.com/hc/en-us/articles/200172266-What-do-the-custom-caching-options-mean-in-Page-Rules-).

Negative values for `cacheTtl` have no effect.

## Override based on origin response code

*This feature is available to enterprise users only.*

```javascript
// Force response to be cached for 86400 seconds for 200 status codes, 1 second for 404,
// and do not cache 500 errors
fetch(request, { cf: { cacheTtlByStatus: { "200-299": 86400, 404: 1, "500-599": 0 } } })
```

This option is a version of the `cacheTtl` feature which chooses a TTL based on the response's status code. If the response to this request has a status code that matches, Cloudflare will cache for the instructed time, and override cache instructives sent by the origin. 

This gives you control over how long assets will stay in the Cloudflare cache based on the response code. For example, you could cache successful fetches for longer, but continue to fetch assets from the origin in the event of failures. You may also use this feature to cache redirects.

You may still choose to have different rules based on request settings by checking the URI or headers.

TTL values:

 * Positive TTL values indicate in seconds how long Cloudflare should cache the asset for
 * `0` TTL will cause assets to get cached, but expire immediately (revalidate from origin every time)
 * `-1`, or any negative value will instruct Cloudflare not to cache at all (note: `-1` is NOT supported by `cacheTtl`)

 Please note, that Cloudflare will still adhere to [standard cache levels](https://support.cloudflare.com/hc/en-us/articles/202775670-How-Do-I-Tell-Cloudflare-What-to-Cache-), so by default this will override cache behavior for static files. If you wish to cache non-static assets, you will need to set a [Cache Level of Cache Everything](https://support.cloudflare.com/hc/en-us/articles/200172266-What-do-the-custom-caching-options-mean-in-Page-Rules-) using a Page Rule.
