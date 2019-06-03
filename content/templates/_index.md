---
title: Template Gallery
alwaysopen: true
weight: 3
---

<p>These templates are simple building blocks for building a Workers script.</p>
<section class="template-wrapper">
  <figure class="template-card">
    <h2>Hello World</h2>
    <p>Simple Hello World in JS.</p>
    <span>Paste this into your terminal:</span>
    <div class="copy">
      <code class="highlight">
        wrangler generate myApp https://github.com/cloudflare/worker-template
      </code>
    </div>
    <div class="links">
      <a
        class="demo"
        href="https://cloudflareworkers.com/#6626eb50f7b53c2d42b79d1082b9bd37:https://tutorial.cloudflareworkers.com"
        >Demo</a
      >
    </div>
  </figure>
  <figure class="template-card">
    <h2>Hello World Rust</h2>
    <p>Simple Hello World in Rust.</p>
    <span>Paste this into your terminal:</span>
    <div class="copy">
      <code class="highlight">
        wrangler generate myApp https://github.com/cloudflare/rustwasm-worker-template
      </code>
    </div>
    <div class="links">
                 <a
        class="demo"
        href="https://cloudflareworkers.com/#1992963c14c25bc8dc4c50f4cab740e5:https://tutorial.cloudflareworkers.com"
        >Demo</a
      >
    </div>
  </figure>
  <figure class="template-card">
    <h2>Router</h2>
    <p>Selects the logic based on the <code>request</code> method and URL. Use with REST APIs or apps
      that require routing logic.
    </p>
    <span>Paste this into your terminal:</span>
    <div class="copy">
      <code class="highlight">
        wrangler generate myApp https://github.com/cloudflare/worker-template-router
      </code>
    </div>
    <div class="links">
      <a
        class="demo"
        href="https://cloudflareworkers.com/#6cbbd3ae7d4e928da3502cb9ce11227a:https://tutorial.cloudflareworkers.com/bar"
        >Demo /bar</a
      >
      <a
        class="demo"
        href="https://cloudflareworkers.com/#6cbbd3ae7d4e928da3502cb9ce11227a:https://tutorial.cloudflareworkers.com/foo"
        >Demo /foo</a
      >
    </div>
  </figure>
  <figure class="template-card">
    <h2>Static</h2>
    <p>Generates a fully functioning HTML page from raw HTML or sends raw JSON defined within your script.
    </p>
    <span>Paste this into your terminal:</span>
    <div class="copy">
      <code class="highlight">
        wrangler generate myApp https://github.com/cloudflare/worker-template-static
      </code>
    </div>
    <div class="links">
      <a
        class="demo"
        href="https://cloudflareworkers.com/#3160870d853b4df56a711621c7bd4ef3:https://tutorial.cloudflareworkers.com/static/html"
        >Demo HTML</a
      >
      <a
        class="demo"
        href="https://cloudflareworkers.com/#3160870d853b4df56a711621c7bd4ef3:https://tutorial.cloudflareworkers.com/static/json"
        >Demo JSON</a
      >
    </div>
  </figure>
  <figure class="template-card">
    <h2>Fetch</h2>
    <p>
      Examples of making fetch requests from within your Worker script including generating JSON
      post requests then reading in the resulting response body.
    </p>
    <span>Paste this into your terminal:</span>
    <div class="copy">
      <code class="highlight">
        wrangler generate myApp https://github.com/cloudflare/worker-template-fetch
      </code>
    </div>
    <div class="links">
      <a
        class="demo"
        href="https://cloudflareworkers.com/#c72284898b1767342dc5c7bc24925e16:https://tutorial.cloudflareworkers.com/json"
        >Demo JSON</a
      >
      <a
        class="demo"
        href="https://cloudflareworkers.com/#c72284898b1767342dc5c7bc24925e16:https://tutorial.cloudflareworkers.com/html"
        >Demo HTML</a
      >
    </div>
  </figure>
  <figure class="template-card">
    <h2>Incoming Request</h2>
    <p>
      Examples of reading in a POST request body of type JSON and form-data.
    </p>
    <span>Paste this into your terminal:</span>
    <div class="copy">
      <code class="highlight">
        wrangler generate myApp https://github.com/ashleygwilliams/worker-template-requests
      </code>
    </div>
    <div class="links">
      <a
        class="demo"
        href="https://cloudflareworkers.com/#6cf6a1d0d8e5a0bd3be434b754c183f0:https://tutorial.cloudflareworkers.com/form"
        >Demo Form</a
      >
    </div>
  </figure>
  <figure class="template-card">
    <h2>Redirects</h2>
    <p>Examples of sending single and bulk redirects from a Worker script</p>
    <span>Paste this into your terminal:</span>
    <div class="copy">
      <code class="highlight">
        wrangler generate myApp https://github.com/cloudflare/worker-template-redirect
      </code>
    </div>
    <div class="links">
      <a class="demo" href="https://cloudflareworkers.com/#5ab384d18305ff16ee4fe261e63c5cbe:https://tutorial.cloudflareworkers.com/redirect/bulk3">Demo Bulk</a>
      <a class="demo" href="https://cloudflareworkers.com/#5ab384d18305ff16ee4fe261e63c5cbe:https://tutorial.cloudflareworkers.com/redirect/generate">Demo Generate</a>
    </div>
  </figure>
  <figure class="template-card">
    <h2>img-color-worker</h2>
    <p>Examples of sending single and bulk redirects from a Worker script</p>
    <span>Paste this into your terminal:</span>
    <div class="copy">
      <code class="highlight">
        wrangler generate img-color https://github.com/xtuc/img-color-worker
      </code>
    </div>
  </figure>
  <figure class="template-card">
    <h2>binast-cf-worker</h2>
    <p>Serve BinAST via a Cloudflare Worker</p>
    <span>Paste this into your terminal:</span>
    <div class="copy">
      <code class="highlight">
        wrangler generate binast-cf-worker https://github.com/xtuc/binast-cf-worker-template
      </code>
    </div>
  </figure>
</section>
