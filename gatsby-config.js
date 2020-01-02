const path = require('path')
// Print out for debug help
console.log(
  JSON.stringify(
    require('glob')
      .sync(path.join(__dirname, './src/**/media'))
      .map(source => ({
        resolve: 'gatsby-plugin-copy-files',
        options: {
          source,
          destination: source.replace(path.join(__dirname, './src/markdown-pages'), ''),
        },
      })),
    null,
    '  ',
  ),
)
module.exports = {
  siteMetadata: {
    title: `Cloudflare Workers`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
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
    // `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `gatsby-starter-default`,
    //     short_name: `starter`,
    //     start_url: `/`,
    //     background_color: `#663399`,
    //     theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     icon: `src/images/cloudflare-icon.png`, // This path is relative to the root of the site.
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
