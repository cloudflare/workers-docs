/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

const Li = ({ children }: any) => {
  const data = useStaticQuery(graphql`
    query SiteLiTitle {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <section id="body">
        <div className="padding highlightable">
          <a
            className="github-edit"
            href={`https://github.com/cloudflare/workers-docs/edit/master/content/${'sd'}`}
          >
            <img src="/images/github.svg" />
            <span>Edit on Github</span>
          </a>
          {children}
        </div>
      </section>
    </>
  )
}

Li.propTypes = {
  children: PropTypes.node.isRequired,
  title: String,
}

export default Li
