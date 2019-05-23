---
title: "Limitations"
weight: 80
---

{{% notice info %}}
During the early access period, all users are limited to 1 GB of storage.
More storage will be available for purchase when KV enters general availability.
{{% /notice %}}

Workers KV supports:

- Up to 20 Namespaces per account
- Up to 1 billion keys per Namespace
- Keys of up to 512 bytes
- Values of up to 2 MB
- Unlimited (100k+) reads per second per key
- Up to one write per second per key

If your application requires higher limits, please [let us know](https://support.cloudflare.com).

Workers KV read performance is determined by the amount of read-volume a given
key receives. Maximum performance for a key is not reached unless that key is
being read at least a couple times per minute in any given data center.
