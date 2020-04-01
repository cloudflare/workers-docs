## Contributing to the Cloudflare Workers documentation

People like yourself being willing to share code with others that use our platform is what makes a free serverless platform like Cloudflare Workers possible. So, thank you!

Following these guidelines helps to keep our documentation consistent and deliver the best developer experience for those using them. The Cloudflare Developer Experience team maintains the template gallery.

There are several ways to contribute to the Cloudflare Workers platform. At this time we are looking for **modest changes** such as typos fixes and other corrections. Large new content contributions are discouraged.

The template gallery is focused on streamlining the contribution of templates. When a template makes it through the process it will be made public in [our template gallery](https://workers.cloudflare.com/docs/templates/). Since several developers - even beginners - will be using these templates, we must be scrupulous in the approval process. If you’re looking for a more relaxed way of sharing code, no worries! For other ways to contribute your Worker scripts see [our community](https://community.cloudflare.com/c/developers/workers).

**Note that we can't provide support for the Workers platform in this repository.** Please visit the Workers [support page](https://support.cloudflare.com/hc/en-us/sections/360000215372-Cloudflare-Workers) for assistance.

If you have any questions that _aren't_ answered by this contribution guide, let us know! This document, like everything else in this repository, is a work in progress, and we'd love to know how we can make it better.

#### **Did you write a patch that fixes a bug?**

* [Open a new GitHub pull request with the patch](https://github.com/cloudflare/cloudflare-docs/compare).
* Ensure the PR description clearly describes the problem and solution. Include the relevant issue number if applicable.

#### **Did you find a typo in the docs, or an issue with a code sample?**

* **Ensure that the issue was not already reported** by searching on GitHub under [Issues](https://github.com/cloudflare/workers-docs/issues).

* If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/cloudflare/workers-docs/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible.

* For more detailed information on submitting a bug report and creating an issue, visit our [reporting guidelines](https://edgeguides.rubyonrails.org/contributing_to_ruby_on_rails.html#reporting-an-issue).

#### **Do you want to add a new section to the Reference portion of the docs?**

* Please submit an issue! We're interested in hearing about what you think is missing in the Reference portion of the docs, but we aren't accepting submissions that are substantial new sections of the Reference portion of the docs. This includes the Tooling section, where we have a small amount of documentation for third-party tooling, such as the Serverless framework.

#### **Do you want to submit a new tutorial?**

* We currently aren't accepting new full-length tutorials in the docs. If you've written a tutorial about building something with Workers and want to share it on your own blog or elsewhere, great! We'd be happy to help you share it (email [wrangler AT cloudflare DOT com](mailto:wrangler@cloudflare.com)), but due to the large amount of review and process around tutorials in this repository, we're unable to add new community tutorials at this time.
* For tutorials that have been approved note that while tutorials can stay in the gallery indefinitely, they will be rotated for the main tutorial section as new tutorials emerge. 

#### **Do you want to contribute a template to the Template Gallery?**

* Please read the Template Gallery [contribution guide](https://github.com/victoriabernard92/template-registry/blob/master/CONTRIBUTING.md).

#### **Do you want to migrate archived documentation to the new docs?**

 Any page containing `/archive` in the path is considered archived.

 Though there will be _no fixes or improvements to any archived content_, we would love any missing information in the new docs to be inserted and redirected to the new documentation. This would be especially helpful as we wish to deprecate all archive documentation. To do so:

* Find the page that is approriate for the new information to live. **Avoid making any new pages**. With the _exception of old recipes_ which may have their own tutorial `.md` file. If you have a hard time deciding the appropriate place for the old content please check at the current format of the new docs or tag someone from Worker's Development Experience team.
* Integrate the old information into the new page.
* Set up a redirect from the old documentation to the replacement section by adding to [`oldDocs.js`](./worker/worker/data/oldDocs.js). Make sure if it's a section you added, then reference the anchor tag in the new documentation (e.g. `/reference/cloudflare-features` in old documenation now goes to `/reference/apis/request/#the-cf-object` in the new documentation.

#### **Do you have questions about how to use Workers, or need help with your code?**

* While we love your feedback, questions about _how_ to use Workers are better suited for the Workers [Community Forum](https://community.cloudflare.com/c/developers/workers), where members of our community answer questions about how to build projects with Workers. Please check out that resource before opening an issue on the repository!

---

Thank you! :heart: :heart: :heart:

The Cloudflare Workers Developer Experience Team

Thanks to the Ruby on Rails team's [CONTRIBUTING.md](https://github.com/rails/rails/blob/d2380911847a4d12a55d727b79c94188e5e074ae/CONTRIBUTING.md), which this guide is inspired heavily by.
