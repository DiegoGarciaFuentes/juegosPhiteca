import type { FeedbackType, GameConfig } from './types';
import { 
  getColorsForDifficulty, 
  generateSecretCode,
  getDifficultyLevel,
  getAllColors
} from '../../data/games/mastermind';

export class MastermindLogic {
  private secretCode: string[] = [];
  private difficulty: string | null;
  private maxAttempts: number;
  private codeLength: number;
  private availableColors: string[];
  private allowDuplicates: boolean;
  private isCustomConfig: boolean;

  constructor(difficultyOrConfig: string | GameConfig) {
    // Verificar si es configuración personalizada
    if (typeof difficultyOrConfig === 'object') {
      // Configuración personalizada
      this.isCustomConfig = true;
      this.difficulty = null;
      this.maxAttempts = difficultyOrConfig.maxAttempts;
      this.codeLength = 4; // Fijo para modo custom
      this.allowDuplicates = difficultyOrConfig.allowDuplicates;
      
      const allColors = getAllColors();
      this.availableColors = allColors.slice(0, difficultyOrConfig.selectedColors).map(c => c.id);
    } else {
      // Dificultad predefinida
      this.isCustomConfig = false;
      this.difficulty = difficultyOrConfig;
      const colors = getColorsForDifficulty(difficultyOrConfig);
      this.availableColors = colors.map(color => color.id);
      
      const settings = getDifficultyLevel(difficultyOrConfig);
      this.maxAttempts = settings.maxAttempts;
      this.codeLength = settings.codeLength;
      this.allowDuplicates = settings.allowDuplicates;
    }
  }

  // Generar código secreto
  generateSecretCode(): string[] {
    if (this.isCustomConfig) {
      // Generar código personalizado
      if (this.allowDuplicates) {
        this.secretCode = Array.from({ length: this.codeLength }, () => {
          return this.availableColors[Math.floor(Math.random() * this.availableColors.length)];
        });
      } else {
        const shuffled = [...this.availableColors].sort(() => Math.random() - 0.5);
        this.secretCode = shuffled.slice(0, this.codeLength);
      }
    } else {
      this.secretCode = generateSecretCode(this.difficulty!);
    }
    return this.secretCode;
  }

  // Iniciar nuevo juego
  startNewGame(): string[] {
    this.secretCode = this.generateSecretCode();
    console.log("Código secreto:", this.secretCode); // Debug
    return this.secretCode;
  }

  // Evaluar intento
  evaluateAttempt(attempt: string[]): FeedbackType[] {
    const feedbackPegs: FeedbackType[] = [];
    const remainingSecret = [...this.secretCode];
    const remainingAttempt: { color: string; index: number }[] = [];

    // Revisar posiciones correctas
    attempt.forEach((color, index) => {
      if (color === this.secretCode[index]) {
        feedbackPegs.push("black");
        remainingSecret[index] = null as any;
      } else {
        remainingAttempt.push({ color, index });
      }
    });

    // Revisar colores correctos en posición incorrecta
    remainingAttempt.forEach(({ color }) => {
      const matchIndex = remainingSecret.indexOf(color);
      if (matchIndex !== -1) {
        feedbackPegs.push("white");
        remainingSecret[matchIndex] = null as any;
      } else {
        feedbackPegs.push("gray");
      }
    });

    // Ordenar feedback: negros, blancos, grises
    return [
      ...feedbackPegs.filter((peg) => peg === "black"),
      ...feedbackPegs.filter((peg) => peg === "white"),
      ...feedbackPegs.filter((peg) => peg === "gray"),
    ];
  }

  // Verificar si el intento es correcto
  isCorrectAttempt(attempt: string[]): boolean {
    return attempt.every((color, index) => color === this.secretCode[index]);
  }

  // Obtener código secreto (para mostrar al final)
  getSecretCode(): string[] {
    return [...this.secretCode];
  }


  // Obtener dificultad actual
  getDifficulty(): string | null {
    return this.difficulty;
  }

  // Verificar si permite duplicados
  getAllowDuplicates(): boolean {
    return this.allowDuplicates;
  }

  // Obtener colores disponibles
  getAvailableColors(): string[] {
    return this.availableColors;
  }

  // Obtener longitud del código
  getCodeLength(): number {
    return this.codeLength;
  }

  // Obtener máximo de intentos
  getMaxAttempts(): number {
    return this.maxAttempts;
  }
}
