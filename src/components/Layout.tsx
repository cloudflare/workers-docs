/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql, withAssetPrefix } from 'gatsby'

import Sidebar from './Sidebar'
import SEO from './Seo'
import '../content/static/css/theme.css'
import '../content/static/css/main.css'
import '../content/static/css/overview.css'
import '../content/static/css/code.css'
import '../content/static/css/template.css'
import '../content/static/css/docsearch.min.css'
import '../content/static/css/OpenSans.css'
import { Navigation } from './Navigation'
import Helmet from 'react-helmet'
const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  // TODO get hooks working instead of useStaticQuery in components
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `)

  return (
    <>
      <SEO title={title ? title : data.site.siteMetadata.title} />
      <Navigation />
      <Sidebar />
      <Helmet>
        <script
          type="text/javascript"
          src={withAssetPrefix('/js/docsearch.min.js')}
          async
        />
      </Helmet>
      {children}
    </>
  )
}

type LayoutProps = {
  title?: string
}

export default Layout
