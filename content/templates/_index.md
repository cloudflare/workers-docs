---
title: Template Gallery
alwaysopen: true
weight: 3
---

<p>These templates are simple building blocks for developing Workers scripts.</p>
<h2>Boilerplates</h2>
<p>Skeletons that are useful when starting a project. <span>Requires installation of <a href="https://github.com/cloudflare/wrangler">Wrangler</a>.</span></p>

{{< templates >}}

The gallery is actively growing. The [template creator](https://github.com/victoriabernard92/workers-template-creator) allows you to share
templates.

To use a template, run `wrangler generate https://github.com/your-repo`.

For archived recipes, see [the old docs](https://developers.cloudflare.com/workers/recipes/).

<h2>Snippets</h2>
<p>Copy pasteable code that can be used in a new or existing project.</p>
{{< snippets >}}

  <!-- <section class="template-wrapper snippet">
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
    ```async function handleRequest(request) {
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
 * Example someHost is set up to return JSON responses
 * Replace url1 and url2  with the hosts you wish to
 * send requests to
 * @param {string} url the URL to send the request to
 */
const someHost = 'https://workers-tooling.cf/demos'
const url1 = someHost + '/requests/json'
const url2 = someHost + '/requests/json'
const type = 'application/json;charset=UTF-8'
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
  <figure class="template-card snippet">
    <h2>Fetch JSON</h2>
    <p>
      Sends a GET request and reads in JSON from the response.
    </p>
    <div class="copy-group">
      <div class="copy-step">
        <img id="img" type="image/svg+xml" src="media/file.svg"/>
        <span>Copy into a Worker script:</span>
      </div>
      <div class="copy">
    ```async function handleRequest(request) {
  const init = {
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
    return JSON.stringify(await response.json())
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
const url = someHost + '/static/json'
    ```
      </div>
      <div class="links">
        <a class="demo" href="https://cloudflareworkers.com/#a45261f6682b048d9ed0e23a330d9cdb:https://example.com">Demo</a>
      </div>
    </div>
  </figure>
  <figure class="template-card snippet">
    <h2>Fetch HTML</h2>
    <p>
      Sends a request to a remote server, reads HTML from the response, then serves that HTML.
    </p>
    <div class="copy-group">
      <div class="copy-step">
        <img id="img" type="image/svg+xml" src="media/file.svg"/>
        <span>Copy into a Worker script:</span>
      </div>
      <div class="copy">```async function handleRequest(request) {
  const init = {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
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
 * Example someHost at url is set up to respond with HTML
 * Replace url with the host you wish to send requests to
 *  */
const someHost = 'https://workers-tooling.cf/demos'
const url = someHost + '/static/html'
```
      </div>
      <div class="links">
        <a class="demo" href="https://cloudflareworkers.com/#14a82a672534b0dd25b385a5d3de744c:https://example.com">Demo</a>
      </div>
    </div>
  </figure>
  <figure class="template-card snippet">
    <h2>Send Raw HTML</h2>
    <p>
     Delivers an HTML page from HTML directly in the Worker script.
    </p>
    <div class="copy-group">
      <div class="copy-step">
        <img id="img" type="image/svg+xml" src="media/file.svg"/>
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
  <figure class="template-card snippet">
    <h2>Send Raw JSON</h2>
    <p>
     Delievers a JSON response from JSON in the Worker script.
    </p>
    <div class="copy-group">
      <div class="copy-step">
        <img id="img" type="image/svg+xml" src="media/file.svg"/>
        <span>Copy into a Worker script:</span>
      </div>
      <div class="copy">
      ```async function handlRequest(request) {
  const init = {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  }
  return new Response(JSON.stringify(someJSON), init)
}
addEventListener('fetch', event => {
  return event.respondWith(handlRequest(event.request))
})
const someJSON = {
  result: ['some', 'results'],
  errors: null,
  msg: 'this is some random json',
}
      ```
      </div>
      <div class="links">
        <a class="demo" href="https://cloudflareworkers.com/#83bc6debecf1dd443d3fabfbde0d2b3a:https://example.com">Demo</a>
      </div>
    </div>
  </figure>
  <figure class="template-card snippet">
    <h2>Bulk Redirects</h2>
    <p>
      Redirects requests to certain URLs based a mapped object to the request's URL.
    </p>
    <div class="copy-group">
      <div class="copy-step">
        <img id="img" type="image/svg+xml" src="media/file.svg"/>
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
    <h2>Redirect</h2>
    <p>Redirect a request by sending a 301 or 302 HTTP response</p>
    <div class="copy-group">
      <div class="copy-step">
        <img id="img" type="image/svg+xml" src="media/file.svg"/>
        <span>Copy into a Worker script:</span>
      </div>
      <div class="copy">
      ```async function handleRequest(request) {
  return Response.redirect(someURLToRedirectTo, code)
}
addEventListener('fetch', async event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Example Input
 * @param {Request} url where to redirect the response
 * @param {number?=301|302} type permanent or temporary redirect
 */
const someURLToRedirectTo = 'https://www.google.com'
const code = 301
      ```
      </div>
    </div>
    <div class="links">
      <a class="demo" href="https://cloudflareworkers.com/#ab385d4c4e43608684889eaa390d4218:https://example.com/">Demo</a>
    </div>
  </figure>
  <figure class="template-card snippet">
    <h2>Form Data</h2>
    <p>Serve an HTML form, then read POSTs from that form data.</p>
    <div class="copy-group">
      <div class="copy-step">
        <img id="img" type="image/svg+xml" src="media/file.svg"/>
        <span>Copy into a Worker script:</span>
      </div>
      <div class="copy">
      ```async function handlePostRequest(request) {
  let reqBody = await readRequestBody(request)
  let retBody = `The request body sent in was ${reqBody}`
  return new Response(retBody)
}
async function handleRequest(request) {
  let retBody = `The request was a GET `
  return new Response(retBody)
}
addEventListener('fetch', event => {
  const { request } = event
  const { url } = request
  if (url.includes('form')) {
    return event.respondWith(rawHtmlResponse(someForm))
  }
  if (request.method === 'POST') {
    return event.respondWith(handlePostRequest(request))
  } else if (request.method === 'GET') {
    return event.respondWith(handleRequest(request))
  }
})
/**
 * rawHtmlResponse delievers a response with HTML inputted directly
 * into the worker script
 * @param {string} html
 */
async function rawHtmlResponse(html) {
  const init = {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  }
  return new Response(html, init)
}
/**
 * readRequestBody reads in the incoming request body
 * Use await readRequestBody(..) in an async function to get the string
 * @param {Request} request the incoming request to read from
 */
async function readRequestBody(request) {
  const { headers } = request
  const contentType = headers.get('content-type')
  if (contentType.includes('application/json')) {
    const body = await request.json()
    return JSON.stringify(body)
  } else if (contentType.includes('application/text')) {
    const body = await request.text()
    return body
  } else if (contentType.includes('text/html')) {
    const body = await request.text()
    return body
  } else if (contentType.includes('form')) {
    const formData = await request.formData()
    let body = {}
    for (let entry of formData.entries()) {
      body[entry[0]] = entry[1]
    }
    return JSON.stringify(body)
  } else {
    let myBlob = await request.blob()
    var objectURL = URL.createObjectURL(myBlob)
    return objectURL
  }
}
const someForm = `
<!DOCTYPE html>
<html>
<body>
<h1>Hello World</h1>
<p>This is all generated using a Worker</p>
<form action="/demos/requests" method="post">
  <div>
    <label for="say">What  do you want to say?</label>
    <input name="say" id="say" value="Hi">
  </div>
  <div>
    <label for="to">To who?</label>
    <input name="to" id="to" value="Mom">
  </div>
  <div>
    <button>Send my greetings</button>
  </div>
</form>
</body>
</html>
`
      ```
      </div>
    </div>
    <div class="links">
      <a class="demo" href="https://cloudflareworkers.com/#a6a285e4e2bfbebea0be31b9eeaca3e6:https://example.com/form">Demo</a>
    </div>
  </figure>
  </section>
  <h2>Featured Projects</h2>
  <p>More boilerplate projects. <span>Requires installation of <a href="https://github.com/cloudflare/wrangler">Wrangler</a>.</span></p>
  <p>The gallery is actively growing. The [template creator](https://github.com/victoriabernard92/workers-template-creator) allows you to share templates. Host a public repo, and then run `wrangler generate https://github.com/<your-repo>`.
For archived recipes see [the old docs](https://developers.cloudflare.com/workers/recipes/).</p>
  <section class='template-wrapper boilerplate'>
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
  </figure>
  <figure class="template-card boilerplate">
    <h2>binast-cf-worker</h2>
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
    <div class="links">
      <a class="demo" href="https://serve-binjs.that-test.site/">Live Demo</a>
    </div>
  </figure>
</section> -->