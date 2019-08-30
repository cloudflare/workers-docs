---
title: "Binding WebAssembly modules"
alwaysopen: false
---

This page details how to bind a WebAssembly (WASM) Module to a script.

In [Resource Bindings API](..) we describe how to use the upload script endpoint to upload a script with resource bindings.

We ultimately formed this command to do so:
{{<highlight bash>}}
curl -X PUT "https://api.cloudflare.com/client/v4/zones/:zone_id/workers/script" \  # for multi-script, .../workers/scripts/:script_name
  -H "X-Auth-Email:YOUR_CLOUDFLARE_EMAIL" \
  -H "X-Auth-Key:ACCOUNT_AUTH_KEY" \
  -F "metadata=@metadata.json;type=application/json" \
  -F "script=@script.js;type=application/javascript"
{{</highlight>}}
where `metadata.json` contains
{{<highlight json>}}
{
  "body_part": "script",
  "bindings": []
}
{{</highlight>}}
and `script.js` contains our script.

Let's say we would like to provide our script with a WASM Module. First, you will need to submit the metadata for its binding.

For example, here we’ll be storing the following metadata in metadata.json

{{<highlight json>}}
{
  "body_part": "script",
  "bindings": [
    {
      "name": "mywasm",
      "type": "wasm_module",
      "part": "wasmprogram"
    }
  ]
}
{{</highlight>}}

where the binding's fields are:

 - `name`: the name of the variable that will be used in the script. For example, if the name is defined as `mywasm`, the function will be called as such.
 - `type`: the type for uploading WebAssembly modules will always be `wasm_module`.
 - `part`: the name of the `multipart/form-data` part that contains the WebAssembly file (such as mywasm.wasm).


Example:

In the example below, we will be uploading a WebAssembly module called `isqrt` which defines an inverse square root.

First, I define my metadata in `metadata_wasm.json`.

metadata_wasm.json:

{{<highlight json>}}
{
  "body_part": "script",
  "bindings": [
    {
      "name": "isqrt",
      "type": "wasm_module",
      "part": "wasmprogram"
    }
  ]
}
{{</highlight>}}

In my Worker, I instantiate the WebAssembly module instance I will be using.
{{<highlight javascript>}}
let instance = new WebAssembly.Instance(isqrt, {})
{{</highlight>}}

To utilize the function defined by the WASM module, I then use `instance.exports` (which from my module includes the  `_Z7Q_rsqrtf` function:

{{<highlight javascript>}}
let squareroot = instance.exports._Z7Q_rsqrtf(number)
{{</highlight>}}

Full Worker (script_sqrt.js):
{{<highlight javascript>}}
let instance = new WebAssembly.Instance(isqrt, {})

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  let squareroot = instance.exports._Z7Q_rsqrtf(1)
  return new Response(squareroot, {status: 200})
}
{{</highlight>}}

API call:

In the API call to upload the script, I attach:

 - metadata: to define the bindings I will be sending through.
 - the [WASM file](/archive/api/resource-bindings/isqrt.wasm)
 - the script itself

Non-Enterprise API:
{{<highlight bash>}}
curl -sv -X PUT "https://api.cloudflare.com/client/v4/zones/:zone_id/workers/script" \
-H "X-Auth-Email:YOUR_CLOUDFLARE_EMAIL" \
-H "X-Auth-Key:ACCOUNT_AUTH_KEY" \
-F 'metadata=@metadata_wasm.json;type=application/json' \
-F 'wasmprogram=@isqrt.wasm;type=application/wasm' \
-F 'script=@script_sqrt.js;type=application/javascript'
{{</highlight>}}

Enterprise API:
{{<highlight bash>}}
curl -sv -X PUT "https://api.cloudflare.com/client/v4/accounts/:account_id/workers/scripts/sqrt" \
-H "X-Auth-Email:YOUR_CLOUDFLARE_EMAIL" \,
-H "X-Auth-Key:ACCOUNT_AUTH_KEY" \
-F 'metadata=@metadata_wasm.json;type=application/json' \
-F 'wasmprogram=@isqrt.wasm;type=application/wasm' \
-F 'script=@script_sqrt.js;type=application/javascript'
{{</highlight>}}
