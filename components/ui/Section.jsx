import { motion } from 'framer-motion'

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')

export const Section = ({ title, children }) => {
  const id = title ? slugify(title) : null

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative px-4 py-20 sm:px-6 lg:px-24 xl:px-20"
    >
      {title && (
        <h2 id={id} className="text-3xl md:text-4xl font-bold text-center mb-4">
          {title}
        </h2>
      )}
      <div className="space-y-16">{children}</div>
    </motion.section>
  )
}
