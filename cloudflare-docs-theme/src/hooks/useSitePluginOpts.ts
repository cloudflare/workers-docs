import { useStaticQuery, graphql } from 'gatsby'

// TODO get hooks working instead of useStaticQuery in components
// export const useMarkdownNodes = (): allMarkdownRemarkResult['data'] => {
//   const { data }: allMarkdownRemarkResult = useStaticQuery(

//   return data //.allMdx.edges
// }
const query = {
  sitePlugin: {
    pluginOptions: {
      contentPath: './src/content/',
      publicPath: 'workers',
    },
  },
} as const
type queryReturnType = typeof query
// data: allRestApiTemplates['data'] & allMarkdownRemarkResult['data']

export const useSitePluginOpts = () =>
  // export const useRestApiTemplates = (): allRestApiTemplates['data'] =>
  {
    const { sitePlugin }: queryReturnType = useStaticQuery(
      graphql`
        {
          sitePlugin(name: { eq: "gatsby-theme-cloudflare-docs" }) {
            pluginOptions {
              contentPath
              publicPath
            }
          }
        }
      `
    )
    // const { allMdx, allRestApiTemplates } = data

    return sitePlugin.pluginOptions
  }
