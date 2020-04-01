import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

import Body from '../components/Body'
import TemplatePage from '../components/TemplateGallery/TemplatePage'
import { restApiTemplateResult } from '../types/restApiTemplates'
import { MDXRenderer } from 'gatsby-plugin-mdx'
type templateProps = {
  pageContext: any
  data: {
    restApiTemplates: restApiTemplateResult['data']['restApiTemplates'] | null
    mdx: { body: string } | null
  }
}

const Template: React.FC<templateProps> = ({ data, pageContext }) => {
  const { mdx, restApiTemplates } = data // data.mdx holds our post data

  return (
    <>
      <Layout>
        <Body>
          {restApiTemplates ? <TemplatePage data={restApiTemplates} id={pageContext.id} /> : ''}
          {/* <TemplatePage {...{ data, pageContext }} /> */}
          {mdx ? <MDXRenderer>{mdx.body || ''}</MDXRenderer> : ''}
        </Body>
      </Layout>
    </>
  )
}
export default Template
export const pageQuery = graphql`
  query($id: String!) {
    restApiTemplates(endpointId: { eq: $id }) {
      repository_url
      share_url
      weight
      url
      tags
      title
      endpointId
      description
      type
      code
      demos {
        bar {
          text
          url
        }
        foo {
          text
          url
        }
        main {
          share_url
          tags
          text
          url
        }
      }
    }
    mdx(fields: { templateId: { eq: $id } }) {
      body
    }
  }
`
