# Cloudflare Workers Documentation
- [Install](#install)
- [Short Method](#short-method)
- [Preview](#preview)
  - [Worker](#worker)
- [Build](#build)
- [Test](#test)
- [Publishing](#publishing)
- [Yarn Workspaces](#yarn-workspaces)
- [Releasing](#releasing)
- [Contributing](#contributing)


This project contains the static website content for the [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/).

This project is broken down to two main folders:

1.  **`cloudflare-docs-theme/`**: The engine that styles and runs the static build of the docs which is a Gatsby theme containing all the components for the docs
1.  **`workers-docs/`**: All the content, _custom_ components for the Workers docs, and the Worker Site that is the Worker code running on Cloudflare
    - `src/content`: The content markdown and MDX files
    - `src/*`: custom components that add to and override components defined by the `cloudflare-docs-theme`
    - `workers-site`: the Worker Site that is the Worker code running on Cloudflare

## Install

Ensure you have the the following installed:

- [node](https://nodejs.org/en/download/) version 10.13.0 or higher
- [yarn](https://classic.yarnpkg.com/en/docs/getting-started)

## Short Method

If you're not making changes to the Gatsby theme, the simplest way to run the docs is by `cd workers-doc` and running the `yarn` commands. If changing the Gatsby theme then use [yarn workspaces](#yarn-workspaces).

## Preview

To test the content or static gatsby files locally, run:

```
cd workers-docs
yarn
yarn start
```

Your site is now running at `http://localhost:1313`

\_Note: You'll also see a second link: `http://localhost:1313/___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).\_

You can now edit the .md (`./src/content`) files and the HTML files will be automatically displayed in your browser.

### Worker

To test the Worker logic serving these static files (i.e. anything in `./workers-site`), run:

```
yarn worker-start
```

## Build

To build all files to `workers-docs/public`:

```
yarn build
```

To build all Worker files to `workers-docs/worker-site/dist`:

```
yarn worker-build
```

## Test

To run test of the Workers script, run:

```
yarn worker-test
```

## Publishing

To publish to development environment (which is protected by access at dev.bigfluffycloudflare.com/workers) run:

```
yarn publish dev
```

## Yarn Workspaces

The Gatsby theme (code in **`cloudflare-docs-theme/`**) was designed to be published on NPM and reusable by other Cloudflare developer docs as well as consumed by any workspace in this repo (i.e. just Workers docs `workers-docs`) project in this repo. This way Workers docs can use the most updated (even if not published yet) shared theme, but can also custom the theme to Worker's specific styles and components.

```
yarn workspace cloudflare-workers-docs run $COMMAND
```

The command above will run whatever `$COMMAND` (e.g. `yarn start`, `yarn publish dev`, etc..) as listed above using the current theme is `cloudflare-docs-theme` and content/code in `workers-docs`.

For example

```
yarn workspace cloudflare-workers-docs run publish dev
```

Will build the static files using the source code of `cloudflare-docs-theme` and `workers-docs` then deploy the static files to the Worker site at `dev.bigfluffycloudflare.com/workers`

# Releasing

Upon a merge, the tip of the `master` branch is deployed by a GitHub Action to https://developers.cloudflare.com/workers/ . 

## Contributing

This repo is overseen by the Cloudflare Workers team. Check out our contribution guide at [CONTRIBUTING.md](/CONTRIBUTING.md)!

To contribute to templates see [Template Contributing Guide](https://github.com/cloudflare/template-registry/blob/master/CONTRIBUTING.md).
