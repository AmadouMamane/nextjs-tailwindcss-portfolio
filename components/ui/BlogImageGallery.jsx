import { blogGalleries } from '../../data/blogGalleries'
import { ImageGallery } from './ImageGallery'

export default function BlogImageGallery({ galleryId, ...props }) {
  const images = blogGalleries[galleryId] || []

  return <ImageGallery images={images} {...props} />
}