---
title: Workers Lifecycle
---

When working with the [`fetch` event](/reference/apis/fetch-event) inside the Workers runtime, it helps to have a good idea of its lifecycle of a request on Cloudflare's edge.

First an HTTP request is triggered by a client and it comes to Cloudflare's edge. Security settings like IP Firewall, WAF and bot protection decide whether to block, challenge or pass the request. Next wor

client => CF edge => CF security rules => CF worker => CF cache => ??? => origin

The [FetchEvent](/reference/apis/fetch-event) lifecycle starts when Cloudflare's edge network receives a request whose URL matches both a zone and a route for a Workers function; this causes the Workers runtime to trigger a `fetch` event and creates a FetchEvent Object to pass to the first event handler in the Workers function registered for `'fetch'`. Then the event handler in the Worker script controls what happens next and how to respond.

