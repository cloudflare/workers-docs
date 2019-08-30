---
title: "Using NPM Modules"
---

You can create a Worker locally, import NPM packages, bundle all the code with Webpack, and push it to the edge using the Workers [Configuration API](/archive/api/).

NPM is a JavaScript package manager that comes with Node.js. To use it, make sure you have [Node.js](https://nodejs.org/en/download/) installed and open up your terminal. Create a new project in a directory by running `npm init`. The command will generate a package.json file, which tells NPM what packages are needed for your project. You can simultaneously download a package and add it to your package.json by running `npm install --save <PACKAGE-NAME>`. The package will install to a directory in the project called `node_modules`. Now, you can require that package inside of your Worker and run it.

As an example, I’m going to use the popular `lodash` package below. Install it by running `npm install --save lodash`, and then create an `index.js` file to add the following code to.

{{< highlight javascript >}}
addEventListener('fetch', event => {
  event.respondWith(sendDate(event.request))
})

const _ = require("lodash")

async function sendDate(request) {
  return new Response(`${_.now()}`)
}
{{</ highlight >}}

Now we can use Webpack, a module bundler, to bundle the lodash code in with our Worker. We can download [Webpack](https://webpack.github.io/) directly through NPM as well, making the process very simple. Run `npm install --save-dev webpack` to install Webpack as a developer dependency, meaning the code for Webpack won’t be used in production.

Since JavaScript can be run in multiple environments, Webpack offers the ability to specify an environment that the bundled code will run in. You can specify this in a configuration file you create in the root folder of your project called `webpack.config.js`. `webpack.config.js` exports an object that has values set for different keys specified in Webpack's documentation and will automatically be used by Webpack when you bundle your code. We recommend using the `webworker` target, as that is the closest target to our environment. Your `webpack.config.js` file would look like this:

{{< highlight javascript >}}
module.exports = {
  target: 'webworker'
};
{{</ highlight >}}

The package.json has a section for adding scripts to run to manage the project. When we run scripts from the package.json by using `npm run <SCRIPT_NAME>`, npm will update our path to include packages in the `node_modules` folder, allowing us to use packages that are installed for use in the project that we don’t want in the global scope of our computer. Edit your package.json to include a script called `build` that will run `webpack`, bundling our needed packages with our Worker:

{{< highlight json >}}
{
  "scripts": {
    "build": "webpack index.js"
  }
}
{{</ highlight >}}

Now, running the command `npm run build` will output your bundled Worker at `./dist/main.js`. To upload your Worker, you can follow the steps in the [Configuration API](/archive/api/) section of the docs.
