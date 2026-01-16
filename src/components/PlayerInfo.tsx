'use client'

import { motion } from 'framer-motion'
import { Bot, User } from 'lucide-react'
import { Player } from '@/types/game'

interface PlayerInfoProps {
  player: Player
  isActive: boolean
}

export default function PlayerInfo({ player, isActive }: PlayerInfoProps) {
  return (
    <motion.div
      className={`card relative overflow-hidden ${
        isActive ? 'ring-4 ring-primary-500' : ''
      }`}
      style={{ borderLeft: `4px solid ${player.color}` }}
      animate={isActive ? { 
        scale: [1, 1.02, 1],
        boxShadow: [
          '0 10px 30px rgba(0,0,0,0.3)',
          '0 15px 40px rgba(255,215,0,0.4)',
          '0 10px 30px rgba(0,0,0,0.3)'
        ]
      } : {}}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      {/* Active Indicator */}
      {isActive && (
        <motion.div
          className="absolute top-0 right-0 bg-primary-500 text-dark-900 px-3 py-1 rounded-bl-xl text-xs font-bold"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
        >
          ACTIVE
        </motion.div>
      )}
      
      <div className="flex items-center gap-3">
        {/* Player Avatar */}
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-black shadow-lg"
          style={{ backgroundColor: player.color }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {player.isAI ? <Bot className="w-6 h-6 text-white" /> : <User className="w-6 h-6 text-white" />}
        </motion.div>
        
        {/* Player Info */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm md:text-base truncate" style={{ color: player.color }}>
            {player.username}
          </p>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <span>Tokens Home:</span>
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < player.tokensHome ? 'bg-accent-green' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-white">{player.tokensHome}/4</span>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-green to-primary-500"
          initial={{ width: 0 }}
          animate={{ width: `${(player.tokensHome / 4) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  )
}
