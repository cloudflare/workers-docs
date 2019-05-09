---
title: Template Gallery
---

TODO: make this pretty display of linking to these templates' wrangler generate command, tutorial, live demo
TODO: replace links to gist with links to repos on Cloudflare's Github

While most of the templates below are near useless alone, they are designed to
be simple building blocks for building a Worker script.

### Router

[`router.js`](https://github.com/victoriabernard92/worker-template-router/blob/master/router.js)

Decide which logic to execute based on the request's method and URL. Can be
used for a REST API or any app needing routing logic.

[Demo /bar](http://workers-tooling.cf/router/bar) | [Demo /foo](http://workers-tooling.cf/router/foo)

### Static

[`static.js`](https://github.com/victoriabernard92/worker-template-static/blob/master/static.js)

Generate a fully functioning HTML page from cloud storage or from inputting
raw HTML into your work. Also, send static JSON.

[Demo HTML](http://workers-tooling.cf/static/html) |
[Demo JSON](http://workers-tooling.cf/static/json)

### Sending and Recieving Data

[`post-data.js`](https://github.com/victoriabernard92/worker-template-fetch/blob/master/post-data.js)

Examples of reading in a POST request body and writing back with a response body.

[Demo GET HTML](http://workers-tooling.cf/fetch/html) |
[Demo GET/POST JSON](http://workers-tooling.cf/fetch/json)

### Redirects

[`redirects.js`](https://github.com/victoriabernard92/worker-template-redirect/blob/master/redirect.js)

Generate and handle redirects.

[Demo Follow in Worker](https://workers-tooling.cf/redirect/follow) |
[Demo Follow in Browser](https://workers-tooling.cf/redirect/not-follow) |
[Demo Generate](https://workers-tooling.cf/redirect/generate)
