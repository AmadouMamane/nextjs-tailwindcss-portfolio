import { motion } from 'framer-motion'

export const AnimatedSection = ({ children, className = '' }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  )
}

