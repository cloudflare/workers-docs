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
      `,
    )
    // const { allMdx, allRestApiTemplates } = data
    return { allMdx }
  }
