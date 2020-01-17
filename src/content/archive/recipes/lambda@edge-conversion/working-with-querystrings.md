---
title: "Working with Querystrings"
---

Just like Lambda@Edge, Workers allows for working with querystrings. Here's an example that redirects an unauthenticated user and adds the original url to the url as a querystring.

## With Lambda@Edge:
```js
'use strict';

function parseCookies(headers) {
  const parsedCookie = {};
  if (headers.cookie) {
    headers.cookie[0].value.split(';').forEach((cookie) => {
      if (cookie) {
        const parts = cookie.split('=');
        parsedCookie[parts[0].trim()] = parts[1].trim();
      }
    });
  }
  return parsedCookie;
}

exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;

  /* Check for session-id in request cookie in viewer-request event,
    * if session-id is absent, redirect the user to sign in page with original
    * request sent as redirect_url in query params.
    */

  /* Check for session-id in cookie. If present, then proceed with request */
  const parsedCookies = parseCookies(headers);
  if (parsedCookies && parsedCookies['session-id']) {
    callback(null, request);
  }

  /* URI encode the original request to be sent as redirect_url in query params */
  const encodedRedirectUrl = encodeURIComponent(`https://${headers.host[0].value}${request.uri}?${request.querystring}`);
  const response = {
    status: '302',
    statusDescription: 'Found',
    headers: {
      location: [{
        key: 'Location',
        value: `http://www.example.com/signin?redirect_url=${encodedRedirectUrl}`,
      }],
    },
  };
  callback(null, response);
};
```

## With Workers:
```js
addEventListener('fetch', event => {
  event.respondWith(handle(event.request))
})

function parseCookies(headers) {
  const parsedCookie = {}
  if (headers.has("Cookie")) {
    for (let cookie of headers.get("Cookie").split(";")) {
      if (cookie) {
        const [ key, value ] = cookie.split("=")
        parsedCookie[key.trim()] = value.trim()
      }
    }
  }
  return parsedCookie
}

async function handle(request) {
  // Check for session-id in cookie. If present, then proceed with request

  const parsedCookies = parseCookies(request.headers);
  if (parsedCookies && parsedCookies['session-id']) {
    return fetch(request)
  }
  
  // URI encode the original request to be sent as redirect_url in query params

  const encodedRedirectUrl = encodeURIComponent(request.url);

  // This will cause an infinite loop in the playground, but will work in production

  return Response.redirect(`https://www.example.com/signin?redirect_url=${encodedRedirectUrl}`, 302)
}
```