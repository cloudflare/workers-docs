---
title: 'Secrets'
weight: 2
---

Once a secret is uploaded via [wrangler](/tooling/wrangler/secret) or in the UI, the string is exposed on the global namespace as type [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

Example where `SECRET` is set  and then set as a header `Auth` in a fetch.

```javascript
let headers = new Headers({ Auth: SECRET })
```
