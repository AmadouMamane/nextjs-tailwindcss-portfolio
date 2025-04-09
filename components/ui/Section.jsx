import { motion } from 'framer-motion'

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')

export const Section = ({ title, children, marginTop = 'mt-16' }) => {
  const id = title ? slugify(title) : null

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`relative px-4 sm:px-6 lg:px-10 xl:px-16 py-12 bg-gradient-to-b from-white to-gray-75 dark:from-primary-dark dark:to-primary-dark ${marginTop}`}
    >
      {title && (
        <h2
          id={id}
          className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight text-gray-900 dark:text-gray-100"
        >
          {title}
        </h2>
      )}

      <div className="max-w-screen-xl mx-auto space-y-12 text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
        {children}
      </div>
    </motion.section>
  )
}
