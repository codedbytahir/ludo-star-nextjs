# Remaining Components to Implement

Create these files in `src/components/` directory:

## 1. Board.tsx
```tsx
'use client'

import { motion } from 'framer-motion'
import { GameState } from '@/types/game'
import Token from './Token'

interface BoardProps {
  gameState: GameState
  onTokenClick: (tokenIndex: number) => void
}

export default function Board({ gameState, onTokenClick }: BoardProps) {
  const colors = ['#E63946', '#06FFA5', '#FFD700', '#3A86FF']
  
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative w-full max-w-[500px] aspect-square bg-white rounded-3xl shadow-2xl p-4"
    >
      {/* Board Grid - Simplified for demo */}
      <div className="grid grid-cols-15 grid-rows-15 gap-0.5 h-full">
        {/* Home Bases */}
        <div className="col-span-6 row-span-6 bg-accent-red/20 rounded-tl-2xl p-4 grid grid-cols-2 grid-rows-2 gap-2">
          {/* Red tokens */}
          {gameState.players[0].tokens.map((token, idx) => (
            token.position === -1 && (
              <div key={idx} className="bg-white/30 rounded-full flex items-center justify-center">
                <Token
                  color={colors[0]}
                  isValid={gameState.validMoves.includes(idx) && gameState.currentPlayerIndex === 0}
                  onClick={() => onTokenClick(idx)}
                />
              </div>
            )
          ))}
        </div>
        
        {/* Add other home bases similarly */}
        {/* Center area, paths, etc. */}
      </div>
    </motion.div>
  )
}
```

## 2. Token.tsx
```tsx
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
      className={`token ${isValid ? 'token-valid' : ''}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      animate={isValid ? { y: [0, -10, 0] } : {}}
      transition={{ repeat: isValid ? Infinity : 0, duration: 0.5 }}
    />
  )
}
```

## 3. Dice.tsx
```tsx
'use client'

import { motion } from 'framer-motion'
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
    <div className="flex items-center gap-6">
      <motion.div
        className="dice-face"
        animate={isRolling ? { rotate: 360 } : {}}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {value ? diceFaces[value - 1] : '?'}
      </motion.div>
      
      <motion.button
        onClick={onRoll}
        disabled={disabled}
        className="btn-primary"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🎲 ROLL DICE
      </motion.button>
    </div>
  )
}
```

## 4. PlayerInfo.tsx
```tsx
'use client'

import { motion } from 'framer-motion'
import { Player } from '@/types/game'

interface PlayerInfoProps {
  player: Player
  isActive: boolean
}

export default function PlayerInfo({ player, isActive }: PlayerInfoProps) {
  return (
    <motion.div
      className={`card ${isActive ? 'ring-4 ring-primary-500 animate-pulse-slow' : ''}`}
      style={{ borderColor: player.color }}
      animate={isActive ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 1, repeat: Infinity }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-black"
          style={{ backgroundColor: player.color }}
        >
          {player.isAI ? '🤖' : '👤'}
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm truncate">{player.username}</p>
          <p className="text-xs text-white/60">Home: {player.tokensHome}/4</p>
        </div>
      </div>
    </motion.div>
  )
}
```

## 5. GameOverModal.tsx
```tsx
'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Trophy, Medal } from 'lucide-react'
import { Player } from '@/types/game'

interface GameOverModalProps {
  winner: Player
  rankings: Player[]
  onPlayAgain: () => void
  onBackToMenu: () => void
}

export default function GameOverModal({ winner, rankings, onPlayAgain, onBackToMenu }: GameOverModalProps) {
  useEffect(() => {
    // Confetti celebration
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#06FFA5', '#E63946', '#3A86FF']
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#06FFA5', '#E63946', '#3A86FF']
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="card max-w-md w-full text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <Trophy className="w-24 h-24 mx-auto text-primary-500 mb-4" />
        </motion.div>
        
        <h2 className="text-4xl font-black text-primary-500 mb-2">WINNER!</h2>
        <p className="text-2xl font-bold text-accent-green mb-6">{winner.username}</p>
        
        <div className="space-y-2 mb-6">
          {rankings.map((player, index) => (
            <div
              key={player.id}
              className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {index === 0 && '🥇'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                  {index === 3 && '4️⃣'}
                </span>
                <span className="font-semibold">{player.username}</span>
              </div>
              <span className="text-sm text-white/60">{player.tokensHome}/4 home</span>
            </div>
          ))}
        </div>
        
        <div className="flex gap-3">
          <button onClick={onPlayAgain} className="flex-1 btn-primary">
            Play Again
          </button>
          <button onClick={onBackToMenu} className="flex-1 btn-secondary">
            Main Menu
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
```

## Quick Setup

1. Create each file in `src/components/`
2. Copy the code above
3. Run `npm install` to ensure all dependencies are installed
4. Run `npm run dev` to start development server

## Deploy to Vercel

```bash
# Push to GitHub (already done)
# Go to vercel.com
# Import repository: codedbytahir/ludo-star-nextjs
# Click Deploy
```

Your app will be live in minutes! 🚀
