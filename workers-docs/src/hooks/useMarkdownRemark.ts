import { useStaticQuery, graphql } from 'gatsby'
import { allMarkdownRemarkResult } from '../types/mdx'
import { allRestApiTemplates } from '../types/restApiTemplates'

type queryReturnType = allRestApiTemplates['data'] & allMarkdownRemarkResult['data']
export const useRestApiTemplates = () => {
  const { allMdx, allRestApiTemplates }: queryReturnType = useStaticQuery(
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

        allRestApiTemplates {
          edges {
            node {
              tags
              share_url
              repository_url
              endpointId
              description
              demos {
                bar {
                  text
                  url
                }
                foo {
                  text
                  url
                }
                main {
                  share_url
                  tags
                  text
                  url
                }
              }
              code
              title
              type
              url
              weight
            }
          }
        }
      }
    `
  )
  return { allRestApiTemplates, allMdx }
}
