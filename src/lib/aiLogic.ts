import { Player, Token } from '@/types/game'
import { PlayerColor, WINNING_STEPS, isSafePosition } from './boardConstants'

export type AIDifficulty = 'easy' | 'medium' | 'hard'

// Get AI thinking time based on difficulty
export function getAIThinkingTime(difficulty: AIDifficulty): number {
  switch (difficulty) {
    case 'easy':
      return 500
    case 'medium':
      return 800
    case 'hard':
      return 1200
    default:
      return 800
  }
}

// Get best move for AI
export function getAIMove(player: Player, diceValue: number, difficulty: AIDifficulty): number | null {
  const validTokens = player.tokens
    .map((token, index) => ({ token, index }))
    .filter(({ token }) => canAIMoveToken(token, diceValue))

  if (validTokens.length === 0) return null

  switch (difficulty) {
    case 'easy':
      return getEasyMove(validTokens)
    case 'medium':
      return getMediumMove(validTokens, player, diceValue)
    case 'hard':
      return getHardMove(validTokens, player, diceValue)
    default:
      return getMediumMove(validTokens, player, diceValue)
  }
}

// Check if AI can move a token
function canAIMoveToken(token: Token, diceValue: number): boolean {
  if (token.isHome) return false
  
  if (token.position < 0) {
    return diceValue === 6
  }
  
  const newPosition = token.position + diceValue
  return newPosition <= 61 // TOTAL_STEPS
}

// Easy AI - Random move
function getEasyMove(validTokens: Array<{ token: Token, index: number }>): number {
  const randomIndex = Math.floor(Math.random() * validTokens.length)
  return validTokens[randomIndex].index
}

// Medium AI - Prioritize getting tokens out and moving forward
function getMediumMove(
  validTokens: Array<{ token: Token, index: number }>,
  player: Player,
  diceValue: number
): number {
  // Priority 1: Get tokens out of base if rolled a 6
  if (diceValue === 6) {
    const tokensInBase = validTokens.filter(({ token }) => token.position < 0)
    if (tokensInBase.length > 0) {
      return tokensInBase[0].index
    }
  }

  // Priority 2: Move token closest to home
  const tokensOnBoard = validTokens.filter(({ token }) => token.position >= 0)
  if (tokensOnBoard.length > 0) {
    tokensOnBoard.sort((a, b) => b.token.position - a.token.position)
    return tokensOnBoard[0].index
  }

  // Fallback: Random
  return getEasyMove(validTokens)
}

// Hard AI - Strategic moves with capture and safety considerations
function getHardMove(
  validTokens: Array<{ token: Token, index: number }>,
  player: Player,
  diceValue: number
): number {
  const scoredMoves = validTokens.map(({ token, index }) => {
    let score = 0
    const newPosition = token.position < 0 ? 0 : token.position + diceValue

    // Priority 1: Get tokens out of base (highest priority)
    if (token.position < 0 && diceValue === 6) {
      score += 1000
    }

    // Priority 2: Reach home
    if (newPosition >= WINNING_STEPS) {
      score += 800
    }

    // Priority 3: Move to safe position
    if (isSafePosition(newPosition)) {
      score += 300
    }

    // Priority 4: Advance tokens that are further ahead
    if (token.position >= 0) {
      score += token.position * 10
    }

    // Priority 5: Move tokens that are close to home stretch
    const distanceToHome = WINNING_STEPS - (token.position >= 0 ? token.position : 0)
    if (distanceToHome <= 10) {
      score += 200
    }

    // Priority 6: Prefer moving different tokens (spread strategy)
    const tokensAhead = player.tokens.filter(t => 
      t.position > token.position && !t.isHome
    ).length
    score += tokensAhead * 50

    // Small random factor for variety
    score += Math.random() * 10

    return { index, score }
  })

  // Sort by score (descending) and return best move
  scoredMoves.sort((a, b) => b.score - a.score)
  return scoredMoves[0].index
}

// Evaluate if a move would capture an opponent
export function wouldCaptureOpponent(
  player: Player,
  tokenIndex: number,
  diceValue: number,
  allPlayers: Player[]
): boolean {
  const token = player.tokens[tokenIndex]
  const newPosition = token.position < 0 ? 0 : token.position + diceValue

  // Can't capture in safe zones or home stretch
  if (isSafePosition(newPosition) || newPosition >= WINNING_STEPS) {
    return false
  }

  // Check if any opponent token is at the new position
  for (const opponent of allPlayers) {
    if (opponent.id === player.id) continue

    for (const oppToken of opponent.tokens) {
      if (oppToken.position === newPosition && !oppToken.isHome) {
        return true
      }
    }
  }

  return false
}

// Get defensive move (avoid being captured)
export function getDefensiveMove(
  player: Player,
  diceValue: number,
  allPlayers: Player[]
): number | null {
  const validTokens = player.tokens
    .map((token, index) => ({ token, index }))
    .filter(({ token }) => canAIMoveToken(token, diceValue))

  if (validTokens.length === 0) return null

  // Find tokens in danger
  const tokensInDanger = validTokens.filter(({ token }) => {
    if (token.position < 0 || token.isHome) return false
    if (isSafePosition(token.position)) return false

    // Check if any opponent can capture this token
    for (const opponent of allPlayers) {
      if (opponent.id === player.id) continue

      for (const oppToken of opponent.tokens) {
        if (oppToken.position < 0 || oppToken.isHome) continue
        
        // Simple check: if opponent is within 6 steps behind
        const distance = token.position - oppToken.position
        if (distance > 0 && distance <= 6) {
          return true
        }
      }
    }
    return false
  })

  // Move token in danger to safety
  if (tokensInDanger.length > 0) {
    const safeMoves = tokensInDanger.filter(({ token }) => {
      const newPosition = token.position + diceValue
      return isSafePosition(newPosition)
    })

    if (safeMoves.length > 0) {
      return safeMoves[0].index
    }

    // If no safe move, move the most endangered token
    return tokensInDanger[0].index
  }

  return null
}

// Get aggressive move (try to capture)
export function getAggressiveMove(
  player: Player,
  diceValue: number,
  allPlayers: Player[]
): number | null {
  const validTokens = player.tokens
    .map((token, index) => ({ token, index }))
    .filter(({ token }) => canAIMoveToken(token, diceValue))

  if (validTokens.length === 0) return null

  // Find moves that would capture an opponent
  const captureMoves = validTokens.filter(({ index }) =>
    wouldCaptureOpponent(player, index, diceValue, allPlayers)
  )

  if (captureMoves.length > 0) {
    // Prefer capturing tokens that are further ahead
    captureMoves.sort((a, b) => b.token.position - a.token.position)
    return captureMoves[0].index
  }

  return null
}
