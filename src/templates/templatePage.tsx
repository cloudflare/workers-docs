import React, { } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

import Body from '../components/Body'
import TemplatePage from '../components/TemplatePage';
import { restApiTemplateResult } from '../types/restApiTemplates';
type templateProps = {
  // id: string
  pageContext: any
  data: restApiTemplateResult['data']
}

const Template: React.FC<templateProps> = ({ data, pageContext }) => {
  console.log('data', data)
  console.log('pageContext', pageContext)
  return (
    <>
      <Layout  >
        <Body >
          <TemplatePage data={data.restApiTemplates} id={pageContext.id} />
          {/* <TemplatePage {...{ data, pageContext }} /> */}
        </Body>
      </Layout>
    </>
  )
}
export default Template
export const pageQuery = graphql`query ($id: String!) {
        restApiTemplates(endpointId: {eq: $id}) {
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
}`

