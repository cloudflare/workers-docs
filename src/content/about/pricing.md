---
title: Pricing
weight: 4
---

Workers is now free to enable for all, and are subject to some limits. 

## Unlimited 
To avoid the limits and enable KV, you can subscribe to the Workers Unlimited plan for **$5 USD per month for an account**. 

With the Workers Unlimited plan, requests beyond the included quota will be charged at **$0.50/million requests**.

### Fine Print

Workers Unlimited plan is separate from any other Cloudflare plan (Free, Professional, Business) you may have. If you are an Enterprise customer, reach out to your account team to confirm pricing details.

Only requests that hit a Worker script will count against your limits and your bill. Since Cloudflare Workers runs before the Cloudflare cache, the caching of a request still incurs costs. See definitions and behavior after a limit is hit in the [limits article](/about/limits).


## KV 

Enabling Workers KV requires the Unlimited plan.

| Plan                            | Storage      | Reads/month       | Writes/month      | Deletes/month     | Lists/month       |
| ------------------------------- | ------------ | ----------------- | ----------------- | ----------------- | ----------------- |
| Included                        | 1 GB         | 10 million        | 1 million         | 1 million         | 1 million         |
| Price beyond the included quota | $0.50 per GB | $0.50 per million | $5.00 per million | $5.00 per million | $5.00 per million |

## Same features 

  Script size, number of scripts, subrequests, and available memory are not affected by plan type.




