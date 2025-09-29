export interface WordEntry {
  word: string;
  hint: string;
  category: string;
}

export interface HangmanConfig {
  maxAttempts: number;
  words: WordEntry[];
}

export interface GameState {
  currentWord: string;
  guessedLetters: string[];
  wrongAttempts: number;
  gameStatus: 'playing' | 'won' | 'lost';
  hint: string;
  category: string;
}

export type HangmanGameState = 'config' | 'playing' | 'won' | 'lost';

