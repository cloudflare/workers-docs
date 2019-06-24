---
title: 'Listing Keys'
weight: 20
---

You can list all of the keys in a given namespace:

{{<highlight javascript>}}
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const value = await NAMESPACE.list()

  return new Response(value.keys)
}
{{</highlight>}}

If the number of keys is large, the result may be paginated, see below for
more details.

You can also list all of the keys starting with a particular prefix. For
example, say you've structured your keys with a user, a user id, and then
some key names, separated by colons. You could get the keys for user number
one by doing this:

{{<highlight javascript>}}
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const value = await NAMESPACE.list({"prefix": "user:1:"})

  return new Response(value.keys)
}
{{</highlight>}}


This will return all of the keys that start with `"user:1:"`.

### Types

The full signature of the `list` method (in TypeScript) is:

`Namespace.list({prefix?: string, limit?: number, cursor?: string})`

All arguments are optional:

* `prefix` is a string that representes a prefix you can use to filter all keys.
* `limit` is the maximum number of keys returned. The default is 1000, which is
  the maximum. It is unlikely that you will want to change this default, but
  it is included for completeness.
* `cursor` is a string used for paginating responses. See below for more.

### Return Value

The `.list` method returns a promise which resolves with an object that looks like this:

{{<highlight json>}}
{
  keys: [{ name: "foo", expiration: 1234}],
  list_complete: false,
  cursor: "6Ck1la0VxJ0djhidm1MdX2FyD"
}
{{</highlight>}}

The `keys` property will contain an array of objects describing each key. That object will have
two keys of its own: a `name` of the key, and its expiration value. The name is a string, and the
expiration value is a number.

Additionally, if `list_complete` is `false`, there are more keys to fetch.
See the next section for more details.

### Pagination

If you have more keys than the `limit` value, only that many will be returned. Additionally, the
`list_complete` key will be set to `false`, and a `cursor` will also be returned. In this case,
you can call `list` again with the `cursor` value to get the next set of keys:

{{<highlight javascript>}}
const value = await NAMESPACE.list()

const cursor = value.cursor

const next_value = await NAMESPACE.list({"cursor": cursor})
{{</highlight>}}