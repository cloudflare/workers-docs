---
title: 'Reading key-value pairs'
weight: 80
---

To get the value for a given key, you can call the `get` method on any
namespace you've bound to your script:

`NAMESPACE.get(key)`

The method returns a promise you can `await` to get the value. If the key
is not found, the promise will resolve with the literal value `null`.

Here's an example of reading a key from within a Worker:

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const value = await FIRST_KV_NAMESPACE.get('first-key')
  if (value === null) {
    return new Response('Value not found', { status: 404 })
  }

  return new Response(value)
}
```

You can also [read key-value pairs from the command line with
wrangler](/tooling/wrangler/kv_commands/#kv-key).

Finally, you can also [read from the
API](https://api.cloudflare.com/#workers-kv-namespace-read-key-value-pair).

## Types

You can pass an optional `type` parameter to the `get` method as well:

`NAMESPACE.get(key, type)`

The `type` parameter can be any of:

- `"text"`: (default) a string
- `"json"`: an object decoded from a JSON string
- `"arrayBuffer"`: An [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) instance.
- `"stream"`: A [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream).

For simple values it often makes sense to use the default `"text"` type which
provides you with your value as a string. For convenience a `"json"` type is
also specified which will convert a JSON value into an object before
returning it to you. For large values you can request a `ReadableStream`, and
for binary values an `ArrayBuffer`.
