---
title: Travis CI
weight: 50
---

[Travis CI](https://travis-ci.org) is a popular CI/CD tool that is extremely user friendly. Travis CI also has a free tier for testing personal projects.

### Additional Documentation

Our [blog post](https://blog.cloudflare.com/a-ci/) goes over creating a CI/CD pipeline with Travis CI and deploying Cloudflare Workers with the Serverless framework.

### Quick Overview

Travis CI requires a `.travis.yml` to be included in any repo that will use Travis. This file tells Travis how to run your build process. For those who are just looking for an example `.travis.yml` please see the below:

```hcl
language: node_js
node_js:
  - "node"

deploy:
  - provider: script
  script: sls deploy
  skip_cleanup: true
  on:
    branch: master
```

As you can see we are using the [Serverless Framework](serverless/) to deploy the Worker, but you may specify any custom script. This `.travis.yml` also assumes you are running unit tests (as Travis runs `npm test` by default for Node projects).

You can skip tests altogether by adding:

```hcl
install: true
```

before the `deploy` stanza.

In this case we have also added the `npm_modules` to the `.gitignore` file to prevent any conflicts.

### Step by Step Guide

To deploy with Travis, the first step is to sync Travis CI GitHub to pull in your Worker Repos. Travis has an excellent getting started tutorial [here](https://docs.travis-ci.com/user/tutorial/).

Once GitHub has access to Travis CI you have the option to grant Travis access to individual repos in your 'Overview' screen as show below. When you toggle the grey button 'on' to green, Travis will start listening for Webhooks on that repo. You'll also be able to customize the build settings and add things like `ENV` variables.

![Travis CI Step 1](/archive/static/step_1_travis.png)

Please see below for example `ENV` variable set up. In this case since we are deploying with Serverless, we set the `SLS_DEBUG` variable for more verbose error messaging.

![Travis CI Step 2](/archive/static/step_2_travis.png)

When you want Travis to run a pipeline for you, you must include a `.travis.yml` file in the root of your repo. This is a configuration file that tells Travis what commands to run during your build process. A final repo layout (if you were running tests and deploying with Serverless) could look like:

```hcl
----- worker.js
----- serverless.yml
----- test
      . worker-test.js
----- node_modules
----- package.json
----- package-lock.json
----- .travis.yml
----- .gitignore
```

For a more detailed run through of how to configure your repo and deploy with Serverless we suggest taking a look at the [blog](https://blog.cloudflare.com/a-ci/), which describes an entire CI/CD pipeline.
