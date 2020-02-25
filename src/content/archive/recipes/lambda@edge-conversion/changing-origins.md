---
title: 'Changing Origins'
---

You can change traffic gradually from an old storage bucket to a new one with Workers.

## With Lambda@Edge:

```js
'use strict'

function getRandomInt(min, max) {
  /* Random number is inclusive of min and max*/
  return Math.floor(Math.random() * (max - min + 1)) + min
}

exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request
  const BLUE_TRAFFIC_PERCENTAGE = 80

  /**
   * This function demonstrates how to gradually transfer traffic from
   * one storage bucket to another in a controlled way.
   * We define a variable BLUE_TRAFFIC_PERCENTAGE which can take values from
   * 1 to 100. If the generated randomNumber less than or equal to BLUE_TRAFFIC_PERCENTAGE, traffic
   * is re-directed to blue-bucket. If not, the default bucket that we've configured
   * is used.
   */

  const randomNumber = getRandomInt(1, 100)

  if (randomNumber <= BLUE_TRAFFIC_PERCENTAGE) {
    const domainName = 'blue-bucket.sfo2.digitaloceanspaces.com'
    request.headers['host'] = [{ key: 'host', value: domainName }]
  }
  callback(null, request)
}
```

## With Workers:

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

async function handleRequest(request) {
  const BLUE_TRAFFIC_PERCENTAGE = 80
  const randomNumber = getRandomInt(1, 100)

  if (randomNumber <= BLUE_TRAFFIC_PERCENTAGE) {
    let url = new URL(request.url)
    url.host = 'blue-bucket.sfo2.digitaloceanspaces.com'
    return fetch(url, request)
  }

  return fetch(request)
}
```

You can also change origins for different regions based on request headers.

## With Lambda@Edge:

```js
'use strict'

exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request

  if (request.headers['cdn-viewer-country']) {
    const countryCode = request.headers['cdn-viewer-country'][0].value
    if (countryCode === 'UK' || countryCode === 'DE' || countryCode === 'IE') {
      const domainName = 'eu.example.com'
      request.headers['host'] = [{ key: 'host', value: domainName }]
    }
  }

  callback(null, request)
}
```

## With Workers:

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const countryCode = request.headers.get('cf-ipcountry')

  if (countryCode === 'US' || countryCode === 'DE' || countryCode === 'IE') {
    let url = new URL(request.url)
    url.host = 'eu.example.com'
    return fetch(url, request)
  }

  return fetch(request)
}
```
