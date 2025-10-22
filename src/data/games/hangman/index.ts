/**
 * Hangman Game Data Loader
 * Centralizes all word banks and provides easy access to game data
 */

import type { HangmanTheme, HangmanDataConfig, HangmanWord } from '../../schemas/hangman.schema';
import type { HangmanGameConfig } from '../../schemas/hangman-config.schema';

// Import JSON files
import animalsData from './words-animals.json' with { type: 'json' };
import scienceData from './words-science.json' with { type: 'json' };
import geographyData from './words-geography.json' with { type: 'json' };
import verbsData from './words-verbs.json' with { type: 'json' };
import professionsData from './words-professions.json' with { type: 'json' };
import countriesData from './words-countries.json' with { type: 'json' };
import sportsData from './words-sports.json' with { type: 'json' };
import gameConfig from './config.json' with { type: 'json' };

/**
 * All available themes for the Hangman game
 */
export const HANGMAN_THEMES: HangmanTheme[] = [
  animalsData as HangmanTheme,
  scienceData as HangmanTheme,
  geographyData as HangmanTheme,
  verbsData as HangmanTheme,
  professionsData as HangmanTheme,
  countriesData as HangmanTheme,
  sportsData as HangmanTheme
];

/**
 * Complete configuration for Hangman game data
 */
export const HANGMAN_DATA_CONFIG: HangmanDataConfig = {
  themes: HANGMAN_THEMES,
  defaultTheme: 'animales'
};

/**
 * Get a theme by its ID
 * @param themeId - The ID of the theme to retrieve
 * @returns The theme object or undefined if not found
 */
export function getThemeById(themeId: string): HangmanTheme | undefined {
  return HANGMAN_THEMES.find(theme => theme.id === themeId);
}

/**
 * Get all words from a specific theme
 * @param themeId - The ID of the theme
 * @returns Array of words or empty array if theme not found
 */
export function getWordsByTheme(themeId: string): HangmanWord[] {
  const theme = getThemeById(themeId);
  return theme ? theme.words : [];
}

/**
 * Get all words from all themes combined
 * @returns Array of all words
 */
export function getAllWords(): HangmanWord[] {
  return HANGMAN_THEMES.flatMap(theme => theme.words);
}

/**
 * Get a random word from a specific theme
 * @param themeId - The ID of the theme
 * @returns A random word or undefined if theme not found or empty
 */
export function getRandomWordFromTheme(themeId: string): HangmanWord | undefined {
  const words = getWordsByTheme(themeId);
  if (words.length === 0) return undefined;
  return words[Math.floor(Math.random() * words.length)];
}

/**
 * Get a random word from all themes
 * @returns A random word from any theme
 */
export function getRandomWord(): HangmanWord | undefined {
  const allWords = getAllWords();
  if (allWords.length === 0) return undefined;
  return allWords[Math.floor(Math.random() * allWords.length)];
}

/**
 * Get list of all theme IDs
 * @returns Array of theme IDs
 */
export function getThemeIds(): string[] {
  return HANGMAN_THEMES.map(theme => theme.id);
}

/**
 * Get list of all theme display names
 * @returns Array of theme display names
 */
export function getThemeDisplayNames(): { id: string; displayName: string }[] {
  return HANGMAN_THEMES.map(theme => ({
    id: theme.id,
    displayName: theme.displayName
  }));
}

/**
 * Game configuration
 */
export const HANGMAN_GAME_CONFIG: HangmanGameConfig = gameConfig as HangmanGameConfig;

/**
 * Get game configuration
 * @returns Game configuration object
 */
export function getGameConfig(): HangmanGameConfig {
  return HANGMAN_GAME_CONFIG;
}

/**
 * Get default settings
 * @returns Default game settings
 */
export function getDefaultSettings() {
  return HANGMAN_GAME_CONFIG.defaultSettings;
}

/**
 * Get difficulty level settings
 * @param level - Difficulty level name
 * @returns Difficulty level settings or default if not found
 */
export function getDifficultyLevel(level: string) {
  return HANGMAN_GAME_CONFIG.difficultyLevels[level] || HANGMAN_GAME_CONFIG.defaultSettings;
}

/**
 * Get available difficulty levels
 * @returns Array of difficulty level names
 */
export function getDifficultyLevels(): string[] {
  return Object.keys(HANGMAN_GAME_CONFIG.difficultyLevels);
}

