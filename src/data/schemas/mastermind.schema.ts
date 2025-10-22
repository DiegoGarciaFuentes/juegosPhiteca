/**
 * Schema definitions for Mastermind game data
 */

export interface MastermindColor {
  id: string;
  name: string;
  hex: string;
  category: 'primary' | 'secondary' | 'tertiary';
}

export interface MastermindColorSet {
  id: string;
  displayName: string;
  colors: MastermindColor[];
}

export interface MastermindGameConfig {
  gameId: string;
  version: string;
  displayName: string;
  description: string;
  defaultSettings: MastermindDefaultSettings;
  difficultyLevels: Record<string, MastermindDifficultyLevel>;
  features: MastermindFeatures;
}

export interface MastermindDefaultSettings {
  maxAttempts: number;
  codeLength: number;
  selectedColors: number;
  allowDuplicates: boolean;
  showHints: boolean;
  showTimer: boolean;
}

export interface MastermindDifficultyLevel {
  maxAttempts: number;
  codeLength: number;
  selectedColors: number;
  allowDuplicates: boolean;
  description: string;
}

export interface MastermindFeatures {
  customColors: boolean;
  difficultySelection: boolean;
  hintSystem: boolean;
  timer: boolean;
  statistics: boolean;
  achievements: boolean;
}

export interface MastermindGameStats {
  gamesPlayed: number;
  gamesWon: number;
  averageAttempts: number;
  bestTime: number;
  favoriteDifficulty: string;
  totalTime: number;
}

export interface MastermindAttempt {
  attempt: string[];
  feedback: string[];
  timestamp?: number;
}

export interface MastermindGameState {
  gameId: string;
  secretCode: string[];
  attempts: MastermindAttempt[];
  currentAttempt: string[];
  gameStatus: 'config' | 'playing' | 'won' | 'lost';
  startTime: number;
  endTime?: number;
  difficulty: string;
  config: MastermindDifficultyLevel;
}
