import { User } from '@/types/game'

const adjectives = [
  'Swift', 'Brave', 'Lucky', 'Epic', 'Mega', 'Super', 'Ultra', 'Pro',
  'Mighty', 'Noble', 'Royal', 'Divine', 'Cosmic', 'Stellar', 'Thunder', 'Shadow',
  'Golden', 'Silver', 'Diamond', 'Platinum', 'Mystic', 'Ancient', 'Legendary', 'Supreme'
]

const nouns = [
  'Player', 'Gamer', 'King', 'Star', 'Champion', 'Master', 'Legend', 'Hero',
  'Warrior', 'Knight', 'Dragon', 'Phoenix', 'Tiger', 'Eagle', 'Wolf', 'Lion',
  'Wizard', 'Ninja', 'Samurai', 'Gladiator', 'Titan', 'Emperor', 'Ace', 'Chief'
]

export const generateAnonymousUser = (): User => {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const num = Math.floor(Math.random() * 9999)
  
  return {
    id: crypto.randomUUID(),
    username: `${adj}${noun}_${num}`,
    createdAt: new Date().toISOString()
  }
}

export const updateUsername = (user: User, newUsername: string): User => {
  const updatedUser = { ...user, username: newUsername }
  localStorage.setItem('ludoUser', JSON.stringify(updatedUser))
  return updatedUser
}

export const getUserStats = () => {
  const stats = localStorage.getItem('ludoStats')
  if (stats) {
    return JSON.parse(stats)
  }
  return {
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    totalTokensHome: 0,
    totalCaptures: 0
  }
}

export const updateStats = (won: boolean, tokensHome: number, captures: number) => {
  const stats = getUserStats()
  stats.gamesPlayed++
  if (won) stats.wins++
  else stats.losses++
  stats.totalTokensHome += tokensHome
  stats.totalCaptures += captures
  localStorage.setItem('ludoStats', JSON.stringify(stats))
}
