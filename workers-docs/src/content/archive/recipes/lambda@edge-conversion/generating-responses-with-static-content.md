---
title: "Generating Responses with Static Content"
---

Workers allow you to generate responses with static content and gzip your response without any external libraries.

## With Lambda@Edge:
```js
'use strict';

const zlib = require('zlib');

let content = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Simple Lambda@Edge Static Content Response</title>
  </head>
  <body>
    <p>Hello from Lambda@Edge!</p>
  </body>
</html>
`;

exports.handler = (event, context, callback) => {

  /*
   * Generate HTTP OK response using 200 status code with a gzip compressed content HTML body.
   */
  
  const buffer = zlib.gzipSync(content); 
  const base64EncodedBody = buffer.toString('base64');
  
  var response = {
    headers: {
      'content-type': [{key:'Content-Type', value: 'text/html; charset=utf-8'}],
      'content-encoding' : [{key:'Content-Encoding', value: 'gzip'}]
    },
    body: base64EncodedBody,
    bodyEncoding: 'base64',
    status: '200',
    statusDescription: "OK"
  }

  callback(null, response);
};
```

## With Workers:
```js
addEventListener('fetch', event => {
  event.respondWith(handle(event.request))
})

let content = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Simple Workers Static Content Response</title>
  </head>
  <body>
    <p>Hello from Workers!</p>
  </body>
</html>
`;

async function handle(request) {

  return new Response(content, {
    status: 200,
    statusText: "OK",
    headers: {
      'cache-control': "max-age=100",
      'content-type': "text/html; charset=utf-8",
      'content-encoding': "gzip"
    }
  })
}
```