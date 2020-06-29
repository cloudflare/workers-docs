/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const galleryTemplate = path.resolve(`src/templates/gallery.tsx`)
  const markdownTemplate = path.resolve(`src/templates/markdownTemplate.tsx`)
  // Create a custom page for the Template Gallery that's NOT based on Markdown, just TSX
  createPage({
    path: `/workers/templates/`,
    component: galleryTemplate,
  })

  const templatePage = path.resolve(`src/templates/templatePage.tsx`)
  templates = await graphql(`
    {
      allRestApiTemplates {
        nodes {
          endpointId
        }
      }
    }
  `)
  templates.data.allRestApiTemplates.nodes.forEach(({ endpointId }) => {
    createPage({
      path: `/workers/templates/pages/${endpointId}/`,
      component: templatePage,
      context: {
        id: endpointId,
      },
    })
  })
}
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  // Ensures we are processing only Markdown files
  if (node.internal.type === 'Mdx') {
    // Use `createFilePath` to turn Markdown files in our `content` directory into `/workers/`pathToServe
    const originalPath = node.fileAbsolutePath.replace(
      node.fileAbsolutePath.match(/.*content/)[0],
      ''
    )
    let pathToServe = createFilePath({
      node,
      getNode,
      basePath: 'content/',
    })
    let parentDir = path.dirname(pathToServe)
    if (pathToServe.includes('index')) {
      pathToServe = parentDir
      parentDir = path.dirname(parentDir) // "/" dirname will = "/"
    }
    pathToServe = pathToServe.replace(/\/+$/, '/') // always end the path with a slash

    const templateId = pathToServe.match(/^\/templates\/pages.*/)
      ? pathToServe.replace(/^\/templates\/pages\//, '').replace('/', '')
      : ''

    createNodeField({
      node,
      name: 'templateId',
      value: templateId,
    })
  }
}
