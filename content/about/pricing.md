---
title: Pricing
weight: 4
---

Workers is now free to enable for all and are subject to some limits. To avoid the limits and enable KV, you can subscribe to the Workers Unlimited Plan for $5 USD per month for a account. Workers Unlimited plan is separate from any Cloudflare plan (Free, Professional, Business) you may have.

If you are an Enterprise customer, reach out to your account team to confirm pricing details.

[Limits](#limits)
- [KV](#kv)
- [Other](#other)
- [Behavior](#behavior)

## Limits 

To protect our systems against abuse there are surge limits in place for domains without subscriptions. 

Note only requests that hit a Worker script will be accounted for in the limits and in billing. Since Cloudflare Workers runs before the Cloudflare cache, the caching of a request still incurs costs. See definitions and behavior after a limit is hit for the free plan in the [limits article](/about/limits).

| Plan         | [CPU Limit](/about/limits/#cpu-execution-time-limit) | [Daily Request Limit](/about/limits/#daily-request-limit) | [Burst Rate Limit](/about/limits/#burst-rate-limit)         | Requests/month    |
| ------------ | --------- | ------------------- | ------------------------ | ----------------- |
| Free         | 10ms      | 100,000             | 1000 requests per minute | 10 million        |
| Unlimited    | 50ms      | none                | none                     | 10 million        |
| Additional\* | -         | -                   | -                        | $0.50 per million |


## KV 

Enabling Workers KV requires the Unlimited plan.

| Plan                 | Storage      | Reads/month       | Writes/month      | Deletes/month     | Lists/month       |
| -------------------- | ------------ | ----------------- | ----------------- | ----------------- | ----------------- |
| Free                 | -            | -                 | -                 | -                 | -                 |
| Unlimited (Included) | 1 GB         | 10 million        | 1 million         | 1 million         | 1 million         |
| Additional*          | $0.50 per GB | $0.50 per million | $5.00 per million | $5.00 per million | $5.00 per million |

\* Unlimited plan only. The amount billed after the limit is hit

## Same features 

  Script size, number of scripts, subrequests, and available memory are not affected by plan type.




