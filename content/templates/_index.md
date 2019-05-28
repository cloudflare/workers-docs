---
title: Template Gallery
alwaysopen: true
weight: 3
---

TODO: implement a design that grants easy access to copy/paste wrangler generate command, tutorial, live demo

These templates are simple building blocks for building a Workers script.

## Router
```
wrangler generate myApp https://github.com/cloudflare/worker-template-router
```

Selects the logic based on the `request` method and URL. Use with REST APIs or apps that require routing logic.

[Demo /bar](https://cloudflareworkers.com/#6cbbd3ae7d4e928da3502cb9ce11227a:https://tutorial.cloudflareworkers.com/bar) | [Demo /foo](https://cloudflareworkers.com/#6cbbd3ae7d4e928da3502cb9ce11227a:https://tutorial.cloudflareworkers.com/foo)

## Static
```
wrangler generate myApp https://github.com/cloudflare/worker-template-static
```

Generates a fully functioning HTML page from cloud storage or from raw HTML in your work. Sends a static JSON.

[Demo HTML](https://cloudflareworkers.com/#3160870d853b4df56a711621c7bd4ef3:https://tutorial.cloudflareworkers.com/static/html) |
[Demo JSON](https://cloudflareworkers.com/#3160870d853b4df56a711621c7bd4ef3:https://tutorial.cloudflareworkers.com/static/json)

## Fetch
```
wrangler generate myApp https://github.com/cloudflare/worker-template-static
```

Examples of making fetch requests from within your Worker script including generating JSON post requests then reading in the resulting response body, aggregating multiple requests into one response, and following/catching redirects.

## Incoming Request
```
wrangler generate myApp https://github.com/cloudflare/worker-template-request
```
Examples of reading in a POST request body of type JSON and form-data and manipulating request headers before it reaches the origin server.

[Demo GET HTML](http://workers-tooling.cf/demos/fetch/html) |
[Demo GET/POST JSON](http://workers-tooling.cf/demos/fetch/json)

## Redirects
```
wrangler generate myApp https://github.com/cloudflare/worker-template-redirect
```

Examples of sending single and bulk redirects from a Worker script

[Demo Bulk](https://cloudflareworkers.com/#5ab384d18305ff16ee4fe261e63c5cbe:https://tutorial.cloudflareworkers.com/demos/redirect/bulk1) |
[Demo Generate](https://cloudflareworkers.com/#5ab384d18305ff16ee4fe261e63c5cbe:https://tutorial.cloudflareworkers.com/demos/redirect/generate)



