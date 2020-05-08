import { Gallery } from '../components/TemplateGallery/Gallery'
import { Layout } from 'gatsby-theme-cloudflare-docs'
import React from 'react'
import { Body } from 'gatsby-theme-cloudflare-docs'

const GalleryTemplate: React.FC<any> = ({}) => {
  return (
    <Layout title="Template Gallery">
      <Body>
        <Gallery />
      </Body>
    </Layout>
  )
}
export default GalleryTemplate
