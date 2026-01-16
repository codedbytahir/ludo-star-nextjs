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
  
  const renderHomeBase = (playerIndex: number) => {
    const player = gameState.players[playerIndex]
    const positions = [
      { top: '20%', left: '20%' },
      { top: '20%', left: '60%' },
      { top: '60%', left: '20%' },
      { top: '60%', left: '60%' },
    ]
    
    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-2 p-4">
        {player.tokens.map((token, tokenIndex) => {
          if (token.position === -1) {
            return (
              <div
                key={tokenIndex}
                className="bg-white/30 rounded-full flex items-center justify-center aspect-square cursor-pointer hover:bg-white/40 transition-all"
                onClick={() => {
                  if (gameState.validMoves.includes(tokenIndex) && gameState.currentPlayerIndex === playerIndex) {
                    onTokenClick(tokenIndex)
                  }
                }}
              >
                <Token
                  color={colors[playerIndex]}
                  isValid={gameState.validMoves.includes(tokenIndex) && gameState.currentPlayerIndex === playerIndex}
                />
              </div>
            )
          }
          return null
        })}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative w-full max-w-[500px] aspect-square bg-white rounded-3xl shadow-2xl overflow-hidden"
    >
      {/* Simplified Board Layout */}
      <div className="grid grid-cols-3 grid-rows-3 h-full gap-1 p-2">
        {/* Top Left - Red Home */}
        <div className="bg-accent-red/20 rounded-tl-2xl">
          {renderHomeBase(0)}
        </div>
        
        {/* Top Center - Path */}
        <div className="bg-gray-100 flex items-center justify-center">
          <div className="text-2xl">⬆️</div>
        </div>
        
        {/* Top Right - Green Home */}
        <div className="bg-accent-green/20 rounded-tr-2xl">
          {renderHomeBase(1)}
        </div>
        
        {/* Middle Left - Path */}
        <div className="bg-gray-100 flex items-center justify-center">
          <div className="text-2xl">⬅️</div>
        </div>
        
        {/* Center - Home Triangle */}
        <div className="bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
          <div className="text-4xl">🏠</div>
        </div>
        
        {/* Middle Right - Path */}
        <div className="bg-gray-100 flex items-center justify-center">
          <div className="text-2xl">➡️</div>
        </div>
        
        {/* Bottom Left - Blue Home */}
        <div className="bg-accent-blue/20 rounded-bl-2xl">
          {renderHomeBase(3)}
        </div>
        
        {/* Bottom Center - Path */}
        <div className="bg-gray-100 flex items-center justify-center">
          <div className="text-2xl">⬇️</div>
        </div>
        
        {/* Bottom Right - Yellow Home */}
        <div className="bg-primary-400/20 rounded-br-2xl">
          {renderHomeBase(2)}
        </div>
      </div>
      
      {/* Tokens on board (simplified - showing in center for demo) */}
      <div className="absolute inset-0 pointer-events-none">
        {gameState.players.map((player, playerIndex) => (
          player.tokens.map((token, tokenIndex) => {
            if (token.position >= 0 && token.position < 57) {
              // Simplified positioning - place tokens around center
              const angle = (token.position / 52) * Math.PI * 2
              const radius = 35
              const x = 50 + Math.cos(angle) * radius
              const y = 50 + Math.sin(angle) * radius
              
              return (
                <div
                  key={`${playerIndex}-${tokenIndex}`}
                  className="absolute pointer-events-auto"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => {
                    if (gameState.validMoves.includes(tokenIndex) && gameState.currentPlayerIndex === playerIndex) {
                      onTokenClick(tokenIndex)
                    }
                  }}
                >
                  <Token
                    color={colors[playerIndex]}
                    isValid={gameState.validMoves.includes(tokenIndex) && gameState.currentPlayerIndex === playerIndex}
                  />
                </div>
              )
            }
            return null
          })
        ))}
      </div>
    </motion.div>
  )
}
