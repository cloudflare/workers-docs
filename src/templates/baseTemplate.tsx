import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import '../static/css/main.css'
import '../static/css/overview.css'
import '../static/css/code.css'
import '../static/css/template.css'
import { markdownRemarkResult, markdownPageContext, markdownRemark } from '../types/markdownRemark'
import Body from '../components/Body'

type markdownBaseProps = {
  data: { markdownRemark: markdownRemarkResult }
  pageContext: markdownPageContext
}
const Template: React.FC<markdownBaseProps> = ({
  data, // this prop will be injected by the GraphQL query below.
  pageContext,
  children

}) => {
  console.log('pageContext', pageContext)
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
const mark: markdownRemark = {
  "html": "<p>These templates are simple building blocks for developing Workers scripts.</p>\n<div style=\"display: flex\">\n  <div style=\"flex: 2; margin-right: 16px;\">\n    <label style=\"font-weight: normal; color: #666;\">Search templates</label>\n    <input id=\"search\" placeholder=\"🔎 Search by template name or other details\" style=\"padding: 10px; width: 100%\"></input>\n  </div>\n  <div style=\"flex: 1; margin-right: 16px;\">\n    <label style=\"font-weight: normal; color: #666;\">Type</label>\n    <select id=\"type\" style=\"width: 100%\">\n      <option>All</option>\n      <option>Boilerplates</option>\n      <option>Snippets</option>\n      <option value=\"featured_boilerplates\">Featured</option>\n    </select>\n  </div>\n</div>\n<div id=\"empty\" style=\"display: none; margin-top: 20px;\">\n<p>No results were found for your search. Try adjusting your search.</p>\n</div>\n<p>{{<gallery>}}</p>\n<p>The gallery is actively growing. The <a href=\"https://github.com/victoriabernard92/workers-template-creator\">template creator</a> allows you to share templates. Host a public repo, and then run <code>wrangler generate <a href=\"https://github.com/\">https://github.com/</a><your-repo></code>.</p>\n<p>For archived recipes, see <a href=\"https://developers.cloudflare.com/workers/recipes/\">the old docs</a>.</p>\n</div>\n<script src=\"https://unpkg.com/lunr/lunr.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js\" integrity=\"sha256-VeNaFBVDhoX3H+gJ37DpT/nTuZTdjYro9yBruHjVmoQ=\" crossorigin=\"anonymous\"></script>\n<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css\">\n<script src=\"https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js\"></script>\n<script src=\"/js/templates.js\"></script>",
  "fields": {
    "filePath": "/templates/_index.md",
    "parent": "/",
    "pathToServe": "/workers/templates"
  },
  "fileAbsolutePath": "/Users/victoriabernard/my-repos/gatsby-site/src/markdown-pages/templates/_index.md",
  "frontmatter": {
    "title": "Template Gallery",
    "weight": 2,
    "showNew": null,
    "hidden": null,
    "alwaysopen": true
  }
}