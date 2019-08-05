---
title: "Resource Bindings API"
alwaysopen: false
weight: 60
---

Bindings are a way to expose external resources to a script that can be managed outside the script code (currently: WebAssembly and KV - stay tuned for more!).

To upload bindings, use the [script upload endpoint](../../api#endpoints) with a `multipart/form-data` request body, as follows.

Every such body has at least two parts: the script itself, and a JSON definition of its metadata. The metadata follows this schema:
```
{
  "body_part": string,
  "bindings": array,
}
```
where each element of `bindings` defines a resource binding. There are different types of resource bindings, each with their own definition schema. We'll get into that later.

The `body_part` attribute is a reference to the request body part that contains the script itself. This is best explained with an example. Let's say we have written our metadata as such:
```
// metadata.json

{
  "body_part": "script",
  "bindings": []
}
```
Note this metadata does not define any bindings. We'll add some soon.

This metadata does declare that the script body will be found in a part named `script`. The metadata itself must always be in a part named `metadata`. So, if we have our script saved to a local file `script.js`, we issue our request with:
```
curl -X PUT "https://api.cloudflare.com/client/v4/zones/:zone_id/workers/script" \  # for multi-script, .../workers/scripts/:script_name
  -H "X-Auth-Email:YOUR_CLOUDFLARE_EMAIL" \
  -H "X-Auth-Key:ACCOUNT_AUTH_KEY" \
  -F "metadata=@metadata.json;type=application/json" \
  -F "script=@script.js;type=application/javascript"
```

And that's it! We have child pages detailing each kind of resource binding and how to add it to this command. Please consult them to add the resource bindings you need.
