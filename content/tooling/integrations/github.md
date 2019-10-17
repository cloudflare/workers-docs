---
title: 'GitHub Actions'
new: true
---

# Deploy your Workers application with GitHub Actions

If you'd like to automate deploying your Workers application, we've published a GitHub Action to simplify the process. GitHub Actions allows you to build continuous integration workflows for your GitHub projects, and with [`wrangler-action`](https://github.com/marketplace/actions/deploy-to-cloudflare-workers-with-wrangler), you can customize your workflow to deploy your project in situations like:

- When a new commit is merged to your `master` branch
- On a `cron`-like schedule, such as every hour, or daily
- When an API "dispatches" an event to your GitHub repo

First, we'll explore the basics of using the action, and explain how to configure your project to use it. After the basics, we'll cover each of the above deployment situations in detail, with a brief explanation and code example to help you get started. If you'd like to see the action itself, you can [find it in GitHub's marketplace](https://github.com/marketplace/actions/deploy-to-cloudflare-workers-with-wrangler).

## Usage

Add `wrangler-action` to the workflow for your Workers application. If you haven't set up a GitHub Actions workflow for your repo yet, you can create a new file called `.github/workflows/deploy.yml`, and add the below workflow, to start:

```yaml
on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - uses: actions/checkout@master
      - name: Publish
        uses: cloudflare/wrangler-action@1.0.0
        with:
          apiKey: ${{ secrets.apiKey }}
          email: ${{ secrets.email }}
```

## Configuration

You'll need to configure Wrangler using GitHub's Secrets feature - go to "Settings -> Secrets" and add your Cloudflare API key and email (for help finding these, see the [Workers documentation](/quickstart/#finding-your-cloudflare-api-keys)). Your API key and email are encrypted by GitHub, and the action won't print them into logs, so they should be safe!

With your API key and email set as secrets for your repository, pass them to the action in the `with` block of your workflow. Below, I've set the secret names to `apiKey` and `email`:

```yaml
jobs:
  deploy:
    name: Deploy
    steps:
      uses: cloudflare/wrangler-action@1.0.0
      with:
        apiKey: ${{ secrets.apiKey }}
        email: ${{ secrets.email }}
```

Optionally, you can also pass an `environment` key to the action. If you're using Wrangler's [environments](https://github.com/cloudflare/wrangler/blob/master/docs/content/environments.md) feature, you can customize _where_ the action deploys to by passing the matching environment in the `with` block of your workflow:

```yaml
jobs:
  deploy:
    # ... previous configuration ...
    steps:
      uses: cloudflare/wrangler-action@0.1.4
      with:
        # ... api key and email ...
        environment: 'production'
```

## Use-Cases

### Deploying when commits are merged to master

The above workflow examples have already shown how to run `wrangler-action` when new commits are merged to the master branch. For most developers, this workflow will easily replace manual deploys and be a great first integration step with `wrangler-action`:

```yaml
on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - uses: actions/checkout@master
      - name: Publish
        uses: cloudflare/wrangler-action@1.0.0
        with:
          apiKey: ${{ secrets.apiKey }}
          email: ${{ secrets.email }}
```

Note that there are a number of possible events, like `push`, that can be used to trigger a workflow. For more details on the events available, check out the [GitHub Actions documentation](https://help.github.com/en/articles/workflow-syntax-for-github-actions#on).

### Deploying on a schedule

If you'd like to deploy your Workers application on a recurring basis – for instance, every hour, or daily – the `schedule` trigger allows you to use cron syntax to define a workflow schedule. The below example will deploy at the beginning of every hour:

```yaml
on:
  schedule:
    - cron: '0 * * * *'

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - uses: actions/checkout@master
      - name: Publish app
        uses: cloudflare/wrangler-action@1.0.0
        with:
          apiKey: ${{ secrets.apiKey }}
          email: ${{ secrets.email }}
```

If you need help defining the correct cron syntax, check out [crontab.guru](https://crontab.guru/), which provides a friendly user interface for validating your cron schedule.

### Deploying on a "dispatched" event

If you need to trigger a deployment at-will, you can use GitHub's API to fire a `repository_dispatch` event on your repository. By setting your workflow to trigger on that event, you'll be able to deploy your application via an API call:

```yaml
on:
  repository_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - uses: actions/checkout@master
      - name: Publish app
        uses: cloudflare/wrangler-action@1.0.0
        with:
          apiKey: ${{ secrets.apiKey }}
          email: ${{ secrets.email }}
```

To make the GitHub API request, you can deploy a custom Workers function, which will send a `POST` request to GitHub's API and trigger a new deploy:

```js
const headers = {
  Accept: 'application/vnd.github.everest-preview+json',
  Authorization: 'Bearer $token',
}

const body = JSON.stringify({ event_type: 'repository_dispatch' })

const url = `https://api.github.com/repos/$owner/$repo/dispatches`

const handleRequest = async evt => {
  await fetch(url, { method: 'POST', headers, body })
  return new Response('OK')
}

addEventListener('fetch', handleRequest)
```

Note that `$token` in this code sample is a GitHub "Personal Access Token". For information on how to generate this token, see the [GitHub documentation on "repository_dispatch"](https://developer.github.com/v3/repos/#create-a-repository-dispatch-event).
