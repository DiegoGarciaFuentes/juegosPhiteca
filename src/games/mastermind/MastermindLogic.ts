import type { GameConfig, FeedbackType } from './types';

export const COLORS = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "cyan"];

export class MastermindLogic {
  private secretCode: string[] = [];
  private config: GameConfig;

  constructor(config: GameConfig) {
    this.config = config;
  }

  // Generar código secreto
  generateSecretCode(): string[] {
    const availableColors = COLORS.slice(0, this.config.selectedColors);
    if (this.config.allowDuplicates) {
      return Array.from({ length: 4 }, () => 
        availableColors[Math.floor(Math.random() * availableColors.length)]
      );
    } else {
      return this.shuffleArray([...availableColors]).slice(0, 4);
    }
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

  // Mezclar array para colores sin duplicados
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
