'use client'

import { motion } from 'framer-motion'

interface TokenProps {
  color: string
  isValid?: boolean
  onClick?: () => void
}

export default function Token({ color, isValid, onClick }: TokenProps) {
  return (
    <motion.div
      className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-white shadow-lg cursor-pointer transition-all ${
        isValid ? 'ring-4 ring-primary-500 ring-offset-2' : ''
      }`}
      style={{ backgroundColor: color }}
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      animate={isValid ? { 
        y: [0, -10, 0],
        boxShadow: [
          '0 4px 6px rgba(0,0,0,0.3)',
          '0 10px 20px rgba(255,215,0,0.5)',
          '0 4px 6px rgba(0,0,0,0.3)'
        ]
      } : {}}
      transition={{ 
        repeat: isValid ? Infinity : 0, 
        duration: 0.6,
        ease: 'easeInOut'
      }}
    />
  )
}
