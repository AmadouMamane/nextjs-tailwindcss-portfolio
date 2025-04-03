import Image from 'next/image';
import { motion } from 'framer-motion';

const slugify = (str) =>
    str.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  

export const ExplodedBookGallery = ({
  authorImage,
  authorName,
  authorDescription,
  books = [],
  folder = '',
  section = '',
}) => {
  return (
    <section className="space-y-20">
      {/* Author Feature */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mx-auto"
      >
        <div className="relative mx-auto mb-10 w-42 h-42 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-600 shadow-2xl">
          <Image
            src={`${folder}/${section}/${authorImage}`}
            alt={authorName}
            fill
            className="object-cover"
          />
        </div>


        <p className="mt-6 text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-snug max-w-4xl mx-auto font-light">
          {authorDescription}
        </p>
      </motion.div>

      {/* Books */}
      <div className="space-y-20">
        {books.map((book, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={book.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`grid md:grid-cols-12 gap-12 md:gap-20  ${
                isEven ? '' : 'md:flex-row-reverse'
              }`}
            >
              {/* Image */}
              <div className="md:col-span-4">
                <div className="aspect-[3/4] relative w-full rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-700 shadow-xl">
                  <Image
                    src={`${folder}/${section}/${book.image}`}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="md:col-span-8">
                <h3 id={slugify(book.title)} className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white leading-tight mb-6">
                  {book.title}
                </h3>

                <div className="text-xl sm:text-[1.3rem] text-gray-700 dark:text-gray-300 tracking-wide font-light text-justify">
                  {book.description}
                </div>

                {book.quote && (
                  <blockquote className="mt-8 border-l-4 ml-8 border-indigo-500 pl-6 text-xl italic text-gray-500 dark:text-gray-400">
                    “{book.quote}”
                  </blockquote>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
