---
title: 'Namespaces'
weight: 80
---

While Workers KV is an account-level feature, you may not want every
key-value pair to be globally available. You can create up to a hundred
*namespaces* in your account, and then bind that namespace to your script. The
script will then only have access to that specific namespace, and will read
keys from and write keys to it, specifically.

## Creating a namespace

You can [create a KV namespace with
Wrangler](/tooling/wrangler/kv_commands/#kv-namespace).

You can also [create a KV namespace in the
dashboard](https://dash.cloudflare.com/?account=workers/kv/namespaces):

---

![Create a Namespace](/reference/media/create-namespace.png)

---

Or [via the API](https://api.cloudflare.com/#workers-kv-namespace-create-a-namespace).

## Binding your namespace to a worker

After you've created a namespace, you must bind it to your Worker. This will
make that namespace accessible from within the Worker via a variable name
you specify.

This will automatically happen on `wrangler publish` if you've [configured
your namespace with
Wrangler](/tooling/wrangler/kv_commands/#concepts).

This can also be done from within the editor:

&nbsp;

![Bind a Namespace](/reference/media/bind-namespace.png)

---

&nbsp;

Or, [via the API when you upload a
script](/archive/api/resource-bindings/kv-namespaces/).
