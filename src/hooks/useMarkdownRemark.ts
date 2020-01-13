import { useStaticQuery, graphql } from 'gatsby'
import { allMarkdownRemarkResult } from '../types/mdx'
import { allRestApiTemplates } from '../types/restApiTemplates'

// TODO get hooks working instead of useStaticQuery in components
// export const useMarkdownNodes = (): allMarkdownRemarkResult['data'] => {
//   const { data }: allMarkdownRemarkResult = useStaticQuery(

//   return data //.allMdx.edges
// }
type queryReturnType = allRestApiTemplates['data'] & allMarkdownRemarkResult['data']
// data: allRestApiTemplates['data'] & allMarkdownRemarkResult['data']

export const useRestApiTemplates = () =>
  // export const useRestApiTemplates = (): allRestApiTemplates['data'] =>
  {
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
      `,
    )
    // const { allMdx, allRestApiTemplates } = data
    return { allRestApiTemplates, allMdx }
  }
