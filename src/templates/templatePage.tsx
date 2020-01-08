import React, { useEffect, useState } from 'react'
import { graphql, Link } from 'gatsby'
import { Helmet } from "react-helmet";

import Layout from '../components/Layout'
import '../static/css/main.css'
import '../static/css/overview.css'
import '../static/css/code.css'
import '../static/css/template.css'
import Body from '../components/Body'
import TemplatePage from '../components/TemplatePage';
import { allRestApiTemplates, restApiTemplate, restApiTemplateResult } from '../types/restApiTemplates';
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

const blah: restApiTemplateResult = {
  "data": {
    "restApiTemplates": {
      "repository_url": null,
      "share_url": "/templates/snippets/ab_testing",
      "weight": 1,
      "url": null,
      "tags": null,
      "title": "A/B Testing",
      "endpointId": "ab_testing",
      "description": "Set up an A/B test by controlling what response is served based on cookies",
      "type": "snippet",
      "code": "async function handleRequest(request) {\n  const NAME = 'experiment-0'\n  // Responses below are place holders, you could set up\n  // a custom path for each test (e.g. /control/somepath )\n  const TEST_RESPONSE = new Response('Test group') // fetch('/test/sompath', request)\n  const CONTROL_RESPONSE = new Response('Control group') // fetch('/control/sompath', request)\n  // Determine which group this requester is in.\n  const cookie = request.headers.get('cookie')\n  if (cookie && cookie.includes(`${NAME}=control`)) {\n    return CONTROL_RESPONSE\n  } else if (cookie && cookie.includes(`${NAME}=test`)) {\n    return TEST_RESPONSE\n  } else {\n    // if no cookie then this is a new client, decide a group and set the cookie\n    let group = Math.random() < 0.5 ? 'test' : 'control' // 50/50 split\n    let response = group === 'control' ? CONTROL_RESPONSE : TEST_RESPONSE\n    response.headers.append('Set-Cookie', `${NAME}=${group}; path=/`)\n    return response\n  }\n}\naddEventListener('fetch', event => {\n  event.respondWith(handleRequest(event.request))\n})\n",
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
  }
}