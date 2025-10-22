/**
 * Schema definitions for Hangman game configuration
 */

export interface HangmanGameConfig {
  gameId: string;
  version: string;
  displayName: string;
  description: string;
  defaultSettings: HangmanDefaultSettings;
  difficultyLevels: Record<string, HangmanDifficultyLevel>;
  features: HangmanFeatures;
}

export interface HangmanDefaultSettings {
  maxAttempts: number;
  hintsPerGame: number;
  defaultTheme: string;
  showCategory: boolean;
  showHint: boolean;
  keyboardLayout: 'qwerty' | 'alphabetical';
}

export interface HangmanDifficultyLevel {
  maxAttempts: number;
  hintsPerGame: number;
  description: string;
}

export interface HangmanFeatures {
  customWordList: boolean;
  themeSelection: boolean;
  hintSystem: boolean;
  keyboardSupport: boolean;
  statistics: boolean;
  achievements: boolean;
}

export interface HangmanUISettings {
  showHints: boolean;
  showCategory: boolean;
  keyboardLayout: 'qwerty' | 'alphabetical';
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
}

export interface HangmanGameStats {
  gamesPlayed: number;
  gamesWon: number;
  averageAttempts: number;
  favoriteTheme: string;
  bestStreak: number;
  totalHintsUsed: number;
  wordsGuessed: number;
}
