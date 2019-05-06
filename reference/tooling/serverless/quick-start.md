# Quick Start

##### Auth

You will also need to set your Global API key from Cloudflare as an environmental variable named `CLOUDFLARE_AUTH_KEY`, and your Cloudflare account email as an environmental variable named `CLOUDFLARE_AUTH_EMAIL`. You can get your Global API key from your [Cloudflare profile](https://dash.cloudflare.com/profile) page. Unlike `accountId` this will always be the API key that *you* are signed in on, not necassarily the account the owns the zone. For more information see [Where do I find my API key?](<https://support.cloudflare.com/hc/en-us/articles/200167836)

Environmental variables are variables that live inside your terminal.

For Mac and Linux users, you can set environmental variables like this:

```bash
export CLOUDFLARE_AUTH_KEY=YOUR_API_KEY_HERE
export CLOUDFLARE_AUTH_EMAIL=YOUR_CLOUDFLARE_EMAIL
```

And for Windows (CMD) users, you can set environmental variables like this:

```bash
set CLOUDFLARE_AUTH_KEY=YOUR_API_KEY_HERE
set CLOUDFLARE_AUTH_EMAIL=YOUR_CLOUDFLARE_EMAIL
```

You’ll need to redefine your environmental variables each time you open a new terminal. Optionally, you can set the environment variables in your [`serverless.yml`](TODO link)

When you deploy with the Framework by running `serverless deploy`, everything in `serverless.yml` is deployed at once.