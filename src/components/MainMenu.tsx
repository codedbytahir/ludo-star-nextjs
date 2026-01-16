'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Users, Bot, TrendingUp, Edit2, Check, X } from 'lucide-react'
import { User } from '@/types/game'
import { updateUsername, getUserStats } from '@/lib/userUtils'
import ParticleBackground from './ParticleBackground'

interface MainMenuProps {
  user: User
  setUser: (user: User) => void
  onStartGame: (mode: 'quick' | 'offline' | 'local') => void
}

export default function MainMenu({ user, setUser, onStartGame }: MainMenuProps) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState(user.username)
  const [showStats, setShowStats] = useState(false)
  
  const stats = getUserStats()
  const winRate = stats.gamesPlayed > 0 
    ? ((stats.wins / stats.gamesPlayed) * 100).toFixed(1) 
    : 0

  const handleNameChange = () => {
    if (tempName.trim()) {
      const updatedUser = updateUsername(user, tempName.trim())
      setUser(updatedUser)
      setIsEditingName(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <ParticleBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full z-10"
      >
        {/* Title */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl md:text-7xl font-black text-primary-500 mb-4 text-glow animate-glow">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              🎲
            </motion.span>
            {' '}LUDO STAR
            <motion.span
              className="text-3xl md:text-4xl text-accent-green ml-3"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              2.0
            </motion.span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-semibold">
            Play Anytime, Anywhere - No Signup Required! ✨
          </p>
        </motion.div>

        {/* User Card */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="card mb-6"
        >
          {!isEditingName ? (
            <div 
              className="flex items-center justify-between cursor-pointer group"
              onClick={() => setIsEditingName(true)}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <p className="text-xl font-bold text-accent-green">{user.username}</p>
                  <p className="text-sm text-white/60">ID: {user.id.slice(0, 8)}</p>
                </div>
              </div>
              <Edit2 className="w-5 h-5 text-white/40 group-hover:text-primary-500 transition-colors" />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleNameChange()}
                maxLength={20}
                autoFocus
                className="flex-1 bg-white/10 border-2 border-primary-500 rounded-xl px-4 py-2 text-white font-semibold outline-none"
              />
              <button
                onClick={handleNameChange}
                className="p-2 bg-accent-green rounded-lg hover:scale-110 transition-transform"
              >
                <Check className="w-5 h-5 text-dark-900" />
              </button>
              <button
                onClick={() => {
                  setTempName(user.username)
                  setIsEditingName(false)
                }}
                className="p-2 bg-accent-red rounded-lg hover:scale-110 transition-transform"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          )}
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="card mb-8 cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setShowStats(!showStats)}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-500" />
              <span className="font-bold text-lg">Your Stats</span>
            </div>
            <motion.span
              animate={{ rotate: showStats ? 180 : 0 }}
              className="text-white/60"
            >
              ▼
            </motion.span>
          </div>
          
          {showStats && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20"
            >
              <div className="text-center">
                <p className="text-2xl font-black text-primary-500">{stats.gamesPlayed}</p>
                <p className="text-sm text-white/60">Games</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-accent-green">{stats.wins}</p>
                <p className="text-sm text-white/60">Wins</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-accent-blue">{winRate}%</p>
                <p className="text-sm text-white/60">Win Rate</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Menu Buttons */}
        <div className="space-y-4">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStartGame('quick')}
            className="w-full btn-primary relative overflow-hidden group"
          >
            <div className="flex items-center justify-center gap-3 relative z-10">
              <Zap className="w-6 h-6" />
              <div className="text-left">
                <p className="text-xl font-black">QUICK PLAY</p>
                <p className="text-sm font-normal opacity-80">Play with AI Opponents</p>
              </div>
            </div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-300 to-primary-700"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStartGame('offline')}
            className="w-full btn-secondary relative overflow-hidden group"
          >
            <div className="flex items-center justify-center gap-3 relative z-10">
              <Bot className="w-6 h-6" />
              <div className="text-left">
                <p className="text-xl font-black">OFFLINE MODE</p>
                <p className="text-sm font-normal opacity-80">Challenge AI Players</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStartGame('local')}
            className="w-full btn-secondary relative overflow-hidden group"
          >
            <div className="flex items-center justify-center gap-3 relative z-10">
              <Users className="w-6 h-6" />
              <div className="text-left">
                <p className="text-xl font-black">LOCAL PLAY</p>
                <p className="text-sm font-normal opacity-80">Pass & Play with Friends</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert('Online Multiplayer coming soon! 🚀')}
            className="w-full btn-tertiary relative overflow-hidden"
          >
            <div className="flex items-center justify-center gap-3 relative z-10">
              <Sparkles className="w-6 h-6" />
              <div className="text-left">
                <p className="text-xl font-black">ONLINE MULTIPLAYER</p>
                <p className="text-sm font-normal opacity-80">Coming Soon! 🚀</p>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex justify-center gap-4"
        >
          <button 
            className="glass-effect px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all"
            onClick={() => alert('Game Rules:\n\n1. Roll a 6 to move tokens out\n2. Land on opponents to capture them\n3. Safe squares (⭐) protect tokens\n4. First to get all 4 tokens home wins!\n5. Rolling 6 gives extra turn')}
          >
            📖 How to Play
          </button>
          <button 
            className="glass-effect px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all"
            onClick={() => alert('Settings coming soon!')}
          >
            ⚙️ Settings
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
