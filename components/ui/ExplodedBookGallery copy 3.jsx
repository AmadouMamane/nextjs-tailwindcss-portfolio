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
    <section className="space-y-28">
      {/* Author Intro */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <div className="aspect-square relative w-full max-w-sm mx-auto md:mx-0 overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700 shadow-md">
          <Image
            src={`${folder}/${section}/${authorImage}`}
            alt={authorName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>

        <div className="prose dark:prose-invert prose-lg sm:prose-xl max-w-2xl">
          <h2 className="!mt-0 font-serif text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {authorName}
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {authorDescription}
          </p>
        </div>
      </motion.div>

      {/* Books */}
      {books.map((book, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <motion.div
            key={book.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className={`grid md:grid-cols-2 gap-12 items-start ${
              !isEven ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className="aspect-[3/4] relative w-full max-w-md mx-auto md:mx-0 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-zinc-900">
              <Image
                src={`${folder}/${section}/${book.image}`}
                alt={book.title}
                fill
                className="object-fill p-6"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>

            <div className="prose dark:prose-invert prose-lg sm:prose-xl max-w-2xl">
              <h3 className="!mt-0 font-serif text-3xl font-semibold tracking-tight">
                {book.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {book.description}
              </p>
              {book.quote && (
                <blockquote className="mt-6 border-l-4 border-indigo-400 pl-4 italic text-gray-500 dark:text-gray-400">
                  “{book.quote}”
                </blockquote>
              )}
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};
