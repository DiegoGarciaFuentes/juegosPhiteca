import type { CrosswordConfig, PlacedWord, CrosswordGrid } from './types';

export class CrosswordLogic {
  private config: CrosswordConfig;
  private grid: CrosswordGrid;
  private placedWords: PlacedWord[] = [];

  constructor(config: CrosswordConfig) {
    this.config = config;
    this.grid = Array.from({ length: config.size }, () => Array(config.size).fill(null));
  }

  // Generar el crucigrama
  generateCrossword(): { grid: CrosswordGrid; placedWords: PlacedWord[] } {
    this.placeWords();
    return {
      grid: this.grid.map(row => [...row]),
      placedWords: [...this.placedWords]
    };
  }

  // Colocar palabras en el grid
  private placeWords(): void {
    this.config.words.forEach((entry, index) => {
      let placed = false;
      let attempts = 0;
      
      while (!placed && attempts < 100) {
        const direction = Math.random() > 0.5 ? 'H' : 'V';
        const row = Math.floor(Math.random() * this.config.size);
        const col = Math.floor(Math.random() * this.config.size);

        if (this.canPlaceWord(entry.word, row, col, direction)) {
          this.placeWord(entry.word, row, col, direction, index + 1);
          placed = true;
        }
        attempts++;
      }
    });
  }

  // Verificar si se puede colocar una palabra
  private canPlaceWord(word: string, row: number, col: number, direction: 'H' | 'V'): boolean {
    if (direction === 'H' && col + word.length > this.config.size) return false;
    if (direction === 'V' && row + word.length > this.config.size) return false;

    for (let i = 0; i < word.length; i++) {
      const r = direction === 'H' ? row : row + i;
      const c = direction === 'H' ? col + i : col;
      
      if (this.grid[r][c] && this.grid[r][c] !== word[i]) return false;
    }
    return true;
  }

  // Colocar una palabra en el grid
  private placeWord(word: string, row: number, col: number, direction: 'H' | 'V', number: number): void {
    for (let i = 0; i < word.length; i++) {
      const r = direction === 'H' ? row : row + i;
      const c = direction === 'H' ? col + i : col;
      this.grid[r][c] = word[i];
    }
    
    // Añadir número al inicio de la palabra
    const currentContent = this.grid[row][col];
    this.grid[row][col] = currentContent ? `${currentContent}${number}` : `${word[0]}${number}`;
    
    // Guardar información de la palabra colocada
    this.placedWords.push({
      word,
      row,
      col,
      direction,
      number
    });
  }

  // Obtener las pistas
  getClues(): { number: number; direction: 'H' | 'V'; clue: string }[] {
    return this.placedWords.map(placedWord => {
      const wordEntry = this.config.words.find(entry => entry.word === placedWord.word);
      return {
        number: placedWord.number,
        direction: placedWord.direction,
        clue: wordEntry?.clue || ''
      };
    });
  }

  // Obtener el grid actual
  getGrid(): CrosswordGrid {
    return this.grid.map(row => [...row]);
  }

  // Obtener las palabras colocadas
  getPlacedWords(): PlacedWord[] {
    return [...this.placedWords];
  }

  // Reiniciar el crucigrama
  reset(): void {
    this.grid = Array.from({ length: this.config.size }, () => Array(this.config.size).fill(null));
    this.placedWords = [];
  }
}
