import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

import { markdownRemarkResult, markdownPageContext } from '../types/markdownRemark'
import Body from '../components/Body'

type markdownBaseProps = {
  data: { markdownRemark: markdownRemarkResult }
  pageContext: markdownPageContext
}
const MarkdownTemplate: React.FC<markdownBaseProps> = ({
  data, // this prop will be injected by the GraphQL query below.
}) => {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html, fields } = markdownRemark
  const { title } = frontmatter
  return (
    <>
      <Layout title={title}  >
        <Body github_edit_url={`https://github.com/cloudflare/workers-docs/edit/master/content${fields.filePath}`}>
          <h1>{frontmatter.title}</h1>
          {html ? (<div dangerouslySetInnerHTML={{ __html: html }} />) : null}
        </Body>
      </Layout>
    </>
  )
}
export default MarkdownTemplate

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
