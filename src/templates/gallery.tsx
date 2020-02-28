import { Gallery } from '../components/TemplateGallery/Gallery'
import Layout from '../components/Layout'
import React from 'react'
import Body from '../components/Body'

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
