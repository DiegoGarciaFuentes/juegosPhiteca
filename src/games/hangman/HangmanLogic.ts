import type { HangmanConfig, WordEntry, GameState } from './types';

export class HangmanLogic {
  private config: HangmanConfig;
  private currentGameState: GameState | null = null;

  constructor(config: HangmanConfig) {
    this.config = config;
  }

  // Iniciar nuevo juego
  startNewGame(customWord?: WordEntry): GameState {
    const randomWord = customWord || this.getRandomWord();
    this.currentGameState = {
      currentWord: randomWord.word.toUpperCase(),
      guessedLetters: [],
      wrongAttempts: 0,
      gameStatus: 'playing',
      hint: randomWord.hint,
      category: randomWord.category
    };
    return { ...this.currentGameState };
  }

  // Obtener palabra aleatoria
  private getRandomWord(): WordEntry {
    const randomIndex = Math.floor(Math.random() * this.config.words.length);
    return this.config.words[randomIndex];
  }

  // Adivinar letra
  guessLetter(letter: string): GameState {
    if (!this.currentGameState || this.currentGameState.gameStatus !== 'playing') {
      throw new Error('No hay un juego activo');
    }

    const upperLetter = letter.toUpperCase();
    
    // Si la letra ya fue adivinada, no hacer nada
    if (this.currentGameState.guessedLetters.includes(upperLetter)) {
      return { ...this.currentGameState };
    }

    // Añadir letra a las adivinadas
    this.currentGameState.guessedLetters.push(upperLetter);

    // Verificar si la letra está en la palabra
    if (this.currentGameState.currentWord.includes(upperLetter)) {
      // Verificar si ganó
      if (this.isWordComplete()) {
        this.currentGameState.gameStatus = 'won';
      }
    } else {
      // Letra incorrecta
      this.currentGameState.wrongAttempts++;
      
      // Verificar si perdió
      if (this.currentGameState.wrongAttempts >= this.config.maxAttempts) {
        this.currentGameState.gameStatus = 'lost';
      }
    }

    return { ...this.currentGameState };
  }

  // Verificar si la palabra está completa
  private isWordComplete(): boolean {
    if (!this.currentGameState) return false;
    
    return this.currentGameState.currentWord
      .split('')
      .every(letter => this.currentGameState!.guessedLetters.includes(letter));
  }

  // Obtener estado actual del juego
  getCurrentState(): GameState | null {
    return this.currentGameState ? { ...this.currentGameState } : null;
  }

  // Obtener palabra con letras adivinadas
  getDisplayWord(): string {
    if (!this.currentGameState) return '';
    
    return this.currentGameState.currentWord
      .split('')
      .map(letter => 
        this.currentGameState!.guessedLetters.includes(letter) ? letter : '_'
      )
      .join(' ');
  }

  // Obtener letras incorrectas
  getWrongLetters(): string[] {
    if (!this.currentGameState) return [];
    
    return this.currentGameState.guessedLetters.filter(letter => 
      !this.currentGameState!.currentWord.includes(letter)
    );
  }

  // Reiniciar juego
  reset(): void {
    this.currentGameState = null;
  }
}

