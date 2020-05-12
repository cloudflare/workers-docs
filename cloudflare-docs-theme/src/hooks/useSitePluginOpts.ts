import { useStaticQuery, graphql } from 'gatsby'

const query = {
  sitePlugin: {
    pluginOptions: {
      contentPath: './src/content/',
      publicPath: 'workers',
    },
  },
} as const
type queryReturnType = typeof query

export const useSitePluginOpts = () => {
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
  return sitePlugin.pluginOptions
}
