---
title: Template Gallery
alwaysopen: true
weight: 3
---

These templates are simple building blocks for building a Workers script.

<section class="template-wrapper">
  <figure class="template-card">
  <h2>Router</h2>

  <p>Selects the logic based on the <code>request</code> method and URL. Use with REST APIs or apps that require routing logic.</p>

  <span>Paste this into your terminal:</span>
  <code class="copy">
    wrangler generate myApp https://github.com/cloudflare/worker-template-router
  </code>

  <div class="links">
    <a class="demo" href="http://workers-tooling.cf/demos/router/bar">Demo /bar</a>
    <a class="demo" href="http://workers-tooling.cf/demos/router/foo">Demo /foo</a>
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
    <a class="demo" href="http://workers-tooling.cf/demos/static/html">Demo HTML</a>
    <a class="demo" href="http://workers-tooling.cf/demos/static/json">Demo JSON</a>
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
    wrangler generate myApp https://github.com/cloudflare/worker-template-request
  </code>

  <div class="links">
    <a class="demo" href="http://workers-tooling.cf/demos/fetch/html">Demo GET HTML</a>
    <a class="demo" href="http://workers-tooling.cf/demos/fetch/json">Demo GET/POST JSON</a>
    <a class="source" href="https://github.com/victoriabernard92/worker-template-router/blob/master/router.js">Source code</a>
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
</section>
