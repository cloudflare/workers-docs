---
title: "KV Namespaces"
alwaysopen: false
---

This page details how to bind a [KV Namespace](../../../kv) to a script.

In [Resource Bindings API](..) we describe how to use the upload script endpoint to upload a script with resource bindings.

We ultimately formed this command to do so:
```bash
curl -X PUT "https://api.cloudflare.com/client/v4/zones/:zone_id/workers/script" \  # for multi-script, .../workers/scripts/:script_name
  -H "X-Auth-Email:YOUR_CLOUDFLARE_EMAIL" \
  -H "X-Auth-Key:ACCOUNT_AUTH_KEY" \
  -F "metadata=@metadata.json;type=application/json" \
  -F "script=@script.js;type=application/javascript"
```
where `metadata.json` contains
```json
{
  "body_part": "script",
  "bindings": []
}
```
and `script.js` contains our script.

Let's say we would like to provide our script with a KV Namespace. We would like to access this namespace from a JavaScript object named `myNamespace`. Our script would look like
```js
// script.js

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const key = 'some-key'
  const value = await myNamespace.get(key)  // here's our namespace
  return new Response(value)
}
```

This is all well and good, but we haven't yet defined the `myNamespace` variable. We still need to bind it to the KV Namespace resource.

We do this by adding an element to `bindings` in our `metadata.json`:
```json
{
  "body_part": "script",
  "bindings": [
    {
      "type": "kv_namespace",
      "name": "myNamespace",
      "namespace_id": ":namespace_id"
    }
  ]
}
```

`type` must always be `kv_namespace` to declare the binding as a KV Namespace binding. `name` is the variable name we use in our script. `namespace_id` in the same ID used in the [KV Namespace API](../../../kv/api). All three fields are required to define a KV Namespace binding. Note that other types of bindings may require a different set of fields.

With this in place we can run our command
```bash
curl -X PUT "https://api.cloudflare.com/client/v4/zones/:zone_id/workers/script" \  # for multi-script, .../workers/scripts/:script_name
  -H "X-Auth-Email:YOUR_CLOUDFLARE_EMAIL" \
  -H "X-Auth-Key:ACCOUNT_AUTH_KEY" \
  -F "metadata=@metadata.json;type=application/json" \
  -F "script=@script.js;type=application/javascript"
```
to upload our script with its KV Namespace binding.
