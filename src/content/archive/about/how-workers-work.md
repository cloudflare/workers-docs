---
title: 'How Workers Work'
---

Cloudflare Workers is modeled on the [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
available in modern web browsers, and use the same API whenever possible.

The Service Worker API allows you to intercept any request which is made to your site.
Once your JavaScript is handling the request, you may elect to make any number of
subrequests to your site or others, and finally return any response you would like to
your visitor.

Unlike standard Service Workers, Cloudflare Workers runs on Cloudflare's servers, _not_
in the user's browser. That means you can trust that your code will run in a trusted
environment where it cannot be bypassed by malicious clients. It also means that the
user does _not_ need to be using a modern browser that supports Service Workers --
you can even intercept requests from API clients that aren't browsers at all.

Internally, Cloudflare uses the same V8 JavaScript engine which is used in the Google
Chrome browser to run Workers on our infrastructure. V8 dynamically compiles your
JavaScript code into ultra-fast machine code, making it very performant. This makes it
possible for your Worker code to execute in microseconds, and for Cloudflare to
execute many thousands of Worker scripts per second.

While Cloudflare does use V8, we do not use Node.js. The JavaScript APIs available
to you inside Workers are implemented by us directly. Working with V8 directly allows
us to run code more efficiently and with the security controls we
need to keep our customers and our infrastructure safe.
