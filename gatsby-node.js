/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  // console.log('creating pages')

  // let result = await graphql(`
  //   query MyQuery {
  //     allFile {
  //       nodes {
  //         absolutePath
  //         internal {
  //           type
  //           ignoreType
  //         }
  //         relativePath
  //         relativeDirectory
  //       }
  //     }
  //   }
  // `)
  // // Handle errors
  // if (result.errors) {
  //   reporter.panicOnBuild(`Error while running GraphQL query.`)
  //   return
  // }
  // console.log('result.data', result.data.allFile.nodes)
  // //     "allFile": {
  // // "nodes": [
  // result.data.allFile.nodes.forEach(node => {
  //   console.log('node', node)
  //   const pathToServe = createFilePath({
  //     node,
  //     getNode,
  //     basePath: node.relativePath,
  //   })
  // })

  const { createPage } = actions

  const baseTemplate = path.resolve(`src/templates/baseTemplate.tsx`)

  result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              pathToServe
            }
            frontmatter {
              alwaysopen
              weight
            }
            fileAbsolutePath
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    return createPage({
      path: node.fields.pathToServe,
      // path: node.frontmatter.path,
      component: baseTemplate,
      context: {
        // TODO not sure if this is being used
        // passed from MarkdowmRemark to the SitePage
        parent: node.fields.parent,
        weight: node.frontmatter.weight,
      }, // additional data can be passed via context
    })
  })
}
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  // Ensures we are processing only markdown files
  if (node.internal.type === 'MarkdownRemark') {
    // Use `createFilePath` to turn markdown files in our `markdown-pages` directory into `/workers/`pathToServe
    const originalPath = node.fileAbsolutePath.replace(
      node.fileAbsolutePath.match(/.*markdown-pages/)[0],
      '',
    )
    let pathToServe = createFilePath({
      node,
      getNode,
      basePath: 'markdown-pages/',
    })
    let parentDir = path.dirname(pathToServe)
    if (pathToServe.includes('index')) {
      pathToServe = parentDir
      parentDir = path.dirname(parentDir) // "/" dirname will = "/"
    }
    // Creates new query'able field with name of 'pathToServe', 'parent'..
    // for allMarkdownRemark edge nodes
    createNodeField({
      node,
      name: 'pathToServe',
      value: `/workers${pathToServe}`,
    })
    createNodeField({
      node,
      name: `parent`,
      value: `${parentDir}`,
    })
    createNodeField({
      node,
      name: `filePath`,
      value: `${originalPath}`,
    })
  }
}
