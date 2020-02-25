---
title: Unit Testing
weight: 50
---

Unit testing with Cloudflare Workers is made by possible by [Cloudworker](https://github.com/dollarshaveclub/cloudworker), a test harness which mocks the Worker runtime. The engineering team at Dollar Shave Club created Cloudworker and we're truly grateful to them for doing so. Their announcement on our blog can be found [here](https://blog.cloudflare.com/cloudworker-a-local-cloudflare-worker-runner/).

### Additional Information

Please see [this](https://blog.cloudflare.com/unit-testing-worker-functions/) blog post for a detailed tutorial on how to unit test Cloudflare Worker functions.

The source for Cloudworker can be found [here](https://github.com/dollarshaveclub/cloudworker).

### Step by Step Guide

Run `npm init` within a new directory to create a new project. Within it, place the `worker.js` you want to test, and create `worker-test.js` inside of a new `test` directory. The final layout should look something like:

```hcl
----- worker.js
----- test
      . worker-test.js
----- node_modules
----- package.json
----- package-lock.json.
```

Next install Cloudworker with `npm install @dollarshaveclub/cloudworker --save-dev` and the mocha testing framework (`npm install mocha --save-dev`).

Then update `package.json` by setting the `"scripts"` value to `mocha` like this:

```javascript
"scripts": {
    "test": "mocha"
  }
```

In this example our example worker script (deployed to `worker.example.com`) will be:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function addition(a, b) {
  return a + b
}

async function handleRequest(request) {
  const added = await addition(1, 3)
  return new Response(`The Sum is ${added}!`)
}
```

Now we are ready to write tests! Before doing so we're going to set up our tests so we can use the same SDK used to develop Workers

To accomplish this we're going to assign all property values from Cloudworker and our Worker script to the global context before any `async function()` is run in mocha. We will use mocha's implementation of `async/await` to help us test our code.

Secondly, we'll require the `assert` library for our testing. Together, these two lines are put at the top of `worker-test.js`.

```javascript
before(async function() {
  Object.assign(
    global,
    new (require('@dollarshaveclub/cloudworker'))(require('fs').readFileSync('worker.js', 'utf8'))
      .context
  )
})

// You will replace worker.js with the relative path to your worker
// Optionally you can set this path as a variable

const assert = require('assert')
```

Now our testing will reflect a much more similar experience to developing Workers. A simple set of tests could look like:

```javascript
describe('Worker Test', function() {
  it('returns a body that says The Sum is 4', async function() {
    let url = new URL('https://worker.example.com')
    let req = new Request(url)
    let res = await handleRequest(req)
    let body = await res.text()
    assert.equal(body, 'The Sum is 4!')
  })

  it('does addition properly', async function() {
    let res = await addition(1, 1)
    assert.equal(res, 2)
  })
})
```

And now you can run your tests with `npm test` from within your repository. As you can see above this technique allows you to unit test individual functions within a Worker.
