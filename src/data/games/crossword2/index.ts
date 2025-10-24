/**
 * Crossword2 Game Data Loader
 * Centralizes all game data and provides easy access to game configuration
 */

import type { 
  Crossword2GameConfig, 
  Crossword2Theme, 
  Crossword2Word,
  Crossword2DifficultyLevel 
} from '../../schemas/crossword2.schema';

// Import JSON files
import gameConfig from './config.json' with { type: 'json' };
import naturalezaData from './words-general.json' with { type: 'json' };

/**
 * Game configuration
 */
export const CROSSWORD2_GAME_CONFIG: Crossword2GameConfig = gameConfig as Crossword2GameConfig;

/**
 * Available themes
 */
export const CROSSWORD2_THEMES: Crossword2Theme[] = [
  naturalezaData as Crossword2Theme
];

/**
 * Get game configuration
 * @returns Game configuration object
 */
export function getGameConfig(): Crossword2GameConfig {
  return CROSSWORD2_GAME_CONFIG;
}

/**
 * Get default settings
 * @returns Default game settings
 */
export function getDefaultSettings() {
  return CROSSWORD2_GAME_CONFIG.defaultSettings;
}

/**
 * Get difficulty level settings
 * @param level - Difficulty level name
 * @returns Difficulty level settings or default if not found
 */
export function getDifficultyLevel(level: string): Crossword2DifficultyLevel {
  return CROSSWORD2_GAME_CONFIG.difficultyLevels[level] || CROSSWORD2_GAME_CONFIG.defaultSettings;
}

/**
 * Get available difficulty levels
 * @returns Array of difficulty level names
 */
export function getDifficultyLevels(): string[] {
  return Object.keys(CROSSWORD2_GAME_CONFIG.difficultyLevels);
}

/**
 * Get all available words
 * @returns Array of all words from all themes
 */
export function getAllWords(): Crossword2Word[] {
  return CROSSWORD2_THEMES.flatMap(theme => theme.words);
}

/**
 * Get words by theme ID
 * @param themeId - Theme ID
 * @returns Array of words for the theme
 */
export function getWordsByTheme(themeId: string): Crossword2Word[] {
  const theme = CROSSWORD2_THEMES.find(t => t.id === themeId);
  return theme ? theme.words : [];
}

/**
 * Get theme by ID
 * @param themeId - Theme ID
 * @returns Theme object or undefined if not found
 */
export function getThemeById(themeId: string): Crossword2Theme | undefined {
  return CROSSWORD2_THEMES.find(theme => theme.id === themeId);
}

/**
 * Get theme display names
 * @returns Array of theme display names
 */
export function getThemeDisplayNames(): { id: string; displayName: string }[] {
  return CROSSWORD2_THEMES.map(theme => ({
    id: theme.id,
    displayName: theme.displayName
  }));
}

/**
 * Get random words for a difficulty level
 * @param level - Difficulty level
 * @param count - Number of words to get
 * @returns Array of random words
 */
export function getRandomWords(level: string, count: number): Crossword2Word[] {
  const allWords = getAllWords();
  const difficulty = getDifficultyLevel(level);
  
  // Filter words by difficulty if specified
  const filteredWords = allWords.filter(word => {
    // Include words that match the level OR have no difficulty specified OR are easy
    const matches = !word.difficulty || word.difficulty === level || level === 'easy' || word.difficulty === 'easy';
    return matches;
  });
  
  // Shuffle and take the requested number
  const shuffled = [...filteredWords].sort(() => Math.random() - 0.5);
  const result = shuffled.slice(0, Math.min(count, difficulty.maxWords));
  return result;
}
