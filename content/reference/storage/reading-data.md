---
title: 'Reading Data'
weight: 20
---

The most performant way to read a KV value is directly from a Worker.

You must first [create a KV namespace](https://dash.cloudflare.com/?account=workers/kv/namespaces).

---

![Create a Namespace](/reference/media/create-namespace.png)

---

&nbsp;

After you've created a namespace, you must bind it to your Worker. This will make that Namespace accessible from within the Worker at the variable name you specify.

&nbsp;

![Bind a Namespace](/reference/media/bind-namespace.png)

---

&nbsp;

Once it is bound, reading a value is a single method call:

{{<highlight javascript>}}
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const value = await FIRST_KV_NAMESPACE.get("first-key")
  if (value === null) {
    return new Response("Value not found", {status: 404})
  }

  return new Response(value)
}
{{</highlight>}}

Read performance will generally get better the higher your read volume.

### Types

The full signature of the `get` method is:

`Namespace.get(key, [type])`

For simple values it often makes sense to use the default `"text"` type which provides you with your value as a string. For convenience a `"json"` type is also specified which will convert your value into an object before returning it to you. For large values you can request a ReadableStream, and for binary values an ArrayBuffer:

##### `"text"` (default)

A string.

##### `"json"`

An object decoded from a JSON string.

##### `"arrayBuffer"`

An [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) instance.

##### `"stream"`

A [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream).

### Return Value

The `.get` method returns a promise which resolves with either the value of your key with the type requested, or `null` if that key is not in the Namespace.
