---
title: Overview
weight: 1
---

Workers KV is a global, low-latency, key-value data store. It supports exceptionally high read volumes with low-latency, making it possible to build highly dynamic APIs and websites which respond as quickly as a cached static file would.

Workers KV is generally good for use-cases where you need to write relatively infrequently, but read quickly and frequently. It is optimized for these high-read applications, only reaching its full performance when data is being frequently read. Very infrequently read values are stored centrally, while more popular values are maintained in all of our data centers around the world.

KV achieves this performance by being eventually-consistent. New key-value pairs are immediately available everywhere, but value changes may take up to 60 seconds to propagate. Workers KV isn't ideal for situations where you need support for atomic operations or where values must be read and written in a single transaction.

## Use Cases

KV makes it possible to move applications which otherwise would have to live in a central origin, onto our network which lives within the fabric of the Internet itself.

### Access Tokens and Authentication

With KV you can store your access tokens inside our network. This will allow you to make authentication decisions faster than a traditional request can even get to your origin, and will allow you to move all of your authentication logic to one place.

### Content Customization

Store customer profiles in our network to make it possible to deliver customized pages with the performance of a static file on a CDN. Common use cases include A/B testing, 'logged in' state, translations, CMS-style content management, retargeting, and even showing product recommendations.

### Configuration

KV data can be used to configure your existing Workers, or to deliver configuration to the client-side portion of your websites. You can create feature flags, kill switches, even block malicious users, all with data stored in KV.

### Internet-scale Applications

Workers KV isn't just for applications which need exceptional performance. It often simply makes more sense to run code all around the world close to every user than to deploy it to a single location. We have customers who use Workers KV to handle webhooks, to synchronize data between systems, to build chat bots, and to log data. Build your entire API as a Worker and serve your full website from a Worker using Worker KV.

## Usage

Workers KV values can be written via our API or from a Worker, and read from a Worker in a single line of code.

Your data is organized into key-value pairs contained within a Namespace. To get started, learn how to [write data]({{< ref "writing-data.md" >}}).

## Pricing

Your $5 Workers monthly base charge includes:

- 1 GB of Worker KV storage
- 10 million Worker KV reads per month
- 1 million Worker KV writes per month
- 1 million Worker KV deletes per month
- 1 million Worker KV list operations per month

Additional KV operations are priced as follows:

- $0.50 per GB of additional Worker KV storage per month
- $0.50 per million additional Worker KV reads
- $5.00 per million additional Worker KV writes
- $5.00 per million additional Worker KV deletes
- $5.00 per million additional Worker KV list operations

