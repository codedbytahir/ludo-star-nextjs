'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Trophy, Medal, Award, Home, RotateCcw } from 'lucide-react'
import { Player } from '@/types/game'

interface GameOverModalProps {
  winner: Player
  rankings: Player[]
  onPlayAgain: () => void
  onBackToMenu: () => void
}

export default function GameOverModal({ winner, rankings, onPlayAgain, onBackToMenu }: GameOverModalProps) {
  useEffect(() => {
    // Epic confetti celebration
    const duration = 5000
    const end = Date.now() + duration

    const colors = ['#FFD700', '#06FFA5', '#E63946', '#3A86FF', '#9D4EDD']

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()

    // Fireworks effect
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors
      })
    }, 500)
  }, [])

  const getMedalIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-8 h-8 text-primary-500" />
      case 1:
        return <Medal className="w-8 h-8 text-gray-400" />
      case 2:
        return <Award className="w-8 h-8 text-orange-600" />
      default:
        return <span className="text-2xl">#{index + 1}</span>
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onBackToMenu()}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 100 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.6, bounce: 0.4 }}
        className="card max-w-md w-full text-center relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-green/20 animate-pulse-slow" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Trophy Animation */}
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-4"
          >
            <Trophy className="w-24 h-24 mx-auto text-primary-500 drop-shadow-2xl" />
          </motion.div>
          
          {/* Winner Title */}
          <motion.h2
            className="text-4xl md:text-5xl font-black text-primary-500 mb-2 text-glow"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎉 WINNER! 🎉
          </motion.h2>
          
          {/* Winner Name */}
          <motion.p
            className="text-2xl md:text-3xl font-bold text-accent-green mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {winner.username}
          </motion.p>
          
          {/* Rankings */}
          <div className="space-y-2 mb-6">
            <h3 className="text-lg font-bold text-white/80 mb-3">Final Rankings</h3>
            {rankings.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                  index === 0 
                    ? 'bg-primary-500/20 ring-2 ring-primary-500' 
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  {getMedalIcon(index)}
                  <div className="text-left">
                    <p className="font-semibold">{player.username}</p>
                    {player.isAI && <p className="text-xs text-white/60">AI Player</p>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-accent-green">{player.tokensHome}/4</p>
                  <p className="text-xs text-white/60">tokens home</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              onClick={onPlayAgain}
              className="flex-1 btn-primary flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-5 h-5" />
              <span>Play Again</span>
            </motion.button>
            <motion.button
              onClick={onBackToMenu}
              className="flex-1 btn-secondary flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5" />
              <span>Main Menu</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
