import { Gallery } from '../components/TemplateGallery/Gallery'
import { Layout } from 'cloudflare-docs-theme'
import React from 'react'
import { Body } from 'cloudflare-docs-theme'

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
