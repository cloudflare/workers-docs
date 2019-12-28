/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'
import Sidebar from './sidebar'
import SEO from './seo'
import '../static/css/main.css'
import '../static/css/overview.css'
import '../static/css/code.css'
import '../static/css/template.css'
import '../static/css/theme.css'
import '../static/js/workers.js'
import Li from './li'

const Layout = ({ children, title }: any) => {
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
      <SEO title={title || data.site.siteMetadata.title} />
      <Sidebar isAncestor={true} />
      <Li>{children}</Li>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: String,
}

export default Layout
