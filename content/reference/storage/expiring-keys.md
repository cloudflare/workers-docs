---
title: "Expiring Keys"
weight: 60
---

Many common uses of Workers KV involve writing keys that are only meant to be
valid for a certain amount of time. Rather than requiring applications to
remember to delete such data at the appropriate time, Workers KV offers the
ability to create keys that automatically expire, either at a particular point
in time or after a certain amount of time has passed since the key was last
modified.

This page covers how to create such keys and, after creating them, introspect on
when they're due to expire.

As always, for full documentation of the Workers KV HTTP API, see the
[Cloudflare API documentation](https://api.cloudflare.com/#workers-kv-namespace-properties).

## How expiring keys work

The core behavior of an expiring key is that once its expiration time has been
reached, attempts to read it will behave as if the key does not exist.
Attempting to get the key's value will return a promise that resolves to null in
a Worker or a 404 HTTP response via the API, and listing keys using the API will
omit any expired keys from the response.

You can choose one of two ways to specify when a key should expire:

- Set its "expiration", using an absolute time specified in a number of [seconds
   since the UNIX epoch](https://en.wikipedia.org/wiki/Unix_time). For example,
   if you wanted a key to expire at 12:00AM
    UTC on April 1, 2019, you would set the key's expiration to 1554076800.
- Set its "expiration TTL" (time to live), using a relative number of seconds
    from the current time. For example, if you wanted a key to expire 10 minutes
    after creating it, you would set its expiration TTL to 600.

Both of these options are usable when writing a key inside a Worker or when
writing keys using the API.

Note that expiration times of less than 60 seconds in the future or expiration
TTLs of less than 60 seconds are not supported at this time.

## Creating expiring keys from a Worker

As explained on the [KV API page](../api/#write-value), you can write to a KV
namespace that has been bound into a Worker at the variable `NAMESPACE` by
calling:

`NAMESPACE.put(key, value)`

However, this call also has an optional third parameter. It accepts an object
with optional fields that allow you to customize the behavior of the `put`. In
particular, you can set either `expiration` or `expirationTtl`, depending on how
you would like to specify the key's expiration time. In other words, you'd run
one of the two commands below to set an expiration when writing a key from
within a Worker:

`NAMESPACE.put(key, value, {expiration: secondsSinceEpoch})`

`NAMESPACE.put(key, value, {expirationTtl: secondsFromNow})`

These assume that `secondsSinceEpoch` and `secondsFromNow` are variables defined
elsewhere in your Worker code.

## Creating expiring keys using the API

Assuming you have followed the instructions on the
[Writing Data page]({{<ref "writing-data.md" >}}) to learn how to write keys
that don't expire, only one modification is needed to the commands outlined
there if you'd like the keys you create to have an expiration. You just have to
specify either an `expiration` or an `expiration_ttl` as a query parameter,
meaning you'd do your PUT to a URL like one of the two below:

`https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/storage/kv/namespaces/$NAMESPACE_ID/values/first-key?expiration=$SECONDS_SINCE_EPOCH`

`https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/storage/kv/namespaces/$NAMESPACE_ID/values/first-key?expiration_ttl=$SECONDS_FROM_NOW`

## Determining when a key expires

What if you've already created a key but have forgotten when you set it to
expire?

You cannot currently get this information from inside of a Worker. If you want
to know when your keys are going to expire, you will need to use the HTTP API to
either [get a single key-value
pair](https://api.cloudflare.com/#workers-kv-namespace-read-key-value-pair) or
[list your namespace's
keys](https://api.cloudflare.com/#workers-kv-namespace-list-a-namespace-s-keys).

When reading a single key-value pair from the API, the absolute expiration time
of the key will be returned in the "Expiration" header if the key is set to
expire. The header will be absent if the key will never expire.

When listing the keys in a namespace, the expiration times for each listed key
will be returned alongside the name of the key, as outlined in the [full API
documentation](https://api.cloudflare.com/#workers-kv-namespace-list-a-namespace-s-keys).
