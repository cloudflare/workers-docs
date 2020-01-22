const path = require('path')

module.exports = {
  siteMetadata: {
    title: `Cloudflare Workers`,
    description: `Use Cloudflare’s APIs and edge network to build secure, ultra-fast applications.`,
    author: `@cloudflaredev`,
  },
  // pathPrefix: `/workers`, //  this breaks MDX links like (/reference..) but not the sidebar for some reason if it's inside MDX Render it breaks only
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `mdx-pages`,
        path: `${__dirname}/src/content`,
        ignore: [`**/CONTRIBUTING*`, '/styles/**'],
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-plugin-copy-files',
            options: {
              source: `${__dirname}/src/images`,
              destination: '/images',
            },
          },
        ],
      },
    }, // Simple config, passing URL
    // In your gatsby-config.js
    {
      resolve: 'gatsby-source-rest-api',
      options: {
        endpoints: ['https://template-registry.developers.workers.dev/templates'],
      },
    },

    ...require('glob')
      // TODO: instead of serving images this complicated way, change links to root
      // e.g. (/tooling/media/image.jpq) to ref current directory (e.g. ./media/image.jpg)
      .sync(path.join(__dirname, './src/**/media'))
      .map(source => ({
        resolve: 'gatsby-plugin-copy-files',
        options: {
          source,
          destination: source.replace(path.join(__dirname, './src/content'), ''),
        },
      })),
  ],
}
