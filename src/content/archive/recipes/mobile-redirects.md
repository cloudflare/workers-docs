---
title: 'Mobile Redirect by Device Type'
---

Determine device type and redirect to a mobile version of your site. This is based on the "Cf-Device-Type" header outlined [here](https://support.cloudflare.com/hc/en-us/articles/229373388-Cache-Content-by-Device-Type-Mobile-Tablet-Desktop-).
This header can contain one of three options: `mobile`, `tablet`, `desktop`.

<sub>Note: This "Cf-Device-Type" header will not be present in the Preview pane. Please talk with your account manager or Solutions Engineer for more information.</sub>

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const MOBILE_REDIRECT_HOSTNAMES = {
  'a.example.com': 'a.m.example.com',
  'www.example.com': 'm.example.com',
  'example.com': 'm.example.com',
}

async function handleRequest(request) {
  let requestURL = new URL(request.url)
  let hostname = requestURL.hostname
  let device = request.headers.get('CF-Device-Type')
  console.log(device)

  /**
   *  Requires Enterprise "CF-Device-Type Header" zone setting or
   *  Page Rule with "Cache By Device Type" setting applied.
   */
  if (device === 'mobile') {
    const mobileSubdomain = MOBILE_REDIRECT_HOSTNAMES[hostname]
    if (mobileSubdomain) {
      // Construct the new location based on the original request URL parameters
      requestURL.hostname = mobileSubdomain
      return Response.redirect(requestURL, 302)
    }
  }
  return await fetch(request)
}
```
