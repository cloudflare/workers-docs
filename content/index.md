---
title: Cloudflare Workers Documentation
---

<p>Cloudflare Workers provides a serverless execution environment that allows you to create entirely new applications or augment existing ones without configuring or maintaining infrastructure.</p>

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
    <a href="/tutorials/build-a-serverless-function">Deploy a QR code reader</a>
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
</section>

<a href="/templates">View all templates</a>

<h2>Reference</h2>
<section class="reference-links">
  <div>
    <a href="/reference/runtime/apis">JS Environment</a>
    <p>Global variables immediately available in your code</p>
  </div>
  <div>
    <a href="/reference/tooling">Tooling</a>
    <p>Build and deploy with integrated tools</p>
  </div>
  <div>
    <a href="/reference/runtime">Runtime</a>
    <p>Deep dive into how your code is running</p>
  </div>
  <div>
    <a href="/reference/tooling/api">API</a>
    <p>Deploy using the Cloudflare API</p>
  </div>
</section>

