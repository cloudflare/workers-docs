import { useStaticQuery, graphql } from 'gatsby'
import { GraphQLData, GraphQLEdge, GraphQLNode } from '../types/page'

export const useMarkdownNodes = (): GraphQLData['data'] => {
  const { data }: GraphQLData = useStaticQuery(
    graphql`
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              frontmatter {
                title
                alwaysopen
                hidden
                showNew
                weight
              }
              fileAbsolutePath
              fields {
                pathToServe
                parent
                filePath
              }
            }
          }
        }
      }
    `,
  )
  console.log('data', data)
  // return data.data
  return data //.allMarkdownRemark.edges
}
