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
import '../static/css/main.css'
import '../static/css/overview.css'
import '../static/css/code.css'
import '../static/css/template.css'
import '../static/css/theme.css'
// import '../static/js/workers.js'
import Body from './Body'
import { Navigation } from './Navigation'
import { FrontMattter, Fields } from '../types/page'
const Layout: React.FC<LayoutProps> = ({ frontmatter, fields, children }) => {
  const data = useStaticQuery(graphql`
  query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
    `)
  const title = frontmatter ? frontmatter.title : data.site.siteMetadata.title

  return (
    <>
      <SEO title={title} />
      <Navigation />
      <Sidebar />
      <Body {...{ title, frontmatter, fields }}>{children}</Body>
    </>
  )
}

type LayoutProps = {
  frontmatter: FrontMattter
  fields: Fields
}

export default Layout
