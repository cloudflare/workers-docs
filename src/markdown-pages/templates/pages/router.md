---
hidden: true
---


{{< template-page "router" >}}

The Router template allows developers to build URL-based applications on the Cloudflare Workers platform. If you've built applications with [Express](https://expressjs.com/), you'll be familiar with the API, which combines REST conventions with function handlers.

The Router template includes a `Router` class (available at `./router.js`), which is imported into `index.js` by default to show example functionality. Once a new instance of the `Router` class has been instantiated, you can make use of methods like `get`, `put`, `post` (see the [source file](https://github.com/cloudflare/worker-template-router/blob/master/router.js) of `router.js` for the full list), and correspond associated function handlers to build your application. Below is an example of using the Router template:

```js
const Router = require('./router')

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const jsonHandler = request => {
  const init = { headers: { 'content-type': 'application/json' } }
  const body = JSON.stringify({ some: 'json' })
  return new Response(body, init)
}

async function handleRequest(request) {
  const r = new Router()
  r.get('/', () => new Response('Hello worker!'))
  r.post('/', req => new Response(`Your body is ${await req.text()}`))
  r.get('/json', jsonHandler)
  return r.route(request)
}
```

To learn more about the template, or to contribute to the project, check out the GitHub repository: [`cloudflare/worker-template-router`](https://github.com/cloudflare/worker-template-router)
