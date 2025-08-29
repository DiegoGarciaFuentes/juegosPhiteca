export interface GameConfig {
  maxAttempts: number;
  selectedColors: number;
  allowDuplicates: boolean;
}

export interface Attempt {
  attempt: string[];
  feedback: string[];
}

export type GameState = 'config' | 'playing' | 'won' | 'lost';

export type FeedbackType = 'black' | 'white' | 'gray';
