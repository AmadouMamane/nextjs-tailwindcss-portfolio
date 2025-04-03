// components/ui/ExplodedBookGallery.jsx
import Image from 'next/image';

export const ExplodedBookGallery = ({
  authorImage,
  authorName,
  authorDescription,
  books = [],
  folder = '',
  section = '',
}) => {
  return (
    <div className="space-y-20">
      {/* Loop over books */}
      {books.map((book, idx) => {
        const imagePath = `${folder}/${section}/${book.image}`;
        const isEven = idx % 2 === 0;

        return (
          <div key={book.title} className={`grid md:grid-cols-2 gap-10 items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}>
            <div className="aspect-[3/4] relative w-full rounded-2xl overflow-hidden shadow-xl border border-gray-300 dark:border-gray-600">
              <Image
                src={imagePath}
                alt={book.title}
                fill
                className="object-fill w-full h-full"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="prose dark:prose-invert prose-lg sm:prose-xl">
              <h3 className="!mt-0">{book.title}</h3>
              <p>{book.description}</p>
            </div>
          </div>
        );
      })}

      {/* Author Info */}
      {authorImage && (
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="aspect-square relative w-full rounded-2xl overflow-hidden shadow-xl border border-gray-300 dark:border-gray-600">
            <Image
              src={`${folder}/${section}/${authorImage}`}
              alt={authorName}
              fill
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="prose dark:prose-invert prose-lg sm:prose-xl">
            <h3 className="!mt-0">{authorName}</h3>
            <p>{authorDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
};
