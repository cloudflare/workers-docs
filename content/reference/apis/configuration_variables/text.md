---
title: 'Text Variables'
weight: 3
---

Once a text variable is set using [wrangler](/tooling/wrangler/configuration) or in the UI, it becomes available to your Worker script as a string.

```
if(TEXT_VARIABLE === "staging"){....}
```

Caveats:

- Text variables are not shared amongst scripts. Use [environments](/tooling/wrangler/configuration/environments) in wrangler to configure multiple variables on one project

