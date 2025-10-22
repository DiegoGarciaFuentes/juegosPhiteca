/**
 * Schema definitions for Hangman game data
 * Defines the structure and types for word banks and themes
 */

/**
 * Represents a single word entry in the Hangman game
 */
export interface HangmanWord {
  /** The word to guess (uppercase, letters only) */
  word: string;
  /** Hint to help the player */
  hint: string;
  /** Category/theme of the word */
  category: string;
}

/**
 * Represents a themed collection of words
 */
export interface HangmanTheme {
  /** Unique identifier for the theme */
  id: string;
  /** Display name for the theme */
  displayName: string;
  /** Collection of words in this theme */
  words: HangmanWord[];
}

/**
 * Complete data configuration for Hangman game
 */
export interface HangmanDataConfig {
  /** Available themes */
  themes: HangmanTheme[];
  /** ID of the default theme */
  defaultTheme: string;
}

/**
 * Type guard to check if an object is a valid HangmanWord
 */
export function isHangmanWord(obj: any): obj is HangmanWord {
  return (
    typeof obj === 'object' &&
    typeof obj.word === 'string' &&
    typeof obj.hint === 'string' &&
    typeof obj.category === 'string'
  );
}

/**
 * Type guard to check if an object is a valid HangmanTheme
 */
export function isHangmanTheme(obj: any): obj is HangmanTheme {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.displayName === 'string' &&
    Array.isArray(obj.words) &&
    obj.words.every(isHangmanWord)
  );
}

