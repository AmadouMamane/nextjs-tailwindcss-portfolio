import { motion } from 'framer-motion'

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')

export const Section = ({ title, children,  marginTop = 'mt-4' }) => {
  const id = title ? slugify(title) : null

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`relative px-4 py-24 sm:px-6 lg:px-24 xl:px-20 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 ${marginTop}`}

    >
      {title && (
        <h2 id={id} className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">
          {title}
        </h2>
      )}
      <div className="space-y-12">{children}</div>
      
    </motion.section>

    
  )
}



