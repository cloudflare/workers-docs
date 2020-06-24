---
title: "Storing Data"
weight: 50
---

Retrieving data is a common Worker need. This data might be included in the response being
returned, or it might be used to make routing or security decisions in your Worker.

Speed is critical in these applications and making a request back to your origin service or
database can be too slow. It can be necessary to store or cache data in a location cachable on or
near Cloudflare’s edge.

There are several common strategies we have used successfully to store data:

### Use Workers KV

[Workers KV](/archive/kv/) is an eventually-consistent key-value store which runs on the same machines as
your Workers. It makes it possible to store large amounts of data which can be read by your
Workers extremely quickly.

### Include data in the Worker

The Worker script can contain a fair amount of data (up to about 1 MB) inline in its source code.
If that is sufficient for your application, it’s possible to include all the necessary data as
objects in your code.

You can even use our API to dynamically update your Worker whenever your data changes.

### Load data files through the Cloudflare Cache

Subrequests made with the Fetch API are cached inside Cloudflare’s edge. This
means if you load a data file in your Worker from a URL that is configured to allow
caching (i.e. it returns an appropriate `Cache-Control` header with a `max-age` value, or it is a
Cloudflare-powered site that has configured caching directly), it’s very likely that file will be
cached in the very data center which is running your Worker.

A common way to do this is to store your data in a file in Google Cloud Storage, using a CNAME to host that
file as a part of a Cloudflare-powered domain. As your Worker gets more traffic, that file will be more and more
likely to be available in the edge cache around the world, making file loads very fast.

If you have more data than can be practically stored in a single file, it’s common to shard your data. Create multiple
files, each of which stores a portion of your data. When it’s time to load the data, use a hash or prefix of your key
to load the appropriate file first.

### Cache in global memory

Your Worker script is not launched for each individual request. Internally the Worker system
launches and decommissions instances of your scripts based on request volume. The more traffic
your Worker gets, the more likely your Worker is to be resident on many of our edge nodes for an extended period of time. It’s possible
to use global JavaScript variables to cache data in these running instances.

You can, for example, load data from your origin and store it in a global variable. That variable will be available
the next time your Worker is executed on that node (if it hasn't been stopped and started in between).

Keep in mind that the memory available for such caching is limited. Each running instance of your
Worker [can use up to 128MB of RAM](/workers/archive/writing-workers/resource-limits)), including
space used to store your code, local variables used during execution, etc. If your Worker uses too
much memory, it will be killed and restarted, possibly disrupting users. Even when it is within the
limits, a Worker that is running close to its limits may slow down due to increased garbage
collection activity. So, as a rule of thumb, you should not store more than a couple megabytes of
data in global variables.

An additional consideration is that when a request is canceled -- e.g. because it
exceeded its CPU time limit or because the client disconnected -- no more JavaScript is executed on
behalf of the request at all. In the case of CPU timeouts, this could happen on any line of code
(whereas for client disconnects, cancellation only occurs while waiting for I/O). It is not possible
for the Worker to catch this condition and respond to it. As with any distributed system, your code
should be designed such that sudden termination does not leave it in a broken state. If you modify
global variables in your Worker, be careful to consider whether they could be left in an
inconsistent state due to cancellation at an inopportune time.

## Alternatives

If these solutions don’t meet your data-storage needs, please [reach out](https://community.cloudflare.com/c/developers/workers).
Our engineering teams are always interested in brainstorming novel uses of Workers.
