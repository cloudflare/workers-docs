## Overview

If you are an Enterprise customer, reach out to your account team to confirm pricing details.

Workers is now free to enable. To protect our systems against abuse there are surge limits in place for domains without subscriptions.

If a billing account has not yet been set up, once the limit is reached an error message will appear. Only requests that hit a Worker script will be accounted for in the limits and in billing. Since Cloudflare Workers runs before the Cloudflare cache, the caching of a request still incurs costs.



We do raise the[ CPU time limits based on your Cloudflare plan](https://workers.cloudflare.com/docs/reference/runtime/limits/).



------

## Cloudflare Workers surge limits

The following requests surge limits under the Free, Pro, and Business plans:

- 5,000 requests per 10 minutes
- 100,000 requests per 24 hours

### CPU Time Limits

- Free accounts: 10 ms
- Pro and Business accounts: 50ms 

### Workers KV limits

- 1 GB of data stored included
- 10 million read operations 
- 1 million write, list, and delete operations

For more on limits, review the [Workers documentation](https://support.cloudflare.com/hc/en-us/articles/ https://developers.cloudflare.com/workers/about/limits/).

------

## Cloudflare Workers subscription costs

To avoid the limits above, you can subscribe to Workers for $5 USD per month for your account. After a limit is hit, additional requests, storage, and operations are billed as follows:

- First 10M requests are included without surge limits, $0.50 per every following 1M requests

### Workers KV

- $0.50 per additional GB of storage
- $0.50 per 1M read operations
- $5 per each 1M write, list, and delete operations