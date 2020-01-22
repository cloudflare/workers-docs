/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Sidebar from './Sidebar'
import SEO from './Seo'
// import "../content/static"
// import "../content/static/js/docsearch.min.js"
// import "/static/js/workers.js"
import '../content/static/css/theme.css'
import '../content/static/css/main.css'
import '../content/static/css/overview.css'
import '../content/static/css/code.css'
import '../content/static/css/template.css'
import { Navigation } from './Navigation'
const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  // TODO get hooks working instead of useStaticQuery in components
  const data = useStaticQuery(graphql`
  query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
    `)

  return (
    <>
      <SEO title={title ? title : data.site.siteMetadata.title} />
      <Navigation />
      <Sidebar />
      {children}
    </>
  )
}

type LayoutProps = {
  title?: string
}

export default Layout
