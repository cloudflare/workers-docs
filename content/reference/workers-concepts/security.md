---
title: Security
---

## Spectre

The V8 team's paper concerning the Spectre vulnerability is specific to the problem of securing a browser while implementing the full web platform. They have determined that they have no way to fully mitigate Spectre in userspace, so they have concluded their only option is to fall back on the OS's mitigations, via process isolation. However, it is not clear that process isolation fully mitigates Spectre either -- V8 is saying that it is their only option, given the constraints of the browser.

Fortunately, Cloudflare Workers is a very different environment, and we have other options. For example, the Workers API provides no local timers and no concurrency at all. This was a design decision we made intentionally, before we knew about Spectre, in order to mitigate timing side channels in general. Chrome cannot do this, because Chrome must continue to support the existing web platform API. Additionally, Workers has the freedom to reschedule isolates in order to disrupt attacks. Chrome cannot refresh a web page randomly because this would disrupt the user, but Workers are stateless and can be reset at any time.

Using these unique features of our environment, we have implemented mitigations against Spectre, and we are continuously strengthening these mitigations further over time. Because our approach is unique, we recognize that it needs additional outside research. To that end, we are working with security researchers at Graz Technical University -- one of the groups that originally discovered Spectre -- to put our defenses to the test.

For more details, please refer to [this talk](https://www.infoq.com/presentations/cloudflare-v8) by Kenton Varda, architect of Cloudflare Workers. Spectre is covered near the end. We will also be publishing more about our work and our research with TU Graz as it progresses.

