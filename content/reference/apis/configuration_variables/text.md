---
title: 'Configuration Variables'
weight: 3
---

Once a configuration variable is uploaded via [wrangler](/tooling/wrangler/configuration) or in the UI, the string is exposed on the global namespace as type [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

```
if (ENVIRONMENT === "staging") {
  // staging-specific code
} else if (ENVIRONMENT === "production" {
  // production-specific code
}
```

Caveats:

- Configuration variables are not shared between scripts. Use [environments](/tooling/wrangler/configuration/environments) in [Wrangler](https://github.com/cloudflare/wrangler) to configure multiple configuration variables for one script
