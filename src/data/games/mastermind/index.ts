/**
 * Mastermind Game Data Loader
 * Centralizes all game data and provides easy access to game configuration
 */

import type { 
  MastermindGameConfig, 
  MastermindColorSet, 
  MastermindColor,
  MastermindDifficultyLevel 
} from '../../schemas/mastermind.schema';

// Import JSON files
import gameConfig from './config.json' with { type: 'json' };
import colorsData from './colors.json' with { type: 'json' };

/**
 * Game configuration
 */
export const MASTERMIND_GAME_CONFIG: MastermindGameConfig = gameConfig as MastermindGameConfig;

/**
 * Available color sets
 */
export const MASTERMIND_COLOR_SETS: MastermindColorSet[] = [
  colorsData as MastermindColorSet
];

/**
 * Get game configuration
 * @returns Game configuration object
 */
export function getGameConfig(): MastermindGameConfig {
  return MASTERMIND_GAME_CONFIG;
}

/**
 * Get default settings
 * @returns Default game settings
 */
export function getDefaultSettings() {
  return MASTERMIND_GAME_CONFIG.defaultSettings;
}

/**
 * Get difficulty level settings
 * @param level - Difficulty level name
 * @returns Difficulty level settings or default if not found
 */
export function getDifficultyLevel(level: string): MastermindDifficultyLevel {
  return MASTERMIND_GAME_CONFIG.difficultyLevels[level] || MASTERMIND_GAME_CONFIG.defaultSettings;
}

/**
 * Get available difficulty levels
 * @returns Array of difficulty level names
 */
export function getDifficultyLevels(): string[] {
  return Object.keys(MASTERMIND_GAME_CONFIG.difficultyLevels);
}

/**
 * Get all available colors
 * @returns Array of all colors
 */
export function getAllColors(): MastermindColor[] {
  return MASTERMIND_COLOR_SETS.flatMap(set => set.colors);
}

/**
 * Get colors by set ID
 * @param setId - Color set ID
 * @returns Color set or undefined if not found
 */
export function getColorSetById(setId: string): MastermindColorSet | undefined {
  return MASTERMIND_COLOR_SETS.find(set => set.id === setId);
}

/**
 * Get colors for a specific difficulty level
 * @param level - Difficulty level
 * @returns Array of colors for the difficulty
 */
export function getColorsForDifficulty(level: string): MastermindColor[] {
  const difficulty = getDifficultyLevel(level);
  const allColors = getAllColors();
  return allColors.slice(0, difficulty.selectedColors);
}

/**
 * Get random color from available colors
 * @param level - Difficulty level
 * @returns Random color
 */
export function getRandomColor(level: string): MastermindColor {
  const colors = getColorsForDifficulty(level);
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Generate a secret code for the game
 * @param level - Difficulty level
 * @returns Array of color IDs representing the secret code
 */
export function generateSecretCode(level: string): string[] {
  const difficulty = getDifficultyLevel(level);
  const colors = getColorsForDifficulty(level);
  const codeLength = difficulty.codeLength;
  
  if (difficulty.allowDuplicates) {
    // Allow duplicates
    return Array.from({ length: codeLength }, () => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      return randomColor.id;
    });
  } else {
    // No duplicates - shuffle and take first N
    const shuffled = [...colors].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, codeLength).map(color => color.id);
  }
}

/**
 * Get color by ID
 * @param colorId - Color ID
 * @returns Color object or undefined if not found
 */
export function getColorById(colorId: string): MastermindColor | undefined {
  return getAllColors().find(color => color.id === colorId);
}

/**
 * Get color sets display names
 * @returns Array of color set display names
 */
export function getColorSetDisplayNames(): { id: string; displayName: string }[] {
  return MASTERMIND_COLOR_SETS.map(set => ({
    id: set.id,
    displayName: set.displayName
  }));
}
