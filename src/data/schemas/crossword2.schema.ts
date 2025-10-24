/**
 * Schema definitions for Crossword2 game data
 */

export interface Crossword2Word {
  word: string;
  clue: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
  length: number;
}

export interface Crossword2Theme {
  id: string;
  displayName: string;
  description: string;
  icon?: string;
  words: Crossword2Word[];
}

export interface Crossword2GameConfig {
  gameId: string;
  version: string;
  displayName: string;
  description: string;
  defaultSettings: Crossword2DefaultSettings;
  difficultyLevels: Record<string, Crossword2DifficultyLevel>;
  features: Crossword2Features;
}

export interface Crossword2DefaultSettings {
  maxWords: number;
  gridSize: number;
  showHints: boolean;
  showTimer: boolean;
  allowReveal: boolean;
}

export interface Crossword2DifficultyLevel {
  maxWords: number;
  gridSize: number;
  showHints: boolean;
  allowReveal: boolean;
  timeLimit?: number;
  description: string;
}

export interface Crossword2Features {
  customWords: boolean;
  difficultySelection: boolean;
  hintSystem: boolean;
  timer: boolean;
  statistics: boolean;
  achievements: boolean;
  multiplayer: boolean;
}

export interface Crossword2GameState {
  gameId: string;
  words: Crossword2Word[];
  grid: string[][];
  userInput: string[][];
  gameStatus: 'config' | 'playing' | 'won' | 'lost';
  startTime: number;
  endTime?: number;
  difficulty: string;
  hintsUsed: number;
  wordsCompleted: number;
}

