'use client'

import { motion } from 'framer-motion'
import { Dices } from 'lucide-react'
import { Player } from '@/types/game'

interface DiceProps {
  value: number | null
  isRolling: boolean
  onRoll: () => void
  disabled: boolean
  currentPlayer: Player
}

export default function Dice({ value, isRolling, onRoll, disabled, currentPlayer }: DiceProps) {
  const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
  
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
      {/* Dice Display */}
      <motion.div
        className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl shadow-2xl flex items-center justify-center text-5xl md:text-6xl font-black text-dark-900 cursor-pointer select-none"
        animate={isRolling ? { 
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.1, 1, 1.1, 1]
        } : {}}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        whileHover={!disabled ? { scale: 1.1 } : {}}
        onClick={!disabled ? onRoll : undefined}
      >
        {value ? diceFaces[value - 1] : '?'}
      </motion.div>
      
      {/* Roll Button */}
      <motion.button
        onClick={onRoll}
        disabled={disabled}
        className={`px-6 py-3 md:px-8 md:py-4 rounded-2xl font-bold text-lg md:text-xl shadow-lg transition-all ${
          disabled 
            ? 'bg-gray-500 cursor-not-allowed opacity-50' 
            : 'bg-gradient-to-br from-primary-400 to-primary-600 text-dark-900 hover:shadow-2xl'
        }`}
        whileHover={!disabled ? { scale: 1.05, y: -5 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        <div className="flex items-center gap-2">
          <Dices className="w-6 h-6" />
          <span>ROLL DICE</span>
        </div>
      </motion.button>
      
      {/* Current Player Indicator */}
      {!disabled && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl"
        >
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: currentPlayer.color }}
          />
          <span className="font-semibold text-sm">{currentPlayer.username}'s turn</span>
        </motion.div>
      )}
    </div>
  )
}
