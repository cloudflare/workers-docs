---
title: Cloudflare Workers Documentation
---

<p>
  Cloudflare Workers provides a serverless execution environment that allows you to create entirely
  new applications or augment existing ones without configuring or maintaining infrastructure.
</p>

<h2>Quick Start</h2>
<p>
  <a href="/quickstart" class="quick-start">Get Started</a> Begin building and publishing your code
  from the CLI.
</p>

<h2>Tutorials</h2>
<p>Discover what you can build with these step-by-step tutorials.</p>
<ul class="tutorial-list">
  <li class="tutorial-item">
    <a href="/tutorials/build-an-application">
      <img src="/media/chat-bot.svg" />
    </a>
    Build an Application
    <a href="/tutorials/build-an-application">Create a Slack Bot for GitHub</a>
  </li>
  <li class="tutorial-item">
    <a href="/tutorials/build-a-serverless-function">
      <img src="/media/qr-generator.svg" />
    </a>
    Build a Serverless Function
    <a href="/tutorials/build-a-serverless-function">Deploy a QR code generator</a>
  </li>
  <li class="tutorial-item">
    <a href="/tutorials/configure-your-cdn">
      <img src="/media/cache-website.svg" />
    </a>
    Configure Your CDN
    <a href="/tutorials/configure-your-cdn">Serve and cache files from cloud storage</a>
  </li>
</ul>

<h2>Templates</h2>
<p>Ready-to-use code to get you started.</p>
<section class="template-wrapper">
  <figure class="template-card boilerplate">
    <h2>Hello World</h2>
    <p>Simple Hello World in JS.</p>
    <div class="copy-group">
      <div class="copy-step">
        <img src="templates/media/terminal.svg" id="img"/>
        <span>Paste this into your terminal:</span>
      </div>
      <div class="copy">
      ```
          wrangler generate myApp https://github.com/cloudflare/worker-template
      ```
      </div>
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
    <div class="copy-group">
      <div class="copy-step">
        <img src="templates/media/terminal.svg" id="img"/>
        <span>Paste this into your terminal:</span>
      </div>
      <div class="copy">
    ```
        wrangler generate myApp https://github.com/cloudflare/rustwasm-worker-template
    ```
      </div>
    </div>
    <div class="links">
      <a
        class="demo"
        href="https://cloudflareworkers.com/#1992963c14c25bc8dc4c50f4cab740e5:https://tutorial.cloudflareworkers.com"
        >Demo</a
      >
    </div>
  </figure>
  </section>
  <section class="snippet template-wrapper">
  <figure class="template-card snippet">
    <h2>Bulk Redirects</h2>
    <p>
      Redirects requests to certain URLs based a mapped object to the request's URL.
    </p>
    <div class="copy-group">
      <div class="copy-step">
        <img id="img" type="image/svg+xml" src="templates/media/file.svg"/>
        <span>Copy into a Worker script:</span>
      </div>
      <div class="copy">```async function handleRequest(request) {
  let requestURL = new URL(request.url)
  let path = requestURL.pathname.split('/redirect')[1]
  let location = redirectMap.get(path)
  if (location) {
    return Response.redirect(location, 301)
  }
  // If in map, return the original request
  return fetch(request)
}
addEventListener('fetch', async event => {
  event.respondWith(handleRequest(event.request))
})
const externalHostname = 'workers-tooling.cf'
const redirectMap = new Map([
  ['/bulk1', 'https://' + externalHostname + '/redirect2'],
  ['/bulk2', 'https://' + externalHostname + '/redirect3'],
  ['/bulk3', 'https://' + externalHostname + '/redirect4'],
  ['/bulk4', 'https://google.com'],
])```
      </div>
      <div class="links">
        <a class="demo" href="https://cloudflareworkers.com/#d17c3da192fd5c83ef7d28153ab32f3f:https://example.com/redirect/bulk1">Demo</a>
      </div>
    </div>
  </figure>
  <figure class="template-card snippet">
      <h2>Send Raw HTML</h2>
      <p>
      Delievers an HTML page from HTML directly in the Worker script.
      </p>
      <div class="copy-group">
        <div class="copy-step">
          <img id="img" type="image/svg+xml" src="templates/media/file.svg"/>
          <span>Copy into a Worker script:</span>
        </div>
        <div class="copy">
      ```async function handleRequest(request) {
  const init = {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  }
  return new Response(someHTML, init)
}
addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request))
})
const someHTML =  `<!DOCTYPE html>
<html>
  <body>
  <h1>Hello World</h1>
  <p>This is all generated using a Worker</p>
  <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
  ></iframe>
  </body>
</html>
`
      ```
      </div>
      <div class="links">
        <a class="demo" href="https://cloudflareworkers.com/#ba06ef26637ab98b1f38a18dc527dc69:https://example.com">Demo</a>
      </div>
    </div>
  </figure>
</section>
<a href="/templates">View all templates</a>
<h2>Reference</h2>
<section class="reference-links">
  <div>
    <a href="/reference/runtime/apis">Runtime APIs</a>
    <p>Global variables immediately available in your code</p>
  </div>
  <div>
    <a href="/reference/workers-concepts">Concepts</a>
    <p>The need to know while writing Workers scripts.</p>
  </div>
  <div>
    <a href="/reference/tooling">Tooling</a>
    <p>Build and deploy with integrated tools</p>
  </div>
</section>
