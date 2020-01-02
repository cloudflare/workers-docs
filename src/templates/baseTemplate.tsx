import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import '../static/css/main.css'
import '../static/css/overview.css'
import '../static/css/code.css'
import '../static/css/template.css'
import '../static/js/workers.js'
import { markdownRemark } from '../types/page'

const Template: React.FC<markdownRemark> = ({
  data, // this prop will be injected by the GraphQL query below.
}) => {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html, fields } = markdownRemark
  console.log('markdownRemark', markdownRemark)
  return (
    <>
      <Layout {...{ fields, frontmatter }}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Layout>
    </>
  )
}
export default Template

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { pathToServe: { eq: $path } }) {
      html
      fields {
        filePath
        parent
        pathToServe
      }
      fileAbsolutePath
      frontmatter {
        title
        weight
        showNew
        hidden
        alwaysopen
      }
    }
  }
`
