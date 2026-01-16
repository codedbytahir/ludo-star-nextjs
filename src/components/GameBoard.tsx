'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { User, GameState } from '@/types/game'
import { initializeGame, rollDice, getValidMoves, moveToken, checkWinner } from '@/lib/gameLogic'
import { getAIMove, getAIThinkingTime } from '@/lib/aiLogic'
import { updateStats } from '@/lib/userUtils'
import Board from './Board'
import Dice from './Dice'
import PlayerInfo from './PlayerInfo'
import GameOverModal from './GameOverModal'

interface GameBoardProps {
  user: User
  gameMode: 'quick' | 'offline' | 'local'
  onBackToMenu: () => void
}

export default function GameBoard({ user, gameMode, onBackToMenu }: GameBoardProps) {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [isProcessingAI, setIsProcessingAI] = useState(false)

  useEffect(() => {
    const initialState = initializeGame(user, gameMode)
    setGameState(initialState)
  }, [user, gameMode])

  const nextTurn = useCallback(() => {
    setGameState(prev => {
      if (!prev) return null
      
      const nextIndex = (prev.currentPlayerIndex + 1) % prev.players.length
      
      return {
        ...prev,
        currentPlayerIndex: nextIndex,
        diceValue: null,
        validMoves: [],
        selectedToken: null,
        turnCount: prev.turnCount + 1
      }
    })
  }, [])

  const handleGameOver = useCallback((winner: any, rankings: any[]) => {
    setGameState(prev => prev ? { ...prev, winner, rankings } : null)
    
    // Update stats
    const won = winner.id === user.id
    const tokensHome = gameState?.players.find(p => p.id === user.id)?.tokensHome || 0
    updateStats(won, tokensHome, 0)
    
    if (won) {
      toast.success('🎉 Congratulations! You won!', { duration: 5000 })
    }
  }, [user.id, gameState?.players])

  const handleTokenMove = useCallback((tokenIndex: number) => {
    setGameState(prev => {
      if (!prev || !prev.diceValue) return prev
      
      const newState = moveToken(prev, tokenIndex, prev.diceValue)
      
      // Check for winner
      const winnerData = checkWinner(newState)
      if (winnerData) {
        setTimeout(() => handleGameOver(winnerData.winner, winnerData.rankings), 500)
        return { ...newState, winner: winnerData.winner, rankings: winnerData.rankings }
      }
      
      // Check if player gets extra turn
      const shouldContinue = prev.diceValue === 6
      
      if (!shouldContinue) {
        setTimeout(() => nextTurn(), 500)
      } else {
        return {
          ...newState,
          diceValue: null,
          validMoves: [],
          selectedToken: null
        }
      }
      
      return newState
    })
  }, [handleGameOver, nextTurn])

  // AI turn logic - fixed to prevent infinite loops
  useEffect(() => {
    if (!gameState || gameState.winner || isProcessingAI) return

    const currentPlayer = gameState.players[gameState.currentPlayerIndex]
    
    // AI turn logic
    if (currentPlayer.isAI && gameState.diceValue !== null && gameState.validMoves.length > 0) {
      setIsProcessingAI(true)
      const thinkingTime = getAIThinkingTime('medium')
      
      const timeoutId = setTimeout(() => {
        const aiMove = getAIMove(currentPlayer, gameState.diceValue!, 'medium')
        if (aiMove !== null) {
          handleTokenMove(aiMove)
        } else {
          toast('No valid moves available', { icon: '❌' })
          setTimeout(() => nextTurn(), 1000)
        }
        setIsProcessingAI(false)
      }, thinkingTime)

      return () => {
        clearTimeout(timeoutId)
        setIsProcessingAI(false)
      }
    } else if (currentPlayer.isAI && gameState.diceValue !== null && gameState.validMoves.length === 0) {
      // AI has no valid moves, skip turn
      const timeoutId = setTimeout(() => {
        toast(`${currentPlayer.username} has no valid moves`, { icon: '❌' })
        nextTurn()
      }, 1000)

      return () => clearTimeout(timeoutId)
    }
  }, [gameState, isProcessingAI, handleTokenMove, nextTurn])

  // Auto-roll dice for AI players
  useEffect(() => {
    if (!gameState || gameState.winner || isProcessingAI) return

    const currentPlayer = gameState.players[gameState.currentPlayerIndex]
    
    if (currentPlayer.isAI && gameState.diceValue === null) {
      const timeoutId = setTimeout(() => {
        const value = rollDice()
        const validMoves = getValidMoves(currentPlayer, value)
        
        setGameState(prev => prev ? {
          ...prev,
          diceValue: value,
          validMoves,
          isRolling: false
        } : null)
      }, 800)

      return () => clearTimeout(timeoutId)
    }
  }, [gameState, isProcessingAI])

  const handleDiceRoll = () => {
    if (!gameState || isRolling || gameState.winner) return
    
    const currentPlayer = gameState.players[gameState.currentPlayerIndex]
    if (currentPlayer.isAI) return

    setIsRolling(true)
    
    setTimeout(() => {
      const value = rollDice()
      const validMoves = getValidMoves(currentPlayer, value)
      
      setGameState(prev => prev ? {
        ...prev,
        diceValue: value,
        validMoves,
        isRolling: false
      } : null)
      
      setIsRolling(false)
      
      if (validMoves.length === 0) {
        toast('No valid moves!', { icon: '😔' })
        setTimeout(() => nextTurn(), 1500)
      }
    }, 1000)
  }

  const handlePlayAgain = () => {
    const initialState = initializeGame(user, gameMode)
    setGameState(initialState)
    setIsProcessingAI(false)
  }

  if (!gameState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xl font-semibold">Initializing game...</p>
        </div>
      </div>
    )
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex]

  return (
    <div className="min-h-screen p-4 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-effect rounded-2xl p-4 mb-4 flex items-center justify-between"
      >
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back</span>
        </button>
        
        <h2 className="text-xl md:text-2xl font-black text-primary-500">
          {gameMode === 'quick' && '⚡ Quick Play'}
          {gameMode === 'offline' && '🤖 Offline Mode'}
          {gameMode === 'local' && '👥 Local Play'}
        </h2>
        
        <div className="px-4 py-2 bg-white/10 rounded-xl">
          <span className="font-semibold">Turn: {gameState.turnCount}</span>
        </div>
      </motion.div>

      {/* Players Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {gameState.players.map((player, index) => (
          <PlayerInfo
            key={player.id}
            player={player}
            isActive={index === gameState.currentPlayerIndex}
          />
        ))}
      </div>

      {/* Game Board */}
      <div className="flex-1 flex items-center justify-center mb-4">
        <Board
          gameState={gameState}
          onTokenClick={handleTokenMove}
        />
      </div>

      {/* Dice */}
      <div className="flex justify-center">
        <Dice
          value={gameState.diceValue}
          isRolling={isRolling}
          onRoll={handleDiceRoll}
          disabled={currentPlayer.isAI || isRolling || gameState.winner !== null}
          currentPlayer={currentPlayer}
        />
      </div>

      {/* Game Over Modal */}
      {gameState.winner && (
        <GameOverModal
          winner={gameState.winner}
          rankings={gameState.rankings}
          onPlayAgain={handlePlayAgain}
          onBackToMenu={onBackToMenu}
        />
      )}
    </div>
  )
}
