import { GameState, Player, Token } from '@/types/game'
import { User } from '@/types/game'
import {
  PlayerColor,
  WINNING_STEPS,
  HOME_STRETCH_STEPS,
  TOTAL_STEPS,
  isSafePosition,
  areTokensOnSamePosition,
  getAbsolutePosition
} from './boardConstants'

// Initialize a new game
export function initializeGame(user: User, gameMode: 'quick' | 'offline' | 'local'): GameState {
  const players: Player[] = [
    createPlayer(user.id, user.username, PlayerColor.RED, false),
    createPlayer('ai-1', 'AI Player 1', PlayerColor.GREEN, gameMode !== 'local'),
    createPlayer('ai-2', 'AI Player 2', PlayerColor.YELLOW, gameMode !== 'local'),
    createPlayer('ai-3', 'AI Player 3', PlayerColor.BLUE, gameMode !== 'local')
  ]

  return {
    players,
    currentPlayerIndex: 0,
    diceValue: null,
    validMoves: [],
    selectedToken: null,
    turnCount: 1,
    winner: null,
    rankings: [],
    isRolling: false
  }
}

// Create a player
function createPlayer(id: string, username: string, color: PlayerColor, isAI: boolean): Player {
  return {
    id,
    username,
    color,
    isAI,
    tokens: [
      { id: 0, position: -1, isHome: false }, // -1 means in base
      { id: 1, position: -2, isHome: false },
      { id: 2, position: -3, isHome: false },
      { id: 3, position: -4, isHome: false }
    ],
    tokensHome: 0
  }
}

// Roll dice (1-6)
export function rollDice(): number {
  return Math.floor(Math.random() * 6) + 1
}

// Get valid moves for current player
export function getValidMoves(player: Player, diceValue: number): number[] {
  const validMoves: number[] = []

  player.tokens.forEach((token, index) => {
    if (canMoveToken(player, token, diceValue)) {
      validMoves.push(index)
    }
  })

  return validMoves
}

// Check if a token can be moved
function canMoveToken(player: Player, token: Token, diceValue: number): boolean {
  // Token already home
  if (token.isHome) return false

  // Token in base - can only move out with a 6
  if (token.position < 0) {
    return diceValue === 6
  }

  // Check if move would exceed winning position
  const newPosition = token.position + diceValue
  
  // Can't move past the final home position
  if (newPosition > TOTAL_STEPS) return false

  return true
}

// Move a token
export function moveToken(gameState: GameState, tokenIndex: number, diceValue: number): GameState {
  const newState = { ...gameState }
  const currentPlayer = newState.players[newState.currentPlayerIndex]
  const token = currentPlayer.tokens[tokenIndex]

  // Calculate new position
  let newPosition: number

  if (token.position < 0) {
    // Moving out of base
    newPosition = 0
  } else {
    newPosition = token.position + diceValue
  }

  // Update token position
  token.position = newPosition

  // Check if token reached home
  if (newPosition >= TOTAL_STEPS) {
    token.isHome = true
    currentPlayer.tokensHome++
  }

  // Check for captures (only on main path, not in home stretch)
  if (newPosition < WINNING_STEPS && !isSafePosition(newPosition)) {
    checkAndCaptureTokens(newState, currentPlayer, newPosition)
  }

  return newState
}

// Check and capture opponent tokens
function checkAndCaptureTokens(gameState: GameState, currentPlayer: Player, position: number) {
  gameState.players.forEach(player => {
    if (player.id === currentPlayer.id) return // Skip current player

    player.tokens.forEach(token => {
      if (token.position < 0 || token.isHome) return // Skip tokens in base or home

      // Check if tokens are on same position
      if (areTokensOnSamePosition(
        currentPlayer.color as PlayerColor,
        position,
        player.color as PlayerColor,
        token.position
      )) {
        // Send opponent token back to base
        const basePosition = -(token.id + 1)
        token.position = basePosition
        token.isHome = false
      }
    })
  })
}

// Check for winner
export function checkWinner(gameState: GameState): { winner: Player, rankings: Player[] } | null {
  const finishedPlayers = gameState.players.filter(p => p.tokensHome === 4)
  
  if (finishedPlayers.length === 0) return null

  // Sort by tokens home (descending) and then by turn order
  const rankings = [...gameState.players].sort((a, b) => {
    if (b.tokensHome !== a.tokensHome) {
      return b.tokensHome - a.tokensHome
    }
    return 0
  })

  return {
    winner: finishedPlayers[0],
    rankings
  }
}

// Check if player gets extra turn (rolled a 6)
export function getsExtraTurn(diceValue: number): boolean {
  return diceValue === 6
}

// Get token position for rendering
export function getTokenRenderPosition(player: Player, tokenIndex: number): { x: number, y: number } {
  const token = player.tokens[tokenIndex]
  const color = player.color as PlayerColor
  
  // Import here to avoid circular dependency
  const { getTokenCoordinates } = require('./boardConstants')
  return getTokenCoordinates(color, token.position)
}

// Calculate score for a player (for AI and stats)
export function calculatePlayerScore(player: Player): number {
  let score = 0
  
  // Points for tokens home
  score += player.tokensHome * 100
  
  // Points for tokens on board
  player.tokens.forEach(token => {
    if (token.position >= 0 && !token.isHome) {
      score += token.position
    }
  })
  
  return score
}

// Get player by color
export function getPlayerByColor(gameState: GameState, color: PlayerColor): Player | undefined {
  return gameState.players.find(p => p.color === color)
}

// Check if position is occupied by current player's token
export function isPositionOccupiedByPlayer(player: Player, position: number): boolean {
  return player.tokens.some(token => 
    token.position === position && !token.isHome
  )
}

// Get all tokens at a specific position
export function getTokensAtPosition(gameState: GameState, color: PlayerColor, position: number): Token[] {
  const tokens: Token[] = []
  
  gameState.players.forEach(player => {
    player.tokens.forEach(token => {
      if (token.position < 0 || token.isHome) return
      
      if (areTokensOnSamePosition(
        color,
        position,
        player.color as PlayerColor,
        token.position
      )) {
        tokens.push(token)
      }
    })
  })
  
  return tokens
}
