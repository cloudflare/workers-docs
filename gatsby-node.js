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
  //   const relativeFilePath = createFilePath({
  //     node,
  //     getNode,
  //     basePath: node.relativePath,
  //   })
  // })

  const { createPage } = actions

  const baseTemplate = path.resolve(`src/templates/baseTemplate.js`)

  result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              slug
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
    createPage({
      path: node.fields.slug,
      // path: node.frontmatter.path,
      component: baseTemplate,
      context: {
        // TODO not sure if this is being used
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
    // Use `createFilePath` to turn markdown files in our `markdown-pages` directory into `/workers/`slug
    let relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: 'markdown-pages/',
    })
    const parentDir = path.dirname(relativeFilePath)
    if (relativeFilePath.includes('index')) {
      relativeFilePath = parentDir
    }
    // Creates new query'able field with name of 'slug', 'parent'..
    // for allMarkdownRemark edge nodes
    createNodeField({
      node,
      name: 'slug',
      value: `/workers${relativeFilePath}`,
    })
    createNodeField({
      node,
      name: `parent`,
      value: `/workers${parentDir}`,
    })
  }
}
