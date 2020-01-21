---
title: 'Deleting key-value pairs'
weight: 80
---

To delete a key-value pair, you can call the `delete` method on any
namespace you've bound to your script:

`NAMESPACE.delete(key)`

This will remove the key and value from your namespace. As with any
operations, it may take some time to see that they key has been deleted from
various points at the edge.

This method returns a promise that you should `await` on in order to verify
successful deletion.

Here's an example of deleting a key from within a Worker:

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  await KV_NAMESPACE.delete("some-key")

  return new Response("Key successfully deleted")
}
```

You can also [delete key-value pairs from the command line with
Wrangler](/tooling/wrangler/kv_commands/#kv-key)
or [via the
API](https://api.cloudflare.com/#workers-kv-namespace-delete-key-value-pair).
