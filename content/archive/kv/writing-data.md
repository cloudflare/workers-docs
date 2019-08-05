---
title: "Writing Data"
weight: 10
---

KV is organized into Namespaces, each of which can
store up to a billion key-value pairs. The keys and values are both
allowed to be arbitrary byte sequences (with a few
[exceptions]({{< ref "api.md" >}})), but we most commonly see values stored as
strings or JSON blobs.

Worker KV values are often written using our API, but can also be written
directly from a Worker. All values are encrypted at rest with 256-bit AES-GCM,
and only decrypted by the process executing your Worker scripts or responding to
your API requests.

### Writing Data

You will need a Cloudflare API key. If you don't already have one, you can
find it in the [Cloudflare Dashboard](https://support.cloudflare.com/hc/en-us/articles/200167836-Where-do-I-find-my-Cloudflare-API-key-).

You will also need your Account ID. You can find that ID in the URL of any
page you view within the Cloudflare Dashboard after selecting the account
which manages your Worker:

![Account ID Screenshot](/static/account-id-url.png)

Once you have an API key and Account ID, the first step is to create a Namespace:

{{<highlight bash>}}
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/storage/kv/namespaces" \
-X POST \
-H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
-H "X-Auth-Key: $CLOUDFLARE_AUTH_KEY" \
-H "Content-Type: application/json" \
--data '{"title": "My First Namespace"}'
{{</highlight>}}

The response to that request will include the ID of your new Namespace. Use
that ID to write your first KV pair:

{{<highlight bash>}}
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/storage/kv/namespaces/$NAMESPACE_ID/values/first-key" \
-X PUT \
-H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
-H "X-Auth-Key: $CLOUDFLARE_AUTH_KEY" \
--data 'My first value!'
{{</highlight>}}

You can also write from [inside a Worker](/kv/api/#write-value).

If you want the keys you write to be automatically deleted at some time in the
future, see the page on [expiring keys]({{<ref "expiring-keys.md" >}}).

You've now written data to Workers KV! Learn about
[reading data from a Worker]({{< ref "reading-data.md" >}}).
