---
title: Template Gallery
alwaysopen: true
weight: 3
---

<p>These templates are simple building blocks for building a Workers script.</p>
<section class="template-wrapper">
  <figure class="template-card boilerplate">
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
  <figure class="template-card boilerplate">
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
  <figure class="template-card boilerplate">
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
  <figure class="template-card boilerplate">
    <h2>Static</h2>
    <p>Generates a fully functioning HTML page from raw HTML or sends raw JSON defined within your script.
    </p>
    <div class="step">
      <svg class="fb bk" aria-label="file" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.612 5.094h-3.596V1.508l3.596 3.586z"></path><path d="M13.553 5.876H9.191V1.4h-6.8v13.2h11.221V5.939zm-8.767-1h3.091v1.235H4.786zm6.451 7.3H4.786v-1.24h6.45zm0-2.988H4.786V7.949h6.45z"></path></svg>
      <span>Paste this into your terminal:</span>
    </div>
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
  <figure class="template-card snippet">
    <h2>Post JSON</h2>
    <p>
     POST request with JSON data and and reads in the response body.
    </p>
    <div class="step">
      <svg class="fb bk" aria-label="file" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.612 5.094h-3.596V1.508l3.596 3.586z"></path><path d="M13.553 5.876H9.191V1.4h-6.8v13.2h11.221V5.939zm-8.767-1h3.091v1.235H4.786zm6.451 7.3H4.786v-1.24h6.45zm0-2.988H4.786V7.949h6.45z"></path></svg>
      <span>Use this in your Worker script:</span>
    </div>
        <div class="copy">
```
  /**
  * Example someHost is set up to take in a JSON request
  * Replace url with the host you wish to send requests to
  * @param {string} url the URL to send the request to
  * @param {BodyInit} body the JSON data to send in the request
  */
  const someHost = 'https://workers-tooling.cf/demos'
  const url = someHost + '/requests/json'
  const body = {
    results: ['default data to send'],
    errors: null,
    msg: 'I sent this to the fetch',
  }
```
</div>
    <div class="links">
      <a
        class="demo"
        href="https://cloudflareworkers.com/#edce60b7d57c1e98fbe2d931aaaaf25f:https://tutorial.cloudflareworkers.com"
        >Demo JSON</a
      >
    </div>
  </figure>
  <figure class="template-card boilerplate">
    <h2>Fetch</h2>
    <p>
      Examples of making fetch requests from within your Worker script including generating JSON
      post requests then reading in the resulting response body.
    </p>
    <div class="step">
      <svg class="fb bk" aria-label="file" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.612 5.094h-3.596V1.508l3.596 3.586z"></path><path d="M13.553 5.876H9.191V1.4h-6.8v13.2h11.221V5.939zm-8.767-1h3.091v1.235H4.786zm6.451 7.3H4.786v-1.24h6.45zm0-2.988H4.786V7.949h6.45z"></path></svg>
      <span>Paste this into your terminal:</span>
    </div>
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
  <figure class="template-card boilerplate">
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
  <figure class="template-card boilerplate">
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
  <figure class="template-card boilerplate">
    <h2>img-color-worker</h2>
    <p>Retrieve the dominant color of a PNG or JPEG image</p>
    <span>Paste this into your terminal:</span>
    <div class="copy">
      <code class="highlight">
        wrangler generate img-color https://github.com/xtuc/img-color-worker
      </code>
    </div>
  </figure>
  <figure class="template-card boilerplate">
    <h2>binast-cf-worker</h2>
    <p>Serve BinAST via a Cloudflare Worker</p>
    <span>Paste this into your terminal:</span>
    <div class="copy">
      <code class="highlight">
        wrangler generate binast-cf-worker https://github.com/xtuc/binast-cf-worker-template
      </code>
    </div>
    <div class="links">
      <a class="demo" href="https://serve-binjs.that-test.site/">Live Demo</a>
    </div>
  </figure>
</section>
The gallery is actively growing. The [template creator](https://github.com/victoriabernard92/workers-template-creator) allows you to share templates. Host a public repo, and then run `wrangler generate https://github.com/<your-repo>`.
For archived recipes see [the old docs](https://developers.cloudflare.com/workers/recipes/).
```
