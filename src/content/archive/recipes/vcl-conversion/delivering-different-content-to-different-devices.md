---
title: 'Delivering Different Content to Different Devices'
---

Just like with VCL, you can read the User Agent of your visitor and alter the request to match their device.

## With VCL:

```vcl
if (req.http.User-Agent ~ "(?i)ip(hone|od)") {
  set req.url = "/mobile" req.url;
} elsif (req.http.User-Agent ~ "(?i)ipad") {
  set req.url = "/tablet" req.url;
}
```

## With Workers:

```js
async function fetchAndApply(request) {
  let uaSuffix = ''

  const ua = request.headers.get('user-agent')
  if (ua.match(/ip(hone|od)/i) {
    uaSuffix = '/mobile'
  } else if (ua.match(/ipad/i)) {
    uaSuffix = '/tablet'
  }

  return fetch(request.url + uaSuffix, request)
}
```
