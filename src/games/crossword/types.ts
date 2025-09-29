export interface WordEntry {
  word: string;
  clue: string;
}

export interface CrosswordConfig {
  size: number;
  words: WordEntry[];
}

export interface PlacedWord {
  word: string;
  row: number;
  col: number;
  direction: 'H' | 'V';
  number: number;
}

export type CellContent = string | null;

export type CrosswordGrid = CellContent[][];

