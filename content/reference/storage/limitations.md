---
title: 'Limitations'
weight: 80
---

Workers KV supports:

- Up to 100 Namespaces per account
- Unlimited keys per Namespace (billions supported)
- Keys of up to 512 bytes
- Values of up to 2 MB
- Unlimited (100k+) reads per second per key
- Up to one write per second per key

If your application requires higher limits, please [let us know](https://support.cloudflare.com).

Workers KV read performance is determined by the amount of read-volume a given key receives. Maximum performance for a key is not reached unless that key is being read at least a couple times per minute in any given data center.

Workers KV is an eventually consistent system, meaning that reads will sometimes reflect an older state of the system. While writes will often be visible globally immediately, it can take up to 60 seconds before reads in all edge locations are guaranteed to see the new value.
