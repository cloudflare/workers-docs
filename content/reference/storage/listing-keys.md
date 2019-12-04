---
title: 'Listing keys'
weight: 80
---

You can use a list operation to see all of the keys that live in a given
namespace. Here's a basic example:

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const value = await NAMESPACE.list()

  return new Response(value.keys)
}
```

You can also [list keys on the command line with Wrangler](https://developers.cloudflare.com/workers/tooling/wrangler/kv_commands/#kv-key) or [via the API](https://api.cloudflare.com/#workers-kv-namespace-list-a-namespace-s-keys).

## More detail

The `list` method has this signature (in TypeScript):

`Namespace.list({prefix?: string, limit?: number, cursor?: string})`

All arguments are optional:

* `prefix` is a string that represents a prefix you can use to filter all keys.
* `limit` is the maximum number of keys returned. The default is 1000, which is
  the maximum. It is unlikely that you will want to change this default, but
  it is included for completeness.
* `cursor` is a string used for paginating responses. See below for more.

The `.list` method returns a promise which resolves with an object that looks
like this:

```json
{
  keys: [{ name: "foo", expiration: 1234}],
  list_complete: false,
  cursor: "6Ck1la0VxJ0djhidm1MdX2FyD"
}
```

The `keys` property will contain an array of objects describing each key.
That object will have two keys of its own: a `name` of the key, and its
expiration value. The name is a string, and the expiration value is a number.
The expiration value will only be returned if the key has an expiration, and
will be in the absolute value form, even if it was set in the TTL form.

Additionally, if `list_complete` is `false`, there are more keys to fetch.
You'll use the `cursor` property to get more keys. See the Pagination section
below for more details.

## Listing by prefix

You can also list all of the keys starting with a particular prefix. For
example, say you've structured your keys with a user, a user id, and then
some key names, separated by colons. You could get the keys for user number
one by doing this:

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const value = await NAMESPACE.list({"prefix": "user:1:"})

  return new Response(value.keys)
}
```

This will return all of the keys that start with `"user:1:"`.

## Ordering

Keys are always returned in lexicographically sorted order according to their UTF-8 bytes.

## Pagination

If you have more keys than the `limit` value, only that many will be returned. Additionally, the
`list_complete` key will be set to `false`, and a `cursor` will also be returned. In this case,
you can call `list` again with the `cursor` value to get the next set of keys:

```js
const value = await NAMESPACE.list()

const cursor = value.cursor

const next_value = await NAMESPACE.list({"cursor": cursor})
```