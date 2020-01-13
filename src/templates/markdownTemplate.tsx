import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

import { markdownRemarkResult, markdownPageContext } from '../types/mdx'
import Body from '../components/Body'
import { MDXRenderer } from "gatsby-plugin-mdx"

type markdownBaseProps = {
  data: { mdx: markdownRemarkResult }
  pageContext: markdownPageContext
}
const MarkdownTemplate: React.FC<markdownBaseProps> = ({
  data, // this prop will be injected by the GraphQL query below.
  pageContext
}) => {
  if (data && !data.mdx) {
    console.log('data', data)

    console.log('pageContext', pageContext)
  }
  if (!data) {
    console.log('pageContext', pageContext)

  }
  const { mdx } = data // data.mdx holds our post data
  const { frontmatter, body, fields } = mdx
  const { title } = frontmatter
  return (
    <>
      <Layout title={title}  >
        <Body github_edit_url={`https://github.com/cloudflare/workers-docs/edit/master/src/content${fields.filePath}`}>
          <h1>{frontmatter.title}</h1>
          {/* {html ? (<div dangerouslySetInnerHTML={{ __html: html }} />) : null} */}
          <MDXRenderer>{body || ""}</MDXRenderer>
        </Body>
      </Layout>
    </>
  )
}
export default MarkdownTemplate

export const pageQuery = graphql`
  query($path: String!) {
    mdx(fields: { pathToServe: { eq: $path } }) {
      body
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
