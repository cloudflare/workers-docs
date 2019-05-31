---
title: 'Generating a Project'
weight: 2
---

We've tried to make it as easy as possible for new and returning users alike to get up and running with Workers by including support for templates in Wrangler. Wrangler's `generate` subcommand allows you to create new projects based on existing templates. Passing an additional argument to `generate` will set the "name" of the project, as well as the directory the project will be created in:

![Generate a Project](/quickstart/media/generate-project.gif)

> 💡 Protip: If you're ever unsure what a Wrangler subcommand does, like `wrangler generate`, try adding `--help` to the end of the command.

Once the project has been generated, you can navigate into the newly generated project directory, and look at the list of files created:

```sh
$ cd my-worker
$ ls
```

By default, Wrangler generates projects using our [JavaScript template](https://github.com/cloudflare/worker-template), which enables building Workers projects with JavaScript. We also maintain a great list of templates in our [Template Gallery](/templates), designed to help you get started quickly with Workers based on what you need in your project.

Using a custom template is easy - simply pass the GitHub URL of your template into `wrangler generate`:

```sh
$ wrangler generate my-router-app https://github.com/cloudflare/worker-template-router
```

## Next Step: ["Writing Code"](/quickstart/writing-code)

