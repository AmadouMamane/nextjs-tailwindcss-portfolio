'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

interface Props {
  children: React.ReactNode
}

export default function GalleryLightbox({ children }: Props) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  // Flatten children into array for mapping
  const images = Array.isArray(children) ? children : [children]

  // Extract image sources from <Image> tags
  const slides = images
    .flatMap((child: any) => {
      if (child?.props?.children) {
        const nested = Array.isArray(child.props.children)
          ? child.props.children
          : [child.props.children]
        return nested
      }
      return [child]
    })
    .map((child: any) => {
      const src = child?.props?.src || child?.props?.children?.props?.src
      return { src }
    })
    .filter((slide) => slide.src)

  const handleOpen = (clickedIndex: number) => {
    setIndex(clickedIndex)
    setOpen(true)
  }

  return (
    <>
      <div className="grid gap-6" onClick={(e) => e.stopPropagation()}>
        {images.map((image: any, i: number) => (
          <div key={i} onClick={() => handleOpen(i)} className="cursor-zoom-in">
            {image}
          </div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        on={{ view: ({ index }) => setIndex(index) }}
        plugins={[Thumbnails]} 
        carousel={{ finite: true }}
        thumbnails={{
          position: 'start',
          showToggle: false,
          vignette: false,
          imageFit: 'cover',
          border: 0,
          padding: 4,
          gap: 10,
          width: 60,
          height: 60
        }}
      />
    </>
  )
}




