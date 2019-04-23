# Build a Slack bot

In this tutorial, we'll build a [Slack] bot using [Cloudflare Workers]. Our bot will be able to respond to commands inside of a Slack channel, look up data via an API, and return it to the Slack channel, by writing a new message.

[PREVIEW GIF HERE]

This tutorial makes use of [Wrangler], our command-line tool for generating, building, and publishing projects on the Cloudflare Workers platform. If you haven't used Wrangler, we recommend checking out the [quick-start guide](../), which will get you set up with Wrangler, and familiar with the basic commands.

This tutorial is recommended for people who are familiar with writing web applications. If you've ever built an application with tools like [Node] and [Express], this project will feel very familiar to you. That being said, if you're new to writing web apps, we think that Workers is a super easy way to focus on writing code, and actually shipping projects: maybe you've wanted to build something like a Slack bot in the past, but things like deployment and configuration have always seemed a little scary. In either case, welcome! We're thrilled to have you here!

One more thing before we start the tutorial: if you'd like to see the code, or how the bot works in an actual Slack channel, we've made the final version of the codebase [available on GitHub]. From there, you can add your own Slack API keys, and deploy it to your own Slack channels for testing.

## Prerequisites

- Quick check: do they have Wrangler?
- Slack set up: API keys
- Cloudflare set up: API keys

## Generate

- Generate based on template

## Build

- Overview of important files in the codebase

### Creating Routes

- Creating a src directory
- Creating a simple router
- Defining two routes (/cryptocurrency and /stocks) w/ simple responses
- Import routes into main worker.js
- Handle/call routes in worker.js

### Including Dependencies

- Installing NPM packages
- Use crypto/stock packages in two routes

### Setting up the Slack handler

- Set up Slack outgoing hooks
- Set up simple Slack response class
- Fill out routes and use Slack response class

## Compiling

- Compiling using Webpack (unsure how much this depends on Wrangler)
- Building project

## Preview

- Preview in cloudflareworkers.com using Testing tab

## Deploy

- Deploy
- Test inside of Slack channel (nice GIF or video here)

## Resources

- View the source
- Link to main tutorial page ("Try building a Serverless function next")
- Link to template gallery ("See what else you can build in our Template Gallery")
