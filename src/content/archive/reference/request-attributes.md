---
title: 'Request Attributes'
---

Workers allows you to run custom logic based for any incoming request. In addition to the information available on the `Request` object, such as headers, Cloudflare provides additional attributes of the request using the `request.cf` object.

### Attributes available on `request.cf`:

- `tlsVersion`: the TLS version used on the connection to Cloudflare.
- `tlsCipher`: the cipher used on the connection to Cloudflare.
- `country`: the two letter country code on the request (this is the same value as the one provided by the `CF-IPCountry` header)
- `colo`: the three letter airport code of the colo the request hit.

### Attributes available through headers:

- Client IP: the client IP is available via the `CF-Connecting-IP` header.
