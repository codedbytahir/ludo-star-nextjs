import { GameState, Player, Token, User, DiceValue } from '@/types/game'

const PLAYER_COLORS = [
  { color: '#E63946', name: 'red' as const },
  { color: '#06FFA5', name: 'green' as const },
  { color: '#FFD700', name: 'yellow' as const },
  { color: '#3A86FF', name: 'blue' as const },
]

const initTokens = (): Token[] => [
  { position: -1, isHome: false, isSafe: false },
  { position: -1, isHome: false, isSafe: false },
  { position: -1, isHome: false, isSafe: false },
  { position: -1, isHome: false, isSafe: false },
]

export const initializeGame = (user: User, gameMode: 'quick' | 'offline' | 'local'): GameState => {
  const players: Player[] = [
    {
      id: user.id,
      username: user.username,
      color: PLAYER_COLORS[0].color,
      colorName: PLAYER_COLORS[0].name,
      isAI: false,
      tokens: initTokens(),
      tokensHome: 0,
      isActive: true,
    },
    {
      id: 'ai-1',
      username: 'AI Challenger',
      color: PLAYER_COLORS[1].color,
      colorName: PLAYER_COLORS[1].name,
      isAI: true,
      tokens: initTokens(),
      tokensHome: 0,
    },
    {
      id: 'ai-2',
      username: 'AI Warrior',
      color: PLAYER_COLORS[2].color,
      colorName: PLAYER_COLORS[2].name,
      isAI: true,
      tokens: initTokens(),
      tokensHome: 0,
    },
    {
      id: 'ai-3',
      username: 'AI Master',
      color: PLAYER_COLORS[3].color,
      colorName: PLAYER_COLORS[3].name,
      isAI: true,
      tokens: initTokens(),
      tokensHome: 0,
    },
  ]

  return {
    players,
    currentPlayerIndex: 0,
    diceValue: null,
    turnCount: 1,
    gameMode,
    isRolling: false,
    validMoves: [],
    selectedToken: null,
    winner: null,
    rankings: [],
  }
}

export const rollDice = (): DiceValue => {
  return (Math.floor(Math.random() * 6) + 1) as DiceValue
}

export const getValidMoves = (player: Player, diceValue: number): number[] => {
  const moves: number[] = []
  
  player.tokens.forEach((token, index) => {
    // Token in home base - can only move out with a 6
    if (token.position === -1 && diceValue === 6) {
      moves.push(index)
    }
    // Token on board - can move if won't exceed home
    else if (token.position >= 0 && token.position < 57) {
      const newPos = token.position + diceValue
      if (newPos <= 57) {
        moves.push(index)
      }
    }
  })
  
  return moves
}

export const moveToken = (
  gameState: GameState,
  tokenIndex: number,
  diceValue: number
): GameState => {
  const newState = JSON.parse(JSON.stringify(gameState)) as GameState
  const player = newState.players[newState.currentPlayerIndex]
  const token = player.tokens[tokenIndex]
  
  // Move token out of home base
  if (token.position === -1 && diceValue === 6) {
    token.position = 0
  }
  // Move token on board
  else if (token.position >= 0) {
    token.position += diceValue
    
    // Check if reached home
    if (token.position >= 57) {
      token.position = 57
      token.isHome = true
      player.tokensHome++
    }
  }
  
  newState.turnCount++
  return newState
}

export const checkWinner = (gameState: GameState): { winner: Player; rankings: Player[] } | null => {
  const winner = gameState.players.find(p => p.tokensHome === 4)
  
  if (winner) {
    const rankings = [...gameState.players].sort((a, b) => {
      if (b.tokensHome !== a.tokensHome) {
        return b.tokensHome - a.tokensHome
      }
      // If same tokens home, sort by who got there first (lower turn count)
      return 0
    })
    
    return { winner, rankings }
  }
  
  return null
}

export const getNextPlayerIndex = (currentIndex: number, totalPlayers: number): number => {
  return (currentIndex + 1) % totalPlayers
}

export const shouldGetExtraTurn = (diceValue: number, captured: boolean): boolean => {
  return diceValue === 6 || captured
}

// Safe squares on the board (star positions)
export const SAFE_SQUARES = [1, 9, 14, 22, 27, 35, 40, 48]

export const isSafeSquare = (position: number): boolean => {
  return SAFE_SQUARES.includes(position)
}

// Check if a token can capture another token
export const canCapture = (position: number, playerColor: string, otherPlayerColor: string): boolean => {
  // Can't capture on safe squares
  if (isSafeSquare(position)) return false
  
  // Can't capture your own tokens
  if (playerColor === otherPlayerColor) return false
  
  return true
}
