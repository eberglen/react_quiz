import * as React from 'react'
import { motion } from 'framer-motion'

function Card({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <motion.div
      className="bg-gray-50 p-6 rounded-md shadow-sm min-w-3/4 m-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

export default Card
