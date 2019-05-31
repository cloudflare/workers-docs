---
title: Template Gallery
alwaysopen: true
weight: 3
---


## `binast-cf-worker`
```
wrangler generate binast-cf-worker https://github.com/xtuc/binast-cf-worker-template
```

Serve BinAST via a Cloudflare Worker.


<p>These templates are simple building blocks for building a Workers script.</p>

<section class="template-wrapper">
  <figure class="template-card">
  <h2>Hello World</h2>
  <p>Simple Hello World in JS.</p>
  <span>Paste this into your terminal:</span>
  <code class="copy">
    wrangler generate myApp https://github.com/cloudflare/worker-template
  </code>
  <div class="links">
    <a class="demo" href="https://cloudflareworkers.com/#6626eb50f7b53c2d42b79d1082b9bd37:https://tutorial.cloudflareworkers.com">Demo</a>
  </div>
  </figure>
  <figure class="template-card">
  <h2>Hello World Rust</h2>
  <p>Simple Hello World in Rust.</p>
  <span>Paste this into your terminal:</span>
  <code class="copy">
    wrangler generate myApp https://github.com/cloudflare/rustwasm-worker-template
  </code>
  <div class="links">
    <a class="demo" href="https://cloudflareworkers.com/#1992963c14c25bc8dc4c50f4cab740e5:https://tutorial.cloudflareworkers.com">Demo</a>
  </div>
  </figure>
  <figure class="template-card">
  <h2>Router</h2>
  <p>Selects the logic based on the <code>request</code> method and URL. Use with REST APIs or apps that require routing logic.</p>
  <span>Paste this into your terminal:</span>
  <code class="copy">
    wrangler generate myApp https://github.com/cloudflare/worker-template-router
  </code>
  <div class="links">
    <a class="demo" href="https://cloudflareworkers.com/#6cbbd3ae7d4e928da3502cb9ce11227a:https://tutorial.cloudflareworkers.com/bar">Demo /bar</a>
    <a class="demo" href="https://cloudflareworkers.com/#6cbbd3ae7d4e928da3502cb9ce11227a:https://tutorial.cloudflareworkers.com/foo">Demo /foo</a>
    <a class="source" href="https://github.com/victoriabernard92/worker-template-router/blob/master/router.js">Source code</a>
  </div>
  </figure>

  <figure class="template-card">
  <h2>Static</h2>
  <p>Generates a fully functioning HTML page from cloud storage or from raw HTML in your work. Sends a static JSON.</p>
  <span>Paste this into your terminal:</span>
  <code class="copy">
    wrangler generate myApp https://github.com/cloudflare/worker-template-static
  </code>
  <div class="links">
    <a class="demo" href="https://cloudflareworkers.com/#3160870d853b4df56a711621c7bd4ef3:https://tutorial.cloudflareworkers.com/static/html">Demo HTML</a>
    <a class="demo" href="https://cloudflareworkers.com/#3160870d853b4df56a711621c7bd4ef3:https://tutorial.cloudflareworkers.com/static/json">Demo JSON</a>
    <a class="source" href="https://github.com/victoriabernard92/worker-template-router/blob/master/router.js">Source code</a>
  </div>
  </figure>

  <figure class="template-card">
  <h2>Fetch</h2>
  <p>Examples of making fetch requests from within your Worker script including generating JSON post requests then reading in the resulting response body, aggregating multiple requests into one response, and following/catching redirects.</p>
  <span>Paste this into your terminal:</span>
  <code class="copy">
    wrangler generate myApp https://github.com/cloudflare/worker-template-static
  </code>
  </figure>
  <figure class="template-card">
  <h2>Incoming Request</h2>
  <p>Examples of reading in a POST request body of type JSON and form-data and manipulating request headers before it reaches the origin server.</p>
  <span>Paste this into your terminal:</span>
  <code class="copy">
    wrangler generate myApp https://github.com/ashleygwilliams/worker-template-requests
  </code>
  <div class="links">
    <a class="demo" href="https://cloudflareworkers.com/#64ac9c92b22a73a507155efb6dc856d0:https://tutorial.cloudflareworkers.com">Demo GET</a>
    <a class="source" href="https://github.com/ashleygwilliams/worker-template-requests/blob/master/router.js">Source code</a>
  </div>
  </figure>

  <figure class="template-card">
  <h2>Redirects</h2>
  <p>Examples of sending single and bulk redirects from a Worker script</p>
  <span>Paste this into your terminal:</span>
  <code class="copy">
    wrangler generate myApp https://github.com/cloudflare/worker-template-redirect
  </code>
  <div class="links">
    <a class="demo" href="https://workers-tooling.cf/demos/redirect/bulk1">Demo Bulk</a>
    <a class="demo" href="https://workers-tooling.cf/demos/redirect/generate">Demo Generate</a>
    <a class="source" href="https://github.com/victoriabernard92/worker-template-router/blob/master/router.js">Source code</a>
  </div>
  </figure>

  <figure class="template-card">
  <h2><code>img-color-worker</code></h2>
  <p>Examples of sending single and bulk redirects from a Worker script</p>
  <span>Paste this into your terminal:</span>
  <code class="copy">
    wrangler generate img-color https://github.com/xtuc/img-color-worker
  </code>
  </figure>

  <figure class="template-card">
  <h2><code>binast-cf-worker</code></h2>
  <p>Serve BinAST via a Cloudflare Worker</p>
  <span>Paste this into your terminal:</span>
  <code class="copy">
    wrangler generate binast-cf-worker https://github.com/xtuc/binast-cf-worker-template
  </code>
  </figure>
</section>
