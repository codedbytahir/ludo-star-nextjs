import { Player, Token } from '@/types/game'

interface MoveOption {
  tokenIndex: number
  priority: number
  newPosition: number
}

export const getAIMove = (
  player: Player,
  diceValue: number,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium'
): number | null => {
  const validMoves: MoveOption[] = []
  
  player.tokens.forEach((token, index) => {
    let priority = 0
    let newPosition = token.position
    
    // Token in home base
    if (token.position === -1 && diceValue === 6) {
      newPosition = 0
      priority = 10 // High priority to get tokens out
    }
    // Token on board
    else if (token.position >= 0 && token.position < 57) {
      newPosition = token.position + diceValue
      if (newPosition <= 57) {
        priority = calculateMovePriority(token, newPosition, diceValue, difficulty)
      } else {
        return // Can't make this move
      }
    } else {
      return // Token already home
    }
    
    if (priority > 0) {
      validMoves.push({ tokenIndex: index, priority, newPosition })
    }
  })
  
  if (validMoves.length === 0) return null
  
  // Easy: Random move
  if (difficulty === 'easy') {
    const randomIndex = Math.floor(Math.random() * validMoves.length)
    return validMoves[randomIndex].tokenIndex
  }
  
  // Medium/Hard: Choose best move
  validMoves.sort((a, b) => b.priority - a.priority)
  return validMoves[0].tokenIndex
}

const calculateMovePriority = (
  token: Token,
  newPosition: number,
  diceValue: number,
  difficulty: 'easy' | 'medium' | 'hard'
): number => {
  let priority = 0
  
  // Base priority: closer to home is better
  priority += (57 - newPosition)
  
  if (difficulty === 'medium' || difficulty === 'hard') {
    // Reaching home is highest priority
    if (newPosition === 57) {
      priority += 100
    }
    
    // Getting close to home
    if (newPosition >= 52) {
      priority += 50
    }
    
    // Moving out of home base
    if (token.position === -1) {
      priority += 30
    }
    
    // Prefer moving tokens that are further along
    if (token.position > 40) {
      priority += 20
    }
  }
  
  if (difficulty === 'hard') {
    // Advanced strategies
    
    // Avoid leaving tokens vulnerable near start
    if (newPosition < 10 && token.position !== -1) {
      priority -= 10
    }
    
    // Prefer spreading tokens out
    if (token.position < 20) {
      priority += 15
    }
    
    // Prioritize tokens in the home stretch
    if (newPosition >= 45) {
      priority += 25
    }
  }
  
  return priority
}

export const getAIDifficulty = (gameMode: string): 'easy' | 'medium' | 'hard' => {
  // You can make this dynamic based on game settings
  return 'medium'
}

// Simulate AI "thinking" time for better UX
export const getAIThinkingTime = (difficulty: 'easy' | 'medium' | 'hard'): number => {
  switch (difficulty) {
    case 'easy':
      return 500 + Math.random() * 500 // 500-1000ms
    case 'medium':
      return 800 + Math.random() * 700 // 800-1500ms
    case 'hard':
      return 1000 + Math.random() * 1000 // 1000-2000ms
    default:
      return 1000
  }
}
