'use client'

import { useEffect } from 'react'
import basicLightbox from 'basiclightbox'
import 'basiclightbox/dist/basicLightbox.min.css'

export default function GalleryLightbox({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const images = Array.from(document.querySelectorAll('[data-gallery] img'))
    images.forEach((img, index) => {
      img.setAttribute('data-index', index.toString())
      img.addEventListener('click', () => {
        openGallery(index, images)
      })
    })
  }, [])

  const openGallery = (startIndex: number, images: Element[]) => {
    let index = startIndex

    const showImage = () => {
      const src = (images[index] as HTMLImageElement).src
      const instance = basicLightbox.create(
        `
        <div style="position:relative; text-align:center;">
          <img src="${src}" style="max-height:90vh; max-width:100%; border-radius:1rem;" />
          <button id="prev" style="position:absolute;top:50%;left:10px;font-size:2rem;background:none;border:none;color:white;cursor:pointer;">←</button>
          <button id="next" style="position:absolute;top:50%;right:10px;font-size:2rem;background:none;border:none;color:white;cursor:pointer;">→</button>
        </div>
        `,
        {
          onShow: (instance) => {
            const nextBtn = instance.element().querySelector('#next') as HTMLElement
            const prevBtn = instance.element().querySelector('#prev') as HTMLElement

            nextBtn.onclick = () => {
              index = (index + 1) % images.length
              instance.close()
              showImage()
            }

            prevBtn.onclick = () => {
              index = (index - 1 + images.length) % images.length
              instance.close()
              showImage()
            }

            document.onkeydown = (e) => {
              if (e.key === 'ArrowRight') nextBtn.click()
              if (e.key === 'ArrowLeft') prevBtn.click()
              if (e.key === 'Escape') instance.close()
            }
          },
          onClose: () => {
            document.onkeydown = null
          },
        }
      )
      instance.show()
    }

    showImage()
  }

  return <div data-gallery>{children}</div>
}
