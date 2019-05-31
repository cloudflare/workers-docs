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
    <h2>Hello World</h2>
    <p>Simple Hello World in JS.</p>
    <code class="copy">
      wrangler generate myApp https://github.com/cloudflare/worker-template
    </code>
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
    <code class="copy">
      wrangler generate myApp https://github.com/cloudflare/rustwasm-worker-template
    </code>
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
      <p>Direct requests to the appropriate handler function.</p>
      <code class="copy">
        wrangler generate myApp https://github.com/cloudflare/worker-template-router
      </code>
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
      <h2>Fetch</h2>
      <p>
        Send requests from your Workers application.
      </p>
      <code class="copy">
        wrangler generate myApp https://github.com/cloudflare/worker-template-fetch
      </code>
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
