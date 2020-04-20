---
title: Using the Cache
weight: 3
---

Workers provide a way to customize cache behavior using Cloudflare's CDN for a zone’s private cache space. To learn about the benefits of caching see our Learning Center's article on [What is Caching?](https://www.cloudflare.com/learning/cdn/what-is-caching/)

## Interacting with the Cloudflare Cache

Cache is globally distributed and namespaced by zone of the incoming request, meaning a Worker script can not access or set a cache resource on an orange clouded zone’s namespace that differs from the zone of the incoming request.

Conceptually, there are two ways to interact with Cloudflare's Cache using a Worker:

- Call to `fetch()` in a Workers script. Requests proxied through Cloudflare are cached even without Workers according to a default or zone’s configured behavior (e.g. static assets like files ending in .jpg are cached by default). Through Workers this behavior can further be customized through:
  - Setting Cloudflare cache rules (i.e. operating on the cf object of a [request](TODO: linke )
  - Setting custom cache headers (i.e. Cache-control). This can impact browsers as well as Cloudflare Cache behavior.
- Store responses using the Cache API from a Workers script. You can control cache behavior of even assets not proxied on Cloudflare and granular control of the cache that would otherwise rely on headers from an origin.

We won't discuss in this article, but other means to control Cloudflare's cache include: Page rules and Cloudflare cache settings. I highly recommend the article [How to Control Cloudflare's cache](https://support.cloudflare.com/hc/en-us/articles/202775670) if you wish to avoid writing Javascript with still some granularity of control.

**What should I use: the Cache API or fetch for caching objects on Cloudflare? **
For requests where Workers are behaving as middleware (i.e. they are sending a subrequest via `fetch`) it is recommended to use fetch. This is because pre existing settings are in place that optimize caching while preventing unintended dynamic caching. For projects where there is no backend (i.e. the entire project is on Workers as in [Workers Sites](/sites)) the Cache API is the only option for caching.

### `fetch`

In the context of Workers a [`fetch`](/reference/apis/fetch) provided by the runtime communicates with the Cloudflare cache. First, `fetch` checks to see if the URL matches a different zone. If it does, it reads through that zone's cache. Otherwise, it reads through its own zone's cache, even if the URL is for a non-Cloudflare site. Cache settings on `fetch` automatically apply caching rules based on your Cloudflare settings. `fetch` does not allow you to _modify or inspect objects_ before they reach the cache, but does allow you to modify _how it will cache_.

When a response fills the cache, the response header contains `CF-Cache-Status: HIT`. You can tell an object is attempting to cache if one sees the `CF-Cache-Status` at all.

This [template](/templates/pages/cache_ttl) shows ways to customize Cloudflare cache behavior on a given request using fetch.

### [Cache API](/reference/apis/cache)

The Cache API creates a private cache key namespace for each zone on Cloudflare’s CDN. Cache objects are stored in the local datacenter handling the request and are not replicated to other datacenters.

When to use Cache API:

- Attempts to read from cache without calling fetch. (i.e. send me the response to slow.com/resource if and only if it’s already a HIT on cache is cached using `caches.default.match(..)`.
- Explicitly store a response in the cache using `caches.default.put(..)` and explicitly delete `caches.default.delete(..)`. For example, the zone. https://fonts.googleapis.com/css is not gray clouded since it’s not on Cloudflare, so we could store https://fonts.googleapis.com/css as cache key on our zone’s namespace.

This [template](/templates/pages/cache_api) shows ways to use the cache API. For limits of the cache API see [limits](/about/limits).
