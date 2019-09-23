---
title: Start from an Existing Worker
alwaysopen: true
weight: 4
---

If you have a pre-existing Worker project, you can use Workers Sites to add static asset serving to the Worker. To do so, follow these instructions:

1. Create a directory in the root of your project and add configuration to your `wrangler.toml` to point to it. Also add the path to your Worker script (probably `index.js`).

```toml
# Wrangler.toml

[site]
bucket = "<your dirname here>" # <-- Add the name of the dir that contains your static assets
entry-point = "."

```

2. Add the `@cloudflare/kv-asset-handler` package to your project:

```
npm i @cloudflare/kv-asset-handler
```

3. Import the package's code into your Worker script, and use it in the handler you'd like to respond with static assets:

```
import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

addEventListener("fetch", event => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
  try {
    return await getAssetFromKV(event);
  } catch (e) {
    let pathname = new URL(event.request.url).pathname;
    return new Response(`"${pathname}" not found`, {
      status: 404,
      statusText: "not found"
    });
  }
}
```

4. You should now be all set you can run `preview` or `publish` as you would normally with your Worker project!
