---
title: "Inspecting Visitor Location"
---

Workers can tell you about a visitor through a couple custom headers.

## Obtaining a visitor's country code:

### With VCL:
```vcl
set req.http.CDN-GeoIP-CountryCode = client.geo.country_code;
```

### With Workers:
```js
const countryCode = request.headers.get("cf-ipcountry")
```

## Obtaining a visitor's ip address:

### With Workers:
```js
const ip = request.headers.get("cf-connecting-ip")
```
