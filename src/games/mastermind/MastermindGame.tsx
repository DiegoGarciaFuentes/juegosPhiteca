import React, { useState } from 'react';
import type { Attempt, GameState } from './types';
import { MastermindLogic } from './MastermindLogic';
import { 
  getDefaultSettings, 
  getDifficultyLevels
} from '../../data/games/mastermind';
import './MastermindGame.css';

const MastermindGame: React.FC = () => {
  // Configuración por defecto
  const defaultSettings = getDefaultSettings();
  
  // Estado del juego
  const [gameState, setGameState] = useState<GameState>('config');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  
  // Configuración personalizada
  const [customConfig, setCustomConfig] = useState({
    maxAttempts: 10,
    selectedColors: 6,
    allowDuplicates: true
  });
  
  // Estado del juego actual
  const [gameLogic, setGameLogic] = useState<MastermindLogic | null>(null);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState<string[]>(Array(defaultSettings.codeLength).fill(null));
  const [feedback, setFeedback] = useState<string>('');
  const [showSolution, setShowSolution] = useState(false);

  // Iniciar nuevo juego
  const startGame = () => {
    const logic = selectedDifficulty === 'custom' 
      ? new MastermindLogic(customConfig)
      : new MastermindLogic(selectedDifficulty);
    logic.startNewGame();
    setGameLogic(logic);
    setAttempts([]);
    setCurrentAttempt(Array(logic.getCodeLength()).fill(null));
    setFeedback('');
    setShowSolution(false);
    setGameState('playing');
  };

  // Seleccionar color
  const selectColor = (colIndex: number, isRightClick: boolean = false) => {
    if (gameState !== 'playing' || !gameLogic) return;

    const currentColor = currentAttempt[colIndex];
    const availableColors = gameLogic.getAvailableColors();

    let nextColor: string;
    if (isRightClick) {
      // Retroceder al color anterior
      const currentIndex = availableColors.indexOf(currentColor || '');
      nextColor = availableColors[(currentIndex - 1 + availableColors.length) % availableColors.length];
    } else {
      // Avanzar al siguiente color
      const currentIndex = availableColors.indexOf(currentColor || '');
      nextColor = availableColors[(currentIndex + 1) % availableColors.length];
    }

    const newAttempt = [...currentAttempt];
    newAttempt[colIndex] = nextColor;
    setCurrentAttempt(newAttempt);
  };

  // Enviar intento
  const submitAttempt = () => {
    if (!gameLogic || currentAttempt.some(color => color === null)) return;

    // Filtrar valores null antes de evaluar
    const validAttempt = currentAttempt.filter(color => color !== null) as string[];
    
    const feedbackPegs = gameLogic.evaluateAttempt(validAttempt);
    
    const newAttempt: Attempt = {
      attempt: [...currentAttempt],
      feedback: feedbackPegs
    };

    const newAttempts = [...attempts, newAttempt];
    setAttempts(newAttempts);
    setCurrentAttempt(Array(gameLogic ? gameLogic.getCodeLength() : 4).fill(null));

    // Verificar si ganó o perdió
    if (gameLogic.isCorrectAttempt(validAttempt)) {
      setFeedback('¡Felicidades! Has ganado.');
      setGameState('won');
      setShowSolution(true);
    } else if (newAttempts.length >= gameLogic.getMaxAttempts()) {
      setFeedback('¡Has perdido! Puedes intentarlo de nuevo.');
      setGameState('lost');
      setShowSolution(true);
    }
  };

  // Reiniciar juego
  const restartGame = () => {
    setGameState('config');
    setAttempts([]);
    setCurrentAttempt(Array(gameLogic ? gameLogic.getCodeLength() : 4).fill(null));
    setFeedback('');
    setShowSolution(false);
    setGameLogic(null);
  };

  // Verificar si se puede enviar el intento
  const canSubmit = currentAttempt.every(color => color !== null) && gameState === 'playing';

  return (
    <div className={`mastermind-game ${gameState === 'won' ? 'game-won' : ''} ${gameState === 'lost' ? 'game-lost' : ''}`}>
      <h1>🧠 Mastermind</h1>

      {/* Configuración inicial */}
      {gameState === 'config' && (
        <div className="config-section">
          <h2>Configuración del juego</h2>
          
          <div className="config-row">
            <label htmlFor="difficulty">Dificultad:</label>
            <select
              id="difficulty"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              {getDifficultyLevels().map(level => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
              <option value="custom">🔧 Personalizado</option>
            </select>
          </div>

          {/* Configuración personalizada */}
          {selectedDifficulty === 'custom' && (
            <>
              <div className="config-row">
                <label htmlFor="attempts">Número de intentos:</label>
                <input
                  type="number"
                  id="attempts"
                  min="4"
                  max="20"
                  value={customConfig.maxAttempts}
                  onChange={(e) => setCustomConfig({...customConfig, maxAttempts: parseInt(e.target.value)})}
                />
              </div>
              
              <div className="config-row">
                <label htmlFor="colors">Número de colores:</label>
                <input
                  type="number"
                  id="colors"
                  min="4"
                  max="8"
                  value={customConfig.selectedColors}
                  onChange={(e) => setCustomConfig({...customConfig, selectedColors: parseInt(e.target.value)})}
                />
              </div>
              
              <div className="config-row">
                <label htmlFor="duplicates">¿Permitir colores repetidos?</label>
                <select
                  id="duplicates"
                  value={customConfig.allowDuplicates.toString()}
                  onChange={(e) => setCustomConfig({...customConfig, allowDuplicates: e.target.value === 'true'})}
                >
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
              </div>
            </>
          )}

          <button className="btn" onClick={startGame}>
            Iniciar Juego
          </button>
        </div>
      )}

      {/* Leyenda */}
      {gameState !== 'config' && (
        <div className="legend">
          <h2>Cómo jugar</h2>
          <p>El objetivo del juego es adivinar el código secreto generado por el sistema.</p>
          <ul>
            <li><strong>Colores disponibles:</strong> {gameLogic ? gameLogic.getAvailableColors().join(', ') : 'Cargando...'}</li>
            <li><strong>Número de intentos:</strong> {gameLogic ? gameLogic.getMaxAttempts() : 'Cargando...'}</li>
            <li><strong>Colores repetidos:</strong> {gameLogic ? (gameLogic.getAllowDuplicates() ? 'Permitidos' : 'No permitidos') : 'Cargando...'}</li>
          </ul>
          <h3>Interpretación del feedback:</h3>
          <ul>
            <li><span className="peg black"></span> <strong>Verde:</strong> Color y posición correctos.</li>
            <li><span className="peg white"></span> <strong>Naranja:</strong> Color correcto, pero en posición incorrecta.</li>
            <li><span className="peg gray"></span> <strong>Gris:</strong> Color no está en el código secreto.</li>
          </ul>
          <p>Haz clic izquierdo para avanzar en colores, clic derecho para retroceder.</p>
        </div>
      )}

      {/* Retroalimentación del juego */}
      {feedback && (
        <div className={`feedback ${gameState === 'won' ? 'game-won-message' : ''} ${gameState === 'lost' ? 'game-lost-message' : ''}`}>
          {feedback}
        </div>
      )}

      {/* Tablero */}
      {gameState !== 'config' && (
        <div className="board">
          {/* Filas de intentos */}
          {Array.from({ length: gameLogic ? gameLogic.getMaxAttempts() : 10 }, (_, i) => {
            const attempt = attempts[i];
            const isCurrentRow = i === attempts.length;
            const isActiveRow = isCurrentRow && gameState === 'playing';
            
            return (
              <div key={i} className="row">
                {/* Espacios para colores */}
                {Array.from({ length: 4 }, (_, j) => {
                  let backgroundColor: string | undefined;
                  
                  if (attempt) {
                    // Fila completada - mostrar colores del intento
                    backgroundColor = attempt.attempt[j];
                  } else if (isActiveRow) {
                    // Fila activa - mostrar colores del intento actual
                    backgroundColor = currentAttempt[j] || undefined;
                  }
                  // Fila futura - sin colores (undefined)
                  
                  return (
                    <div
                      key={j}
                      className={`hole ${isActiveRow ? 'active' : ''}`}
                      style={{ backgroundColor }}
                      onClick={() => isActiveRow && selectColor(j)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        isActiveRow && selectColor(j, true);
                      }}
                    />
                  );
                })}

                {/* Espacios para feedback */}
                <div className="feedback-row">
                  {Array.from({ length: 4 }, (_, j) => {
                    let feedbackColor = '#ddd';
                    
                    if (attempt && attempt.feedback[j]) {
                      if (attempt.feedback[j] === 'black') feedbackColor = 'green';
                      else if (attempt.feedback[j] === 'white') feedbackColor = 'orange';
                      else if (attempt.feedback[j] === 'gray') feedbackColor = 'gray';
                    }
                    
                    return (
                      <div
                        key={j}
                        className="feedback-hole"
                        style={{ backgroundColor: feedbackColor }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Fila de solución */}
          {showSolution && gameLogic && (
            <div className="row solution-row">
              {gameLogic.getSecretCode().map((color, index) => (
                <div
                  key={index}
                  className="hole"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Controles */}
      {gameState !== 'config' && (
        <div className="controls">
          <button 
            className="btn" 
            onClick={submitAttempt}
            disabled={!canSubmit}
          >
            Enviar Intento
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={restartGame}
          >
            Reiniciar Juego
          </button>
        </div>
      )}
    </div>
  );
};

export default MastermindGame;
