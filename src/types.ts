export interface Player {
  id: string;
  name: string;
  color: string;
  position: number; // 0-39 for Monopoly board
  order: number;
}

export interface DiceRoll {
  id: string;
  playerId: string;
  playerName: string;
  dice1: number;
  dice2: number;
  total: number;
  isDoubles: boolean;
  timestamp: number;
  position: number; // Player position after this roll
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  rollHistory: DiceRoll[];
  isPaused: boolean;
  isGameStarted: boolean;
  doublesCount: number; // Track consecutive doubles for current player
}

export interface GameStats {
  totalRolls: number;
  doublesRolled: number;
  averageRoll: number;
  highestRoll: number;
  lowestRoll: number;
}

export const MONOPOLY_COLORS = [
  '#d93a2f', // Red
  '#1fb25a', // Green
  '#1984d6', // Blue
  '#fed130', // Yellow
  '#f7941d', // Orange
  '#d93a96', // Pink
  '#aaddee', // Light Blue
  '#955436', // Brown
];

export const BOARD_SPACES = 40; // Standard Monopoly board
