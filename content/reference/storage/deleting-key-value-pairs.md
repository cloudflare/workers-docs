---
title: 'Deleting key-value pairs'
weight: 80
---

To delete a key-value pair, you can call the `delete` method on any
namespace you've bound to your script:

`NAMESPACE.delete(key)`

This will remove the key and value from your namespace. As with any
operations, it may take some time to see that they key has been deleted from
various points at the edge.

You can also [delete key-value pairs from the
API](https://api.cloudflare.com/#workers-kv-namespace-delete-key-value-pair).