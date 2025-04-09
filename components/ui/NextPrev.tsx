import Link from 'next/link'
import { motion } from 'framer-motion'
import Container from '../layout/Container';

export default function NextPrev({ prev, next, isBlog=true}) {
  if (!prev && !next) return null

  return (

    <section className="relative w-full mt-32 mb-30">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="mx-auto max-w-[1800px] border-t border-gray-200 dark:border-gray-500 pt-8"
    >
        
        <div className="text-center uppercase text-xl md:text-2xl font-semibold tracking-wide text-gray-900 dark:text-white mb-8">

        <div className="w-16 h-1 bg-indigo-500 mx-auto mb-3  rounded-full" />
  Continue Reading 
</div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-y-0 gap-x-48 text-left md:text-center mt-0">
          {prev && (
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 120, damping: 16 }}
              className="w-full md:w-1/2"
            >
              <div className="text-sm uppercase tracking-wide text-gray-400 mb-2 text-center">
                Previous
              </div>
              <Link
                href={`/blog/${prev.slug}`}
                className="block text-md md:text-xl font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                ← {prev.title}
              </Link>
            </motion.div>
          )}

          {next && (
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 120, damping: 16 }}
              className="w-full md:w-1/2 text-center"
            >
              <div className="text-sm uppercase tracking-wide text-gray-400 mb-2 ">
                Next
              </div>
              <Link
                href={`/blog/${next.slug}`}
                className="block text-md md:text-xl font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {next.title} →
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>

  )
}
