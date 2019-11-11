---
title: 'API'
weight: 50
---

The Cloudflare API is the best way to write data into Workers KV.

Read about [writing data](/reference/storage/writing-data/) for an introduction to our API.

For full documentation of all Workers KV API methods, see the [Cloudflare API documentation](https://api.cloudflare.com/#workers-kv-namespace-properties).

## Endpoints

All endpoints begin with `https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID`. The Account ID should represent the account which manages the Workers you would like to be able to interact with this data.

You can find your Account ID in the URL of any page within the Cloudflare Dashboard after selecting the appropriate account:

![Account ID Screenshot](/reference/media/account-id-url.png)

All requests must contain your
[API Credentials](https://support.cloudflare.com/hc/en-us/articles/200167836-Where-do-I-find-my-Cloudflare-API-key-) as well.

### Namespaces

A Namespace is a container for key-value pairs in your account. By default you can create up to one hundred Namespaces within your account, and each Namespace can contain up to one billion key-value pairs.

#### Create a Namespace

`POST /storage/kv/namespaces/`

Create a new Namespace (a container for key-value pairs)

##### Request Body

The title is used to help you identify this namespace and must be unique within your account.

{{<highlight JSON>}}
  { "title": "a user-defined title" }
{{</highlight>}}

###### Example Request

{{<highlight bash>}}
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/storage/kv/namespaces" \
  -X POST \
  -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
  -H "X-Auth-Key: $CLOUDFLARE_AUTH_KEY" \
  -H "Content-Type: application/json" \
  --data '{"title": "My First Namespace"}'
{{</highlight>}}

##### Response Body

{{<highlight JSON>}}
{
  "id": "Assigned ID",
  "title": "a user-defined title"
}
{{</highlight>}}

#### List Namespaces

`GET /storage/kv/namespaces/`

List the Namespaces in your account. Namespaces are shared between all of the Cloudflare sites on your account.

##### Response Body

{{<highlight JSON>}}
[
  {
    "id": "Random ID",
    "title": "a user-defined title"
  },
  ...
]
{{</highlight>}}

#### Delete a Namespace

`DELETE /storage/kv/namespaces/:namespace_id`

Delete a Namespace and remove access to the underlying data

#### Rename a Namespace

`PUT /storage/kv/namespaces/:namespace_id`

Change the user-facing name of a Namespace. Must be unique within your account.

##### Request Body

{{<highlight JSON>}}
{
  "title": "a user-defined title"
}
{{</highlight>}}

### Keys and Values

Your data is stored as Key-Value pairs. Each key can be up to 512 bytes. Values can, by default, be up to 2 MB.

Keys can be composed of any printable character, but given their use in URLs we recommend avoiding the question mark (`?`) and hash (`#`) literals.

#### Read Value

`GET /storage/kv/namespaces/:namespace_id/values/:key`

KV pairs are most commonly read from Workers, this API is not suitable for
high-performance applications.

##### Response Body

The exact byte-for-byte data which was stored as the value.

#### Write Key-Value

`PUT /storage/kv/namespaces/:namespace_id/values/:key`

Store a KV pair. Existing values will be overwritten.

##### Request Body

The exact byte-for-byte data you intend to store as the value.

#### Bulk Write Key-Values

`PUT /storage/kv/namespaces/:namespace_id/bulk`

Store multiple KV pairs. Existing values will be overwritten.

##### Request Body

The bulk write request body must be a JSON array containing one object per KV pair. A `key` and `value` are required for each KV pair.

You can optionally expire keys by adding an `expiration` (seconds since the UNIX epoch) or `expiration_ttl` (relative seconds from now) key per KV pair.

If you need to write binary data, you'll have to base64 encode the value so that it is valid JSON and set the `base64` key to true so
that the value is decoded before being stored. Reads of the value will return the raw (base64 decoded) bytes.

{{<highlight JSON>}}
[
  {
    "key": "my-key",
    "value": "my-value"
  },
  {
    "key": "my-other-key",
    "value": "aGVsbG8gd29ybGQ=",
    "base64": true
  }
]
{{</highlight>}}

###### Example Request

{{<highlight bash>}}
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/storage/kv/namespaces/$NAMESPACE_ID/bulk" \
  -X PUT \
  -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
  -H "X-Auth-Key: $CLOUDFLARE_AUTH_KEY" \
  -H "Content-Type: application/json" \
  --data '[{"key": "my-key", "value": "my-value"}, {"key": "my-other-key", "value": "aGVsbG8gd29ybGQ=", "base64": true}]'
{{</highlight>}}

#### Delete Key-Value

`DELETE /storage/kv/namespaces/:namespace_id/values/:key`

Remove a KV pair from the specified Namespace.

#### Bulk Delete Key-Values

`DELETE /storage/kv/namespaces/:namespace_id/bulk`

Remove multiple KV pairs.

##### Request Body

The bulk delete request body must be a JSON array of keys to delete.

{{<highlight JSON>}}
[
  "my-key",
  "my-other-key"
]
{{</highlight>}}

###### Example Request

{{<highlight bash>}}
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/storage/kv/namespaces/$NAMESPACE_ID/bulk" \
  -X DELETE \
  -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
  -H "X-Auth-Key: $CLOUDFLARE_AUTH_KEY" \
  -H "Content-Type: application/json" \
  --data '["my-key", "my-other-key"]'
{{</highlight>}}

#### List Keys

`GET /storage/kv/namespaces/:namespace_id/keys`

List the keys within a Namespace in sorted order. This endpoint is paginated.

## Worker API

Within a Worker you are given a three-method API to interact with Namespaces. First you use the Worker API or UI to bind your Namespace into the Worker of your choice with a provided variable name.

In these examples that variable name is `NAMESPACE`:

#### Read Value

`NAMESPACE.get(key, [type])`

The method returns a promise you can `await` to get the value. If the key
is not found, the promise will resolve with the literal value `null`.

Type can be any of:

- `"text"` (default)
- `"json"`
- `"arrayBuffer"`
- `"stream"`

#### Write Value

You can write and delete values from a Worker, but you should note that it is an eventually consistent data store. In practice, this means it is not uncommon for an edge location to continue returning an old value for up to a minute after that key is written in some other edge location. If, after considering that, it makes sense to write values from your Worker, the API is:

`NAMESPACE.put(key, value)`

The type is automatically inferred from value, and can be any of:

- string
- ReadableStream
- ArrayBuffer

If you want the keys you write to be automatically deleted at some time in the future, see the page on [expiring keys](/reference/storage/expiring-keys/).

#### Delete Value

`NAMESPACE.delete(key)`

As with all updates, deletes can take up to ten seconds to propagate globally.

#### List Keys

`NAMESPACE.list({ [prefix], [limit], [cursor] })`

Like with the `get` method, the `list` method returns a promise you can `await` to get the value. The promise resolves to an object that looks like this:

```
{
  keys: [{ name: "foo", expiration: 1234}],
  list_complete: false,
  cursor: "6Ck1la0VxJ0djhidm1MdX2FyD"
}
```

For more information about listing keys, and pagination using `cursor` and `list_complete`, see the page [listing keys](/reference/storage/listing-keys/).

<style>
h4 !important {
  font-size: 1rem;
}
</style>
