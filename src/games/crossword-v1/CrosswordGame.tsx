import React, { useState, useEffect } from 'react';
import type { CrosswordConfig, CrosswordGrid } from './types';
import { CrosswordLogic } from './CrosswordLogic';
import './CrosswordGame.css';

const CrosswordGame: React.FC = () => {
  // Configuración del crucigrama
  const config: CrosswordConfig = {
    size: 10,
    words: [
      { word: "BOSQUE", clue: "Lugar donde crecen muchos árboles" },
      { word: "TORMENTA", clue: "Fenómeno atmosférico con lluvia y relámpagos" },
      { word: "CÉSPED", clue: "Planta verde que crece en el suelo y cubre grandes áreas" },
      { word: "AVE", clue: "Animal que vuela y pone huevos" },
      { word: "SOL", clue: "Fuente de luz natural que ilumina el día" }
    ]
  };

  // Estado del juego
  const [crosswordLogic] = useState(() => new CrosswordLogic(config));
  const [grid, setGrid] = useState<CrosswordGrid>([]);
  const [clues, setClues] = useState<{ number: number; direction: 'H' | 'V'; clue: string }[]>([]);
  const [showSolution, setShowSolution] = useState(false);

  // Generar el crucigrama al cargar
  useEffect(() => {
    generateCrossword();
  }, []);

  // Generar nuevo crucigrama
  const generateCrossword = () => {
    crosswordLogic.reset();
    const result = crosswordLogic.generateCrossword();
    setGrid(result.grid);
    setClues(crosswordLogic.getClues());
    setShowSolution(false);
  };

  // Mostrar crucigrama en blanco
  const handleShowBlank = () => {
    setShowSolution(false);
  };

  // Mostrar solución
  const handleShowSolution = () => {
    setShowSolution(true);
  };

  // Renderizar celda
  const renderCell = (cell: string | null, rowIndex: number, colIndex: number) => {
    if (!cell) {
      return (
        <div key={`${rowIndex}-${colIndex}`} className="cell filled">
        </div>
      );
    }

    let displayText = cell;
    let number = null;

    // Extraer número si existe
    if (/[0-9]/.test(cell)) {
      const match = cell.match(/[0-9]/);
      if (match) {
        number = match[0];
        displayText = cell.replace(/[0-9]/g, '');
      }
    }

    // Si no mostrar solución, mostrar solo números
    if (!showSolution && displayText && !number) {
      displayText = '';
    }

    return (
      <div key={`${rowIndex}-${colIndex}`} className="cell">
        {number && <span className="number">{number}</span>}
        {displayText}
      </div>
    );
  };

  return (
    <div className="crossword-game">
      <h2>📝 Generador de Crucigrama</h2>
      
      <div className="game-info">
        <p>¡Descubre las palabras relacionadas con la naturaleza!</p>
      </div>

      {/* Controles */}
      <div className="controls">
        <button className="btn" onClick={handleShowBlank}>
          Mostrar Crucigrama en Blanco
        </button>
        <button className="btn" onClick={handleShowSolution}>
          Mostrar Solución
        </button>
        <button className="btn btn-secondary" onClick={generateCrossword}>
          Generar Nuevo Crucigrama
        </button>
      </div>

      {/* Crucigrama */}
      <div 
        className="crossword-container"
        style={{
          gridTemplateColumns: `repeat(${config.size}, 40px)`,
          gridTemplateRows: `repeat(${config.size}, 40px)`
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))
        )}
      </div>

      {/* Pistas */}
      <div className="clues">
        <h3>Pistas</h3>
        <ul>
          {clues.map((clue, index) => (
            <li key={index}>
              <span className="clue-number">{clue.number}.</span>
              <span className="clue-direction">
                {clue.direction === 'H' ? 'Horizontal' : 'Vertical'}:
              </span>
              <span className="clue-text"> {clue.clue}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CrosswordGame;
