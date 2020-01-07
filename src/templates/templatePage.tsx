import React, { useEffect, useState } from 'react'
import { graphql, Link } from 'gatsby'
import { Helmet } from "react-helmet";

import Layout from '../components/Layout'
import '../static/css/main.css'
import '../static/css/overview.css'
import '../static/css/code.css'
import '../static/css/template.css'
import { template } from "../types/page"
import Body from '../components/Body'
import TemplatePage from '../components/TemplatePage';
type templateProps = {
  // id: string
  pageContext: any
  data: { restApiTemplates: template }
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
const blah: template = {
  "repository_url": null,
  "share_url": "/templates/snippets/ab_testing",
  "weight": 1,
  "url": null,
  "tags": null,
  code: null,
  "title": "A/B Testing",
  "endpointId": "ab_testing",
  "description": "Set up an A/B test by controlling what response is served based on cookies",
  "type": "snippet",
  "demos": {
    "bar": null,
    "foo": null,
    "main": {
      "share_url": null,
      "tags": null,
      "text": "Demo",
      "url": "https://cloudflareworkers.com/#12a2962014e1324e3a416a5a76e1f81f:https://tutorial.cloudflareworkers.com"
    }
  }
}