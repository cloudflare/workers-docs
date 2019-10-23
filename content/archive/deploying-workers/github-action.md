---
title: GitHub Actions
weight: 50
---

[GitHub Actions](https://developer.github.com/actions/) allow you to run arbitrary commands in reaction to GitHub events.

Cloudflare's official action will auto-deploy a Worker for you in reaction to a GitHub event (i.e. 'push to master').

### Additional Documentation

Our [blog post](https://blog.cloudflare.com/deploying-workers-with-github-actions-serverless/) describes the underpinning of the Action itself and gives a high level configuration overview.

Check out the [REAMDE](https://github.com/cloudflare/serverless-action/blob/master/README.md) for a more in depth explanation of how to configure the Action.

Find us on the [GitHub Marketplace](https://github.com/marketplace/actions/github-action-for-cloudflare-workers) to get started!

### Quick Overview of GitHub Actions

The output of an Action configuration will result in a `main.workflow` file, which is used by GitHub to run your Actions. It is added to the `.github` directory GitHub adds to your repo when you configure Actions. This file could look like:

```hcl
workflow "Deploy Worker" {
  on = "push"
  resolves = ["Deploy Worker"]
}

action "Deploy Worker" {
  uses = "cloudflare/serverless-action@master"
  env = {
    CLOUDFLARE_AUTH_EMAIL = "email@example.com"
    CLOUDFLARE_ZONE_ID = "$CLOUDFLARE_ZONE_ID"
    CLOUDFLARE_ACCOUNT_ID = "$CLOUDFLARE_ACCOUNT_ID"
    CLOUDFLARE_SCRIPT_NAME = "hello-world"
  }
  secrets = ["CLOUDFLARE_AUTH_KEY"]
}
```

Environmental variables can be edited directly in the `main.workflow` file, or passed to the Action through the GUI GitHub makes available.

### Step By Step Guide

Right now GitHub Actions are in Beta, and can only be enabled on a private repository. If Actions are enabled on your account, in a private repo, you will see an extra tab available called `Actions`. Go ahead and click on this.

![GitHub Action Step 1](/archive/static/step-1-action-signup.png)

On the next screen, click on the `Create a new workflow` button in the top left. This will open the config panel on the right hand side which says `Choose Action`.

Search for `cloudflare/serverless-action@master` in the `uses` search box and click `use`.

![GitHub Action Step 2](/archive/static/step-2-action-signup.png)

Next, the config panel will populate with the Action name, 'GitHub Action for Cloudflare Workers'.

![GitHub Action Step 3](/archive/static/step-3-action-signup.png)

Scroll down in this panel and you'll have the opportunity to add both secrets and `ENV` variables. You will need to add a number of `ENV `variables including:

```hcl
CLOUDFLARE_AUTH_EMAIL = "email@example.com"
CLOUDFLARE_ZONE_ID = "$CLOUDFLARE_ZONE_ID"
CLOUDFLARE_ACCOUNT_ID = "$CLOUDFLARE_ACCOUNT_ID"
CLOUDFLARE_SCRIPT_NAME = "hello-world"
```

And one secret the `CLOUDFLARE_AUTH_KEY`, which is your global API key. When you've completed the set up it should look like:

![GitHub Action Step 4](/archive/static/step-4-action-signup.png)

[Here](https://support.cloudflare.com/hc/en-us/articles/200167836-Where-do-I-find-my-Cloudflare-API-key-) is a link to a support article on how to get your API key. You can pull the account/zone information either from the `Overview` tab in the UI, or from our [API](https://api.cloudflare.com/).




From there simply commit the change to your `main.workflow` file. In the top right.

![GitHub Action Step 5](/archive/static/step-5-action-signup.png)

And you should be all set.  Check out the [README](https://github.com/cloudflare/serverless-action/blob/master/README.md) for more info!
