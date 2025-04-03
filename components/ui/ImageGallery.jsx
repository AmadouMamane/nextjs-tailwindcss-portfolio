import Image from 'next/image';
import GalleryLightbox from '../../components/ui/GalleryLightbox';

export const ImageGallery = ({
  images = [],
  folder = '',
  section = '',
  filenames = [],
  highlightFirst = false,
  galleryClassName = '',
  classMap = {},
}) => {
  const DEFAULT_WIDTH = 600;
  const DEFAULT_HEIGHT = 400;

  const CLASS_STYLE_MAP = {
    'Berlin-marathon': 'rounded-xl border border-red-300 dark:border-red-500 shadow-lg',
    'books': 'rounded-2xl  object-contain border-gray-300 dark:border-gray-600 transition-transform duration-500 hover:scale-105',
    'minimal': 'rounded-none border border-gray-200 dark:border-gray-600 shadow-sm',
    'vintage': 'rounded-xl sepia border border-yellow-500 shadow-xl',
    default: 'rounded-2xl shadow-xl object-cover border border-gray-300 dark:border-gray-600 transition-transform duration-500 hover:scale-105',
    ...classMap,
  };

  const resolvedImageClass = CLASS_STYLE_MAP[galleryClassName] || CLASS_STYLE_MAP['default'];

  const combinedImages = [
    ...images,
    ...filenames.map((filename) => ({
      src: `${folder}/${section}/${filename}`,
      alt: filename.replace(/[-_]/g, ' ').replace(/\.\w+$/, ''),
    })),
  ];

  return (
    <GalleryLightbox>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {combinedImages.map((img, idx) => {
          const isFirst = idx === 0 && highlightFirst;
          const width = img.width || DEFAULT_WIDTH;
          const height = img.height || DEFAULT_HEIGHT;

          return (
            <div
              key={idx}
              className={`relative w-full ${
                isFirst ? 'md:col-span-2 h-[500px]' : 'h-[400px]'
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={width}
                height={height}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`${resolvedImageClass} transition-transform duration-500 hover:scale-105`}
              />
            </div>
          );
        })}
      </div>
    </GalleryLightbox>
  );
};


