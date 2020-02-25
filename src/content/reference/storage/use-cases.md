---
title: 'Use cases'
weight: 50
---

Workers KV makes it possible to move applications which otherwise would have
to live in a central origin onto our network.

## Access Tokens and Authentication

With KV you can store your access tokens inside our network. This will allow
you to make authentication decisions faster than a traditional request can
even get to your origin, and will allow you to move all of your
authentication logic to one place.

## Content Customization

Store customer profiles in our network to make it possible to deliver
customized pages with the performance of a static file on a CDN. Common use
cases include A/B testing, 'logged in' state, translations, CMS-style content
management, retargeting, and even showing product recommendations.

## Configuration

KV data can be used to configure your existing Workers, or to deliver
configuration to the client-side portion of your websites. You can create
feature flags, kill switches, even block malicious users, all with data
stored in KV.

## Internet-scale Applications

Workers KV isn't just for applications which need exceptional performance. It
often simply makes more sense to run code all around the world close to every
user than to deploy it to a single location. We have customers who use
Workers KV to handle webhooks, to synchronize data between systems, to build
chat bots, and to log data. Build your entire API as a Worker and serve your
full website from a Worker using Workers KV.
