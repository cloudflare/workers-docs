---
title: 'Secrets'
weight: 2
---

Once a secret is set using [wrangler](/tooling/wrangler/secret) or in the UI, it becomes available to your Worker script as its string value. 

Example where `SECRET` is set  and then set as a header `Auth` in a fetch.

```
let headers = new Headers({ Auth: SECRET })
```
