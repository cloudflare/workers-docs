const path = require('path')

module.exports = {
  siteMetadata: {
    title: `Cloudflare Workers`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  // pathPrefix: `/workers`,
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages`,
        ignore: [`**/CONTRIBUTING*`, '/styles/**'],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: 'gatsby-plugin-copy-files',
      options: {
        source: `${__dirname}/src/images`,
        destination: '/images',
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
          destination: source.replace(path.join(__dirname, './src/markdown-pages'), ''),
        },
      })),
  ],
}
