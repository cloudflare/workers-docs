import { useStaticQuery, graphql } from 'gatsby'
import { allMarkdownRemarkResult } from '../types/markdownRemark'

// TODO get hooks working instead of useStaticQuery in components
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

  return data //.allMarkdownRemark.edges
}
