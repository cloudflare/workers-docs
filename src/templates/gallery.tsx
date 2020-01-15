import { Gallery } from "../components/Gallery"
import Layout from "../components/Layout"
import React from 'react'
import Body from "../components/Body"

const MarkdownTemplate: React.FC<any> = ({
  // data, // this prop will be injected by the GraphQL query below.
  // pageContext
}) => {

  // const { mdx } = data // data.mdx holds our post data
  // const { frontmatter, body, fields } = mdx
  // const { title } = frontmatter
  return (
    <>
      <Layout >
        <Body >
          {/* <h1>{frontmatter.title}</h1> */}
          {/* {html ? (<div dangerouslySetInnerHTML={{ __html: html }} />) : null} */}
          <Gallery />
        </Body>
      </Layout>
    </>
  )
}
export default MarkdownTemplate