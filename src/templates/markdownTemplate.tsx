import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

import { markdownRemarkResult, markdownPageContext } from '../types/mdx'
import Body from '../components/Body'
import { Gallery } from '../components/TemplateGallery/Gallery'
import { Link, Image } from '../components/Link'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

type markdownBaseProps = {
  data: { mdx: markdownRemarkResult }
  pageContext: markdownPageContext
}
const getChildrenAsString = (
  props: React.HtmlHTMLAttributes<HTMLHeadingElement>
) => {
  if (typeof props.children === 'string') {
   // replace all not alphanumeric characters with dashes
    return props.children.replace(/(\s|\W)+/g, '-').toLowerCase()
  }
  // TODO if we'd like headers with children to still have IDs
  // then we can test and uncomment this code
  // if (props.children) {
  //   const textChild = Object.keys(props.children).map(key => {
  //     let child = props.children[key]
  //     return typeof child === 'string' ? child : ''
  //   })[0]
  //   return textChild ? textChild.replace(/\s+/g, '-').toLowerCase() : ''
  // }

  return ''
}
const components = {
  Gallery,
  a: (props: any) => {
    return <Link to={props.href} {...props} />
  },
  img: (props: any) => {
    return <Image src={props.src} {...props} />
  },
  h1: (props: React.HtmlHTMLAttributes<HTMLHeadingElement>) => {
    return <h1 id={getChildrenAsString(props)} {...props} />
  },
  h2: (props: React.HtmlHTMLAttributes<HTMLHeadingElement>) => {
    return <h2 id={getChildrenAsString(props)} {...props} />
  },
  h3: (props: React.HtmlHTMLAttributes<HTMLHeadingElement>) => {
    return <h3 id={getChildrenAsString(props)} {...props} />
  },
  h4: (props: React.HtmlHTMLAttributes<HTMLHeadingElement>) => {
    return <h4 id={getChildrenAsString(props)} {...props} />
  },
}
const MarkdownTemplate: React.FC<markdownBaseProps> = ({
  data, // this prop will be injected by the GraphQL query below.
}) => {
  const { mdx } = data // data.mdx holds our post data
  const { frontmatter, body, fields } = mdx
  const { title } = frontmatter
  return (
    <>
      <Layout title={title}>
        <Body
          archived={fields.filePath.includes('/archive/')}
          github_edit_url={`https://github.com/cloudflare/workers-docs/edit/master/src/content${fields.filePath}`}
        >
          <h1>{frontmatter.title}</h1>
          <MDXProvider components={components}>
            <MDXRenderer>{body || ''}</MDXRenderer>
          </MDXProvider>
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
