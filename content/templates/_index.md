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
    <div class="copy-group">
      <div class="copy-step">
        <img src="media/terminal.svg" id="img"/>
        <span>Paste this into your terminal:</span>
      </div>
      <div class="copy">
      ```
          wrangler generate myApp https://github.com/cloudflare/worker-template
      ```
      </div>
    </div>
    <span>Requires installation of <a href="https://github.com/cloudflare/wrangler">Wrangler</a>.</span>
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
        <img src="media/terminal.svg" id="img"/>
        <span>Paste this into your terminal:</span>
      </div>
      <div class="copy">
      ```
        wrangler generate myApp https://github.com/cloudflare/rustwasm-worker-template
      ```
      </div>
    </div>
    <span>Requires installation of <a href="https://github.com/cloudflare/wrangler">Wrangler</a>.</span>
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
    <div class="copy-group">
      <div class="copy-step">
        <img src="media/terminal.svg" id="img"/>
        <span>Paste this into your terminal:</span>
      </div>
      <div class="copy">
      ```
        wrangler generate myApp https://github.com/cloudflare/worker-template-router
      ```
      </div>
    </div>
    <span>Requires installation of <a href="https://github.com/cloudflare/wrangler">Wrangler</a>.</span>
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
    <div class="copy-group">
      <div class="copy-step">
        <img src="media/terminal.svg" id="img"/>
        <span>Paste this into your terminal:</span>
      </div>
      <div class="copy">
      ```
        wrangler generate myApp https://github.com/cloudflare/worker-template-static
      ```
      </div>
    </div>
    <span>Requires installation of <a href="https://github.com/cloudflare/wrangler">Wrangler</a>.</span>
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
    <div class="copy-group">
      <div class="copy-step">
      <img id="img" type="image/svg+xml" src="media/file.svg"/>
        <span>Copy into a Worker script:</span>
      </div>
      <div class="copy">
    ```/**
 * handleRequest sends a POST request with JSON data and
 * and reads in the response body.
 * @param {Request} request the incoming request
 */
async function handleRequest(request) {
  const init = {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  }
  const response = await fetch(url, init)
  const results = await gatherResponse(response)
  return new Response(results, init)
}
addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request))
})
/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get('content-type')
  if (contentType.includes('application/json')) {
    return await response.json()
  } else if (contentType.includes('application/text')) {
    return await response.text()
  } else if (contentType.includes('text/html')) {
    return await response.text()
  } else {
    return await response.text()
  }
}
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
    </div>
    <div class="links">
      <a
        class="demo"
        href="https://cloudflareworkers.com/#edce60b7d57c1e98fbe2d931aaaaf25f:https://tutorial.cloudflareworkers.com"
        >Demo JSON</a
      >
    </div>
  </figure>
  <figure class="template-card snippet">
    <h2>Aggregate Requests</h2>
    <p>
      Sends two GET request to two urls and aggregates the responses into one response.
    </p>
    <div class="copy-group">
      <div class="copy-step">
      <img id="img" type="image/svg+xml" src="media/file.svg"/>
        <span>Copy into a Worker script:</span>
      </div>
      <div class="copy">
    ```/**
 * handleRequest sends a GET request to two urls
 * and aggregates the responses into one response
 * @param {Request} request the incoming request
 */
async function handleRequest(request) {
  const init = {
    headers: {
      'content-type': type,
    },
  }
  const responses = await Promise.all([fetch(url1, init), fetch(url2, init)])
  const results = await Promise.all([gatherResponse(responses[0]), gatherResponse(responses[1])])
  return new Response(results, init)
}
addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request))
})
/**
 * Example someHost is set up to return JSON responses
 * Replace url1 and url2  with the hosts you wish to
 * send requests to
 * @param {string} url the URL to send the request to
 */
const someHost = 'https://workers-tooling.cf/demos'
const url1 = someHost + '/requests/json'
const url2 = someHost + '/requests/json'
const type = 'application/json;charset=UTF-8'
/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get('content-type')
  if (contentType.includes('application/json')) {
    return await response.json()
  } else if (contentType.includes('application/text')) {
    return await response.text()
  } else if (contentType.includes('text/html')) {
    return await response.text()
  } else {
    return await response.text()
  }
}
    ```
      </div>
    </div>
    <div class="links">
      <a
        class="demo"
        href="https://cloudflareworkers.com/#eaaa52283784c21aec989c64b9db32d3:https://example.com"
        >Demo</a
      >
    </div>
  </figure>
  <figure class="template-card boilerplate">
    <h2>Fetch</h2>
    <p>
      Examples of making fetch requests from within your Worker script including generating JSON
      post requests then reading in the resulting response body.
    </p>
    <div class="copy-group">
      <div class="copy-step">
        <img id="img" type="image/svg+xml" src="media/terminal.svg"/>
        <span>Paste this into your terminal:</span>
      </div>
      <div class="copy">
      ```
        wrangler generate myApp https://github.com/cloudflare/worker-template-fetch
      ```
      </div>
    </div>
    <span>Requires installation of <a href="https://github.com/cloudflare/wrangler">Wrangler</a>.</span>
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
    <div class="copy-group">
      <div class="copy-step">
        <img src="media/terminal.svg" id="img"/>
        <span>Paste this into your terminal:</span>
      </div>
      <div class="copy">
      ```
        wrangler generate myApp https://github.com/ashleygwilliams/worker-template-requests
      ```
      </div>
    </div>
    <span>Requires installation of <a href="https://github.com/cloudflare/wrangler">Wrangler</a>.</span>
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
    <div class="copy-group">
      <div class="copy-step">
        <img src="media/terminal.svg" id="img"/>
        <span>Paste this into your terminal:</span>
      </div>
      <div class="copy">
      ```
        wrangler generate myApp https://github.com/cloudflare/worker-template-redirect
      ```
      </div>
    </div>
    <span>Requires installation of <a href="https://github.com/cloudflare/wrangler">Wrangler</a>.</span>
    <div class="links">
      <a class="demo" href="https://cloudflareworkers.com/#5ab384d18305ff16ee4fe261e63c5cbe:https://tutorial.cloudflareworkers.com/redirect/bulk3">Demo Bulk</a>
      <a class="demo" href="https://cloudflareworkers.com/#5ab384d18305ff16ee4fe261e63c5cbe:https://tutorial.cloudflareworkers.com/redirect/generate">Demo Generate</a>
    </div>
  </figure>
  <figure class="template-card boilerplate">
    <h2>img-color-worker</h2>
    <p>Retrieve the dominant color of a PNG or JPEG image</p>
    <div class="copy-group">
      <div class="copy-step">
        <img src="media/terminal.svg" id="img"/>
        <span>Paste this into your terminal:</span>
      </div>
      <div class="copy">
      ```
        wrangler generate img-color https://github.com/xtuc/img-color-worker
      ```
      </div>
    </div>
    <span>Requires installation of <a href="https://github.com/cloudflare/wrangler">Wrangler</a>.</span>
  </figure>
  <figure class="template-card boilerplate">
    <h2>binast-cf-worker</h2>
    <span>Requires installation of <a href="https://github.com/cloudflare/wrangler">Wrangler</a>.</span>
    <p>Serve BinAST via a Cloudflare Worker</p>
    <div class="copy-group">
      <div class="copy-step">
        <img src="media/terminal.svg" id="img"/>
        <span>Paste this into your terminal:</span>
      </div>
      <div class="copy">
      ```
        wrangler generate binast-cf-worker https://github.com/xtuc/binast-cf-worker-template
      ```
      </div>
    </div>
    <span>Requires installation of <a href="https://github.com/cloudflare/wrangler">Wrangler</a>.</span>
    <div class="links">
      <a class="demo" href="https://serve-binjs.that-test.site/">Live Demo</a>
    </div>
  </figure>
</section>
The gallery is actively growing. The [template creator](https://github.com/victoriabernard92/workers-template-creator) allows you to share templates. Host a public repo, and then run `wrangler generate https://github.com/<your-repo>`.
For archived recipes see [the old docs](https://developers.cloudflare.com/workers/recipes/).
