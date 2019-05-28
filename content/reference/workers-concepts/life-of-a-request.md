---
Title: Life of a Request in the Workers Runtime
---

# The Overview

* How the Workers runtime treats requests differently from regular ServiceWorkers
* How Workers measures time: CPU usage
* The `FetchEvent` lifecycle, and how it affects your Worker
* The `Request` context, and how it affects your Worker code
* How `fetch()` calls are handled from inside a Worker
* When does a Worker stop running?