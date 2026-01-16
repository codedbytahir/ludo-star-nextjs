'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function ParticleBackground() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 10,
    duration: 10 + Math.random() * 10,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{ left: particle.left }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{
            y: '-100vh',
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
