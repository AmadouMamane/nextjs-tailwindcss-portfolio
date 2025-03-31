import Image from 'next/image';
import GalleryLightbox from '../../components/ui/GalleryLightbox';

export const ImageGallery = ({ images }) => (
  <GalleryLightbox>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {images.map((img, idx) => (
        <div key={idx} className="relative w-full h-[400px]">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="rounded-2xl shadow-xl object-cover border border-gray-300 dark:border-gray-600 transition-transform duration-500 hover:scale-105"
          />
        </div>
      ))}
    </div>
  </GalleryLightbox>
);
