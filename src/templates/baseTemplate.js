import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Li from '../components/li'
import Head from '../components/head'
import '../static/css/main.css'
import '../static/css/overview.css'
import '../static/css/code.css'
import '../static/css/template.css'
import '../static/js/workers.js'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <>
      <Head />
      <Layout title={frontmatter.title}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
