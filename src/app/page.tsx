'use client'

import { useState, useEffect } from 'react'
import MainMenu from '@/components/MainMenu'
import GameBoard from '@/components/GameBoard'
import { generateAnonymousUser } from '@/lib/userUtils'
import { User } from '@/types/game'

export default function Home() {
  const [screen, setScreen] = useState<'menu' | 'game'>('menu')
  const [user, setUser] = useState<User | null>(null)
  const [gameMode, setGameMode] = useState<'quick' | 'offline' | 'local' | null>(null)

  useEffect(() => {
    // Initialize anonymous user
    const storedUser = localStorage.getItem('ludoUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      const newUser = generateAnonymousUser()
      localStorage.setItem('ludoUser', JSON.stringify(newUser))
      setUser(newUser)
    }
  }, [])

  const startGame = (mode: 'quick' | 'offline' | 'local') => {
    setGameMode(mode)
    setScreen('game')
  }

  const backToMenu = () => {
    setScreen('menu')
    setGameMode(null)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xl font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {screen === 'menu' && (
        <MainMenu user={user} setUser={setUser} onStartGame={startGame} />
      )}
      {screen === 'game' && gameMode && (
        <GameBoard user={user} gameMode={gameMode} onBackToMenu={backToMenu} />
      )}
    </main>
  )
}
