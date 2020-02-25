---
title: 'Conditionally Changing a URL'
---

To conditionally change a URL based on the domain, your Worker code will look something like this:

## With VCL:

```vcl
if (req.http.host ~ "^restricted") {
  set req.url = "/sanitized" req.url;
}
```

## With Workers:

```js
let url = new URL(request.url)
if (url.hostname.startsWith('restricted')) {
  url.pathname = '/sanitized' + url.pathname
}
```
