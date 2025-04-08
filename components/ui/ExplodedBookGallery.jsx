import Image from 'next/image'
import { motion } from 'framer-motion'

const slugify = (str) =>
  str.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')

export const ExplodedBookGallery = ({
  authorImage,
  authorName,
  authorDescription,
  books = [],
  folder = '',
  section = '',
}) => {
  return (
    <section className="space-y-16 px-4 sm:px-6">
      {/* Author Feature */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mx-auto max-w-4xl"
      >
        <div className="relative mx-auto mb-6 w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-600 shadow-2xl">
          <Image
            src={`${folder}/${section}/${authorImage}`}
            alt={authorName}
            fill
            className="object-cover"
          />
        </div>

        <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light max-w-3xl mx-auto">
          {authorDescription}
        </p>
      </motion.div>

      {/* Books */}
      <div className="space-y-20">
        {books.map((book, idx) => (
          <motion.div
            key={book.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-10 items-start"
          >
            {/* Image */}
            <div className="w-full md:w-1/3 flex-shrink-0">
              <div className="aspect-[3/4] relative w-full rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-700 shadow-xl">
                <Image
                  src={`${folder}/${section}/${book.image}`}
                  alt={book.title}
                  fill
                  className="object-fill"
                />
              </div>
            </div>

            {/* Text */}
            <div className="w-full md:w-2/3 text-gray-900 dark:text-gray-100">
              {/* h3 for TOC support */}
              <h3
                id={slugify(book.title)}
                className="text-2xl sm:text-3xl font-bold leading-snug mb-6 scroll-mt-24"
              >
                {book.title}
              </h3>

              <div className="text-lg sm:text-xl font-light leading-relaxed text-gray-700 dark:text-gray-300 text-justify">
                {book.description}
              </div>
              <div className="pl-10">
              {book.quote && (
                <blockquote className="mt-6 border-l-4 pl-6 border-indigo-500 italic text-base sm:text-lg text-gray-500 dark:text-gray-400">
                  “{book.quote}”
                </blockquote>
              )}
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
