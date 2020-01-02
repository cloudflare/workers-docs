/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './Header'
import Sidebar from './Sidebar'
import SEO from './SEO'
import '../static/css/main.css'
import '../static/css/overview.css'
import '../static/css/code.css'
import '../static/css/template.css'
import '../static/css/theme.css'
import '../static/js/workers.js'
import Li from './Li'
import { Navigation } from './Navigation'

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
      <Navigation />
      <Sidebar />
      <Li>{children}</Li>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: String,
}

export default Layout
