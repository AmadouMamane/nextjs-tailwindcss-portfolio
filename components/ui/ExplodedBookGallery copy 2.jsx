import Image from 'next/image';
import { motion } from 'framer-motion';

export const ExplodedBookGallery = ({
  authorImage,
  authorName,
  authorDescription,
  books = [],
  folder = '',
  section = '',
}) => {
  return (
    <div className="space-y-28">
      {/* Author Intro */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-10 items-center"
      >
        <div className="aspect-square relative w-full rounded-xl overflow-hidden border border-gray-300 dark:border-gray-600 shadow-md">
          <Image
            src={`${folder}/${section}/${authorImage}`}
            alt={authorName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="prose dark:prose-invert prose-lg sm:prose-xl max-w-prose">
          <h2 className="!mt-0 tracking-tight text-3xl sm:text-4xl font-semibold">{authorName}</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{authorDescription}</p>
        </div>
      </motion.div>

      {/* Books */}
      {books.map((book, idx) => {
        const imagePath = `${folder}/${section}/${book.image}`;
        const isEven = idx % 2 === 0;

        return (
          <motion.div
            key={book.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className={`grid md:grid-cols-2 gap-10 items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="aspect-[3/4] relative w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 shadow-lg">
              <Image
                src={imagePath}
                alt={book.title}
                fill
                className="object-fill"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="prose dark:prose-invert prose-lg sm:prose-xl max-w-prose">
              <h3 className="!mt-0 text-2xl sm:text-3xl font-medium text-gray-900 dark:text-gray-100">{book.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{book.description}</p>
              {book.quote && (
                <blockquote className="mt-6 border-l-4 border-indigo-400 pl-4 italic text-gray-500 dark:text-gray-400">
                  “{book.quote}”
                </blockquote>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
