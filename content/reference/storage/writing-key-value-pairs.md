---
title: 'Writing key-value pairs'
weight: 80
---

To create a new key-value pair, or to update the value for a particular key,
you can call the `put` method on any namespace you've bound to your script.
The basic form of this method looks like this:

`NAMESPACE.put(key, value)`

The type is automatically inferred from value, and can be any of:

- `string`
- `ReadableStream`
- `ArrayBuffer`

You can also [write key-value pairs from the command line with
Wrangler](/tooling/wrangler/kv_commands/#kv-key).

Finally, you can [write data via the
API](https://api.cloudflare.com/#workers-kv-namespace-write-key-value-pair).

Due to the eventually consistent nature of Workers KV, it's a common pattern
to write data via Wrangler or the API, but read the data from within a worker.

## Writing Data in Bulk

You can [write more than one key-value pair at a time with
wrangler](/tooling/wrangler/kv_commands/#kv-bulk) or [via the
API](https://api.cloudflare.com/#workers-kv-namespace-write-multiple-key-value-pairs), up to 10,000 KV pairs. A `key` and `value` are required for each KV pair. The entire request size must be less than 100 megabytes.
We do not support this from within a worker at this time.

## Expiring Keys

Many common uses of Workers KV involve writing keys that are only meant to be
valid for a certain amount of time. Rather than requiring applications to
remember to delete such data at the appropriate time, Workers KV offers the
ability to create keys that automatically expire, either at a particular
point in time or after a certain amount of time has passed since the key was
last modified.

The core behavior of an expiring key is that once its expiration time has
been reached, attempts to read it will behave as if the key does not exist.
Attempting to get the key's value will return a promise that resolves to null
in a Worker or a 404 HTTP response via the API, and listing keys using the
API will omit any expired keys from the response.

You can choose one of two ways to specify when a key should expire:

- Set its "expiration", using an absolute time specified in a number of
  [seconds since the UNIX epoch](https://en.wikipedia.org/wiki/Unix_time). For
  example, if you wanted a key to expire at 12:00AM UTC on April 1, 2019, you
  would set the key's expiration to 1554076800.
- Set its "expiration TTL" (time to live), using a relative number of seconds
  from the current time. For example, if you wanted a key to expire 10 minutes
  after creating it, you would set its expiration TTL to 600.

Both of these options are usable when writing a key inside a Worker or when
writing keys using the API.

Note that expiration times of less than 60 seconds in the future or
expiration TTLs of less than 60 seconds are not supported at this time.

### Creating expiring keys

We talked about the basic form of the `put` method above, but this call also
has an optional third parameter. It accepts an object with optional fields
that allow you to customize the behavior of the `put`. In particular, you can
set either `expiration` or `expirationTtl`, depending on how you would like
to specify the key's expiration time. In other words, you'd run one of the
two commands below to set an expiration when writing a key from within a
Worker:

`NAMESPACE.put(key, value, {expiration: secondsSinceEpoch})`

`NAMESPACE.put(key, value, {expirationTtl: secondsFromNow})`

These assume that `secondsSinceEpoch` and `secondsFromNow` are variables
defined elsewhere in your Worker code.

You can also [write with an expiration on the command line via
Wrangler](/tooling/wrangler/kv_commands/#kv-key) or [via the
API](https://api.cloudflare.com/#workers-kv-namespace-write-key-value-pair).
