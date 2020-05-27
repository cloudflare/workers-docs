const path = require('path')

module.exports = {
  siteMetadata: {
    title: `Cloudflare Workers`,
    description: `Use Cloudflare’s APIs and edge network to build secure, ultra-fast applications.`,
    author: `@cloudflaredev`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-rest-api',
      options: {
        endpoints: ['https://template-registry.developers.workers.dev/templates'],
      },
    },
    {
      resolve: `gatsby-theme-cloudflare-docs`,
      options: {
        publicPath: 'workers',
        contentPath: './src/content/',
      },
    },
  ],
}
