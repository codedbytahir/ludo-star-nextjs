export interface User {
  id: string
  username: string
  createdAt: string
}

export interface Token {
  position: number // -1 = home base, 0-51 = main track, 52-57 = home column, 57 = home
  isHome: boolean
  isSafe: boolean
}

export interface Player {
  id: string
  username: string
  color: string
  colorName: 'red' | 'green' | 'yellow' | 'blue'
  isAI: boolean
  tokens: Token[]
  tokensHome: number
  isActive?: boolean
}

export interface GameState {
  players: Player[]
  currentPlayerIndex: number
  diceValue: number | null
  turnCount: number
  gameMode: 'quick' | 'offline' | 'local' | 'online'
  isRolling: boolean
  validMoves: number[]
  selectedToken: number | null
  winner: Player | null
  rankings: Player[]
}

export interface Stats {
  gamesPlayed: number
  wins: number
  losses: number
  totalTokensHome: number
  totalCaptures: number
}

export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6
