---
title: "Route Pattern Matching"
weight: 40
---

Requests are routed through Workers when their URL matches a route pattern
assigned to that Worker. Route patterns are created either from inside the
Cloudflare Workers editor, or by using the Cloudflare API.

### Matching Behavior

Route patterns look like this:

```
https://*.example.com/images/*
```

This pattern would match all HTTPS requests destined for a subhost of
example.com and whose paths are prefixed by `/images/`.

While they look similar to Page Rules, route patterns currently differ in the
following ways:

- Route patterns may not contain infix wildcards or query parameters, e.g.
  neither `example.com/*.jpg` nor `example.com/?foo=*` are valid route patterns.

- When more than one route pattern could match a request URL, the most specific
  route pattern wins. For example, the pattern `www.example.com/*` would take
  precedence over `*.example.com/*` when matching a request for
  `https://www.example.com/`.

- Route pattern matching considers the entire request URL, including the query
  parameter string. Since route patterns may not contain query parameters, the
  only way to have a route pattern match URLs with query parameters is to
  terminate it with a wildcard, `*`.

Route patterns always participate in matching, even if they have no Worker
script associated with them. A route pattern with no associated Worker script
simply means, "Do not run a Worker on this route." For example, consider this
pair of route patterns, one with a Worker script and one without:

```
https://*.example.com/images/cat.png -> <no script>
https://*.example.com/images/*       -> worker-script
```

Like the example above, all HTTPS requests destined for a subhost of example.com
and whose paths are prefixed by `/images/` would be routed to `worker-script`,
*except* for `/images/cat.png`, which would bypass Workers completely. HTTPS
requests with a path of `/images/cat.png?foo=bar` would be routed to
`worker-script`, due to the presence of the query string.

### Validity

Here is the full set of rules governing route pattern validity:

- **Route patterns must include your zone**

    If your zone is `example.com`, then the simplest possible route pattern you
    can have is `example.com`, which would match `http://example.com/` and
    `https://example.com/`, and *nothing else*.

    As with a URL, there is an implied path of `/` if you do not specify one.

- **Route patterns may not contain any query parameters**

    For example, `https://example.com/?anything` is not a valid route pattern.

- **Route patterns may optionally begin with http:// or https://**

    If you omit a scheme in your route pattern, it will match both http:// and
    https:// URLs. If you include http:// or https://, it will only match HTTP
    or HTTPS requests, respectively.

    - `https://*.example.com/` matches `https://www.example.com/` but *not*
    `http://www.example.com/`

    - `*.example.com/` matches both `https://www.example.com/` *and*
    `http://www.example.com/`.

- **Hostnames may optionally begin with `*`**

    If a route pattern hostname begins with `*`, then it matches the host *and* all
subhosts.

    If a route pattern hostname begins with `*.`, then it matches *only* all
subhosts.

    - `*example.com/` matches `https://example.com/` *and* `https://www.example.com/`

    - `*.example.com/` matches `https://www.example.com/` but *not*
    `https://example.com/`

- **Paths may optionally end with `*`**

    If a route pattern path ends with `*`, then it matches all suffixes of that
    path.

    - `https://example.com/path*` matches `https://example.com/path` *and*
    `https://example.com/path2` *and* `https://example.com/path/readme.txt`

    - `https://example.com/path/*` matches `https://example.com/path/readme.txt`
    but *not* `https://example.com/path2`.
