/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Sidebar from './Sidebar'
import SEO from './SEO'
// import '../static/css/main.css'
// import '../static/css/overview.css'
// import '../static/css/code.css'
// import '../static/css/template.css'
// import '../static/css/theme.css'// style loader
// import '../static/js/workers.js'
import Body from './Body'
import { Navigation } from './Navigation'
import { FrontMattter, Fields } from '../types/page'
const Layout: React.FC<LayoutProps> = ({ title, children }) => {
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
