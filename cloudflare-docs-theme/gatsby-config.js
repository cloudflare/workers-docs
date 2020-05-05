const path = require('path')
// const path = require('path')
const DEFAULT_THEME_OPTS = { publicPath: 'workers', contentPath: './src/content' }
// This is to get dirname to resolve to the site's folder
// e.g. gateway-docs instead of the theme
__dirname = path.resolve(`.`)

module.exports = (themeOptions) => {
  const contentPath = themeOptions.contentPath || DEFAULT_THEME_OPTS.contentPath
  const publicPath = themeOptions.publicPath || DEFAULT_THEME_OPTS.publicPath

  return {
    assetPrefix: `/${themeOptions.publicPath}`,
    plugins: [
      `gatsby-plugin-typescript`,
      `gatsby-plugin-react-helmet`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `mdx-pages`,
          path: contentPath,
          ignore: [`**/CONTRIBUTING*`, '/styles/**', 'index.js'],
        },
      },
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [`.mdx`, `.md`],
        },
      },

      ...require('glob')
        // TODO: instead of serving images this complicated way, change links to root
        // e.g. (/tooling/media/image.jpq) to ref current directory (e.g. ./media/image.jpg)
        .sync(path.join(__dirname, './src/static'))
        .map((source) => {
          // console.log('path.join', path.join(__dirname, './src'))
          const destination = path.replace(path.join(__dirname, './src/content'), '')
          return {
            resolve: 'gatsby-plugin-copy-files',
            options: {
              source,
              destination: destination,
            },
          }
        }),
      ...require('glob')
        // TODO: instead of serving images this complicated way, change links to root
        // e.g. (/tooling/media/image.jpg) to ref current directory (e.g. ./media/image.jpg)
        // this place all images under media directoy into their current folder under content for gatsby
        // then gatsby figured out who to put it in current folder at public/workers/..
        .sync(path.join(__dirname, './src/**/media'))
        .map((source) => {
          return {
            resolve: 'gatsby-plugin-copy-files',
            options: {
              source,
              destination: source.replace(path.join(__dirname, './src/content'), publicPath),
            },
          }
        }),
    ],
  }
}
