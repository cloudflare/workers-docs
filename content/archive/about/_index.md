---
title: About
alwaysopen: true
weight: 10
---

Cloudflare Workers lets you run JavaScript in Cloudflare's hundreds of data centers around the world.
Using a Worker, you can modify your site's HTTP requests and responses, make parallel requests, or generate responses from the edge.

* Load balance between multiple origins to improve speed or reliability.
* Render HTML templates while fetching dynamic content from your origin.
* Dynamically respond to requests without needing to connect to an origin server at all.
* Generate parallel requests to different services and combine the responses.
* Create custom security rules and filters to block unwanted visitors and bots.
* Perform data sanitization and validation before sending a request to your origin.
* Use custom logic to decide which requests are cacheable and improve cache hit rate.
* Deploy fast fixes to your site in seconds without having to update your origin server.

Most importantly, all of these actions happen inside Cloudflare’s lightning-fast edge. Your code will be deployed to
hundreds of data centers around the world returning responses to your users faster than your origin ever could.
You get all the speed and security of the world’s most peered CDN with all the power of JavaScript.

![Network Map](/archive/static/network-map.png)

## What Worker Code Looks Like

A Worker can return a static response:

{{< highlight javascript >}}
addEventListener('fetch', event => {
  event.respondWith(new Response('hello world'))
})
{{< / highlight >}}

It can also make a request to another location, and return that. In this case we’re
adding '/index.html' to the end of the URL:

{{< highlight javascript >}}
addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request.url + "/index.html", event.request)
  )
})
{{< / highlight >}}

Being JavaScript, it’s possible to leverage these capabilities in almost any way imaginable.
You could, for example, make decisions about where to route the request based on its contents:

{{< highlight javascript >}}
addEventListener('fetch', event => {
  let url = new URL(event.request.url)

  if (event.request.headers.has('X-Use-Dev'))
    url.host = "dev." + url.host

  url.protocol = 'https:'

  event.respondWith(
    fetch(url, event.request)
  )
})
{{< / highlight >}}
