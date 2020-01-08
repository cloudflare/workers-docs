---
title: "Inspecting Visitor Location"
---

Workers can tell you about a visitor through a couple custom headers.

## Obtaining a visitor's country code:

### With VCL:
{{<highlight vcl>}}
set req.http.CDN-GeoIP-CountryCode = client.geo.country_code;
{{</highlight>}}


### With Workers:
{{<highlight javascript>}}
const countryCode = request.headers.get("cf-ipcountry")
{{</highlight>}}

## Obtaining a visitor's ip address:

### With Workers:
{{<highlight javascript>}}
const ip = request.headers.get("cf-connecting-ip")
{{</highlight>}}
