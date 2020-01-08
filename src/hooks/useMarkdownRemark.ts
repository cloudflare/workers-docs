import { useStaticQuery, graphql } from 'gatsby'
import {
  allMarkdownRemarkResult,
  markdownRemarkEdge,
  markdownRemark,
} from '../types/markdownRemark'

export const useMarkdownNodes = (): allMarkdownRemarkResult['data'] => {
  const { data }: allMarkdownRemarkResult = useStaticQuery(
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
