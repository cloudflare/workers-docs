---
title: "Overriding Response Headers"
---

This example shows how you can override response headers in Workers.

## With Lambda@Edge:
{{<highlight javascript>}}
'use strict';

exports.handler = (event, context, callback) => {
   const response = event.Records[0].cf.response;
   const headers = response.headers;

   const headerNameSrc = 'Orig-Header';
   const headerNameDst = 'Last-Modified';

   if (headers[headerNameSrc.toLowerCase()]) {
      headers[headerNameDst.toLowerCase()] = [
         headers[headerNameSrc.toLowerCase()][0],
      ];
      console.log(`Response header "${headerNameDst}" was set to "${headers[headerNameDst.toLowerCase()][0].value}"`);
   }

   callback(null, response);
};
{{</highlight>}}

## With Workers:
{{<highlight javascript>}}
addEventListener('fetch', event => {
  event.respondWith(handle(event.request))
})

async function handle(request) {
  let response = await fetch(request)
  response = new Response(response.body, response)

  const headerNameSrc = 'Orig-Header'
  const headerNameDst = 'Last-Modified'

  if (response.headers.has(headerNameSrc)) {
    response.headers.set(headerNameDst, response.headers.get(headerNameSrc))
    console.log(`Response header "${headerNameDst}" was set to "${response.headers.get(headerNameDst)}"`)
  }

  return response
}
{{</highlight>}}