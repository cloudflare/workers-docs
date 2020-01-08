---
title: "Delivering Custom Responses"
---

## With VCL:
VCL does not allow you to define custom responses in the code itself. You will have to upload the response via your CDN provider, and reference it in the code block by creating a condition:

{{<highlight vcl>}}
  # Request Condition: block bots Prio: 10
  if ( client.geo.country_code == "UK" ) {
    # ResponseObject: no cats for you
    error 900 "CDN Internal";
  }
  #end condition
{{</highlight>}}

## With Workers:
Workers allow you to fully customize the responses that are sent to the client. You may find more examples of how to create responses that never hit your origin [here](/archive/recipes/return-403/).

Example of returning a blocked response based on country (with the response itself in the Worker!):
{{<highlight javascript>}}
// request.cf is only available in production and will be undefined in the playground.
if ((request.cf || {}).country == "UK") {
  return new Response("<html>No cats for you!</html>", {
    headers: { "Content-Type": "text/html" },
    status: 403,
    statusText: "Forbidden"
  });
}
{{</highlight>}}

### Actions based on URL attributes:

First, we'll create a [URL object](https://developer.mozilla.org/en-US/docs/Web/API/URL) to allow us to parse attributes more easily

{{<highlight javascript>}}
let url = new URL(request.url)
{{</highlight>}}

Once the URL has been created, you can parse out hostnames, paths and query string.
Blocking certain hosts:
{{<highlight javascript>}}
if (url.hostname == 'blocked.mywebsite.com')
{{</highlight>}}

Blocking based on a predefined blacklist of hosts:
{{<highlight javascript>}}
let forbidden = new Set([
  "nope.mywebsite.com",
  "nachosite.mywebsite.com",
  "bye.website.com"
]);

if (forbidden.has(url.hostname)) {
  // ...
}
{{</highlight>}}

Action based on file extension
{{<highlight javascript>}}
let forbiddenExt = ["doc", "xml"];
let forbiddenExtRegExp = new RegExp(`\\.(${forbiddenExt.join("|")})$`); // /\.(doc|xml)$/
if (forbiddenExtRegExp.test(url.pathname)) {
  // Do some action here
}
{{</highlight>}}

### Action based on method:

{{<highlight javascript>}}
if (request.method == 'POST')
{{</highlight>}}

### Action based on User Agent:

{{<highlight javascript>}}
let userAgent = request.headers.get('User-Agent') || ''
if (userAgent.includes('bot')) {
  // ...
}
{{</highlight>}}

### Action based on IP:

{{<highlight javascript>}}
if (request.headers.get('CF-Connecting-IP'))
{{</highlight>}}

### Action based on ASN:

{{<highlight javascript>}}
// request.cf is only available in production and will be undefined in the playground.
if ((request.cf || {}).asn == 64512)
{{</highlight>}}

