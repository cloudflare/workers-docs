import { useStaticQuery, graphql } from 'gatsby'
import { allMarkdownRemarkResult } from '../types/mdx'
import { allRestApiTemplates } from '../types/restApiTemplates'

type queryReturnType = allRestApiTemplates['data'] & allMarkdownRemarkResult['data']

export const useRestApiTemplates = () => {
  const { allMdx }: queryReturnType = useStaticQuery(
    graphql`
      query {
        allMdx(limit: 1000) {
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
    `
  )
  return { allMdx }
}
