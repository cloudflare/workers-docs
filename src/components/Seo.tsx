/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({ description, lang, meta, title }: SEOPropTypes) => {
  // TODO get hooks working instead of useStaticQuery in components
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <script>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','cfDataLayer','GTM-PKQFGQB');`}</script>
      <script type="text/javascript" src="https://cdn.bizible.com/scripts/bizible.js"></script>

      <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />
      <link
        rel="icon"
        sizes="32x32"
        href="https://www.cloudflare.com/img/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        sizes="16x16"
        href="https://www.cloudflare.com/img/favicon/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://www.cloudflare.com/img/favicon/apple-touch-icon.png"
      />
      {/* <script>
        {`  docsearch({
        apiKey: '4c1a7e1b6289032a8e8fd1dbbae112a3',
        indexName: 'cloudflare',
        inputSelector: '#docsearch-input'
      });`}
      </script> */}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

type SEOPropTypes = {
  description: string
  lang: string
  meta: any[]
  title: string
}

export default SEO
