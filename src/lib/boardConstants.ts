// Professional Ludo Board Constants
// Based on standard Ludo rules with 15x15 grid system

export const BOARD_SIZE = 15; // 15x15 grid
export const CELL_SIZE = 40; // pixels
export const WINNING_STEPS = 56; // Steps to reach home
export const HOME_STRETCH_STEPS = 5; // Additional steps in home path
export const TOTAL_STEPS = 61; // Total positions per player

// Player colors
export enum PlayerColor {
  RED = 'RED',
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
  BLUE = 'BLUE'
}

// Cell types
export enum CellType {
  NORMAL = 'NORMAL',
  SAFE = 'SAFE', // Star positions
  SPAWN = 'SPAWN', // Starting position
  HOME_ENTRY = 'HOME_ENTRY', // Entry to home path
  HOME_PATH = 'HOME_PATH', // Home stretch
  HOME = 'HOME' // Final winning position
}

// Base colors for UI
export const BASE_COLORS: Record<PlayerColor, string> = {
  [PlayerColor.RED]: '#E63946',
  [PlayerColor.GREEN]: '#06FFA5',
  [PlayerColor.YELLOW]: '#FFD700',
  [PlayerColor.BLUE]: '#3A86FF'
};

// Safe zone positions (star positions) - these are indices in the main path
export const SAFE_POSITIONS = [0, 8, 13, 21, 26, 34, 39, 47];

// Starting positions for each color (spawn points on main path)
export const START_POSITIONS: Record<PlayerColor, number> = {
  [PlayerColor.RED]: 0,
  [PlayerColor.GREEN]: 13,
  [PlayerColor.YELLOW]: 26,
  [PlayerColor.BLUE]: 39
};

// Home entry positions (where players enter their home stretch)
export const HOME_ENTRY_POSITIONS: Record<PlayerColor, number> = {
  [PlayerColor.RED]: 50,
  [PlayerColor.GREEN]: 11,
  [PlayerColor.YELLOW]: 24,
  [PlayerColor.BLUE]: 37
};

// Main path coordinates (52 positions around the board)
// This represents the circular path all players follow
export const MAIN_PATH_COORDINATES: Array<{x: number, y: number}> = [
  // Bottom row - Red starting area (positions 0-5)
  {x: 6, y: 13}, {x: 6, y: 12}, {x: 6, y: 11}, {x: 6, y: 10}, {x: 6, y: 9}, {x: 6, y: 8},
  
  // Left column going up (positions 6-11)
  {x: 5, y: 8}, {x: 4, y: 8}, {x: 3, y: 8}, {x: 2, y: 8}, {x: 1, y: 8}, {x: 0, y: 8},
  
  // Top-left corner - Green starting area (positions 12-18)
  {x: 0, y: 7}, {x: 0, y: 6}, {x: 1, y: 6}, {x: 2, y: 6}, {x: 3, y: 6}, {x: 4, y: 6}, {x: 5, y: 6},
  
  // Top row going right (positions 19-24)
  {x: 6, y: 6}, {x: 6, y: 5}, {x: 6, y: 4}, {x: 6, y: 3}, {x: 6, y: 2}, {x: 6, y: 1},
  
  // Top-right corner - Yellow starting area (positions 25-31)
  {x: 6, y: 0}, {x: 7, y: 0}, {x: 8, y: 0}, {x: 8, y: 1}, {x: 8, y: 2}, {x: 8, y: 3}, {x: 8, y: 4},
  
  // Right column going down (positions 32-37)
  {x: 8, y: 5}, {x: 8, y: 6}, {x: 9, y: 6}, {x: 10, y: 6}, {x: 11, y: 6}, {x: 12, y: 6},
  
  // Bottom-right corner - Blue starting area (positions 38-44)
  {x: 13, y: 6}, {x: 14, y: 6}, {x: 14, y: 7}, {x: 14, y: 8}, {x: 13, y: 8}, {x: 12, y: 8}, {x: 11, y: 8},
  
  // Bottom row going left (positions 45-51)
  {x: 10, y: 8}, {x: 9, y: 8}, {x: 8, y: 8}, {x: 8, y: 9}, {x: 8, y: 10}, {x: 8, y: 11}, {x: 8, y: 12}
];

// Home path coordinates for each color (5 steps each)
export const HOME_PATH_COORDINATES: Record<PlayerColor, Array<{x: number, y: number}>> = {
  [PlayerColor.RED]: [
    {x: 7, y: 13}, {x: 7, y: 12}, {x: 7, y: 11}, {x: 7, y: 10}, {x: 7, y: 9}, {x: 7, y: 8}
  ],
  [PlayerColor.GREEN]: [
    {x: 1, y: 7}, {x: 2, y: 7}, {x: 3, y: 7}, {x: 4, y: 7}, {x: 5, y: 7}, {x: 6, y: 7}
  ],
  [PlayerColor.YELLOW]: [
    {x: 7, y: 1}, {x: 7, y: 2}, {x: 7, y: 3}, {x: 7, y: 4}, {x: 7, y: 5}, {x: 7, y: 6}
  ],
  [PlayerColor.BLUE]: [
    {x: 13, y: 7}, {x: 12, y: 7}, {x: 11, y: 7}, {x: 10, y: 7}, {x: 9, y: 7}, {x: 8, y: 7}
  ]
};

// Base (home) coordinates for each color (where tokens start)
export const BASE_COORDINATES: Record<PlayerColor, Array<{x: number, y: number}>> = {
  [PlayerColor.RED]: [
    {x: 1, y: 11}, {x: 3, y: 11}, {x: 1, y: 13}, {x: 3, y: 13}
  ],
  [PlayerColor.GREEN]: [
    {x: 1, y: 1}, {x: 3, y: 1}, {x: 1, y: 3}, {x: 3, y: 3}
  ],
  [PlayerColor.YELLOW]: [
    {x: 11, y: 1}, {x: 13, y: 1}, {x: 11, y: 3}, {x: 13, y: 3}
  ],
  [PlayerColor.BLUE]: [
    {x: 11, y: 11}, {x: 13, y: 11}, {x: 11, y: 13}, {x: 13, y: 13}
  ]
};

// Helper function to get absolute position from player's relative position
export function getAbsolutePosition(color: PlayerColor, relativePosition: number): number {
  if (relativePosition < 0) return -1; // Token in base
  if (relativePosition >= WINNING_STEPS) return relativePosition; // Token in home or won
  
  const startPos = START_POSITIONS[color];
  const absolutePos = (startPos + relativePosition) % 52;
  return absolutePos;
}

// Helper function to get coordinates for a token
export function getTokenCoordinates(color: PlayerColor, position: number): {x: number, y: number} {
  // Token in base
  if (position < 0) {
    const baseIndex = Math.abs(position) - 1;
    return BASE_COORDINATES[color][baseIndex];
  }
  
  // Token on main path
  if (position < WINNING_STEPS) {
    const absolutePos = getAbsolutePosition(color, position);
    return MAIN_PATH_COORDINATES[absolutePos];
  }
  
  // Token in home stretch or won
  const homeIndex = position - WINNING_STEPS;
  if (homeIndex < HOME_PATH_COORDINATES[color].length) {
    return HOME_PATH_COORDINATES[color][homeIndex];
  }
  
  // Token has won - return final home position
  return HOME_PATH_COORDINATES[color][HOME_PATH_COORDINATES[color].length - 1];
}

// Helper function to check if position is safe
export function isSafePosition(position: number): boolean {
  if (position < 0 || position >= WINNING_STEPS) return true; // Base and home are always safe
  return SAFE_POSITIONS.includes(position);
}

// Helper function to check if two tokens are on same position
export function areTokensOnSamePosition(
  color1: PlayerColor, pos1: number,
  color2: PlayerColor, pos2: number
): boolean {
  // Different positions in base/home
  if (pos1 < 0 || pos2 < 0 || pos1 >= WINNING_STEPS || pos2 >= WINNING_STEPS) {
    return false;
  }
  
  // Check if on same absolute position on main path
  const abs1 = getAbsolutePosition(color1, pos1);
  const abs2 = getAbsolutePosition(color2, pos2);
  return abs1 === abs2;
}
