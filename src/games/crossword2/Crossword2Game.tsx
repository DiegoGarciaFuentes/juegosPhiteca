import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  getDifficultyLevels,
  getThemeDisplayNames,
  getRandomWords,
  getDifficultyLevel,
  getThemeById
} from '../../data/games/crossword2';
import { Crossword2Logic } from './Crossword2Logic';
import './Crossword2Game.css';

interface Crossword2GameProps {}

const Crossword2Game: React.FC<Crossword2GameProps> = () => {
  // Estado del juego
  const [gameState, setGameState] = useState<'config' | 'playing' | 'won' | 'lost'>('config');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [selectedTheme, setSelectedTheme] = useState('naturaleza');
  
  // Referencias
  const gridRef = useRef<HTMLDivElement>(null);
  const gameLogicRef = useRef<Crossword2Logic | null>(null);
  
  // Estado del crucigrama
  const [gameData, setGameData] = useState<any>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [credits, setCredits] = useState(10);
  const [activeSlot, setActiveSlot] = useState<any>(null);
  const [indexInWord, setIndexInWord] = useState(0);

  // Inicializar juego
  const startGame = useCallback(() => {
    const difficulty = getDifficultyLevel(selectedDifficulty);
    const words = getRandomWords(selectedTheme, difficulty.maxWords);
    
    const logic = new Crossword2Logic({
      size: difficulty.gridSize,
      maxWords: difficulty.maxWords,
      words: words
    });
    
    const state = logic.generate();
    
    gameLogicRef.current = logic;
    setGameData(state);
    setCredits(10);
    setActiveSlot(null);
    setIndexInWord(0);
    setShowSolution(false);
    setGameState('playing');
  }, [selectedDifficulty, selectedTheme]);

  // Renderizar grid
  const renderGrid = useCallback(() => {
    if (!gameData || !gridRef.current) return;
    
    
    const { grid, numbering } = gameData;
    const n = grid.length;
    
    gridRef.current.style.gridTemplateColumns = `repeat(${n}, var(--cell))`;
    gridRef.current.style.gridTemplateRows = `repeat(${n}, var(--cell))`;
    gridRef.current.innerHTML = '';

    // Mapa para resaltar palabra activa y cursor
    let highlight = new Set();
    let cursorKey = null;
    
    if (activeSlot) {
      for (let i = 0; i < activeSlot.len; i++) {
        const { r, c } = getCellCoords(activeSlot, i);
        highlight.add(`${r},${c}`);
      }
      const cur = getCellCoords(activeSlot, indexInWord);
      cursorKey = `${cur.r},${cur.c}`;
    }

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const cell = grid[r][c];
        const el = document.createElement('div');
        const isUnused = !cell.ch;
        
        el.className = 'cell' + (isUnused ? ' unused' : '');
        el.setAttribute('role', 'gridcell');
        el.dataset.r = r.toString();
        el.dataset.c = c.toString();
        el.dataset.row = r.toString();
        el.dataset.col = c.toString();
        
        const key = `${r},${c}`;
        if (highlight.has(key)) el.classList.add('active');
        if (cursorKey === key) el.classList.add('cursor');
        
        if (!isUnused) {
          if (cell.revealed) el.classList.add('revealed');
          else if (cell.flag === 'wrong') el.classList.add('wrong');
          else if (cell.flag === 'right') el.classList.add('right');
          else if (cell.discovered) el.classList.add('discovered');
        }
        
        // Texto a mostrar
        let toShow = '';
        if (!isUnused) {
          toShow = showSolution ? cell.ch : (cell.player || '');
        }
        el.textContent = toShow;
        
        // Número si existe
        if (numbering[r][c]) {
          const s = document.createElement('span');
          s.className = 'number';
          s.textContent = numbering[r][c];
          el.appendChild(s);
        }
        
        el.addEventListener('click', () => selectSlotFromCell(r, c));
        gridRef.current.appendChild(el);
      }
    }
  }, [gameData, activeSlot, indexInWord, showSolution]);

  // Renderizar pistas
  const renderClues = useCallback(() => {
    if (!gameData) return;
    
    const { clues } = gameData;
    
    // Horizontales
    const acrossEl = document.getElementById('clues-across');
    if (acrossEl) {
      acrossEl.innerHTML = '';
      clues.across.forEach((item: any) => {
        const li = document.createElement('li');
        li.textContent = `${item.num}. (${item.len}) ${item.clue}`;
        if (activeSlot && activeSlot.num === item.num && activeSlot.dir === item.dir) {
          li.classList.add('active');
        }
        li.addEventListener('click', () => setActiveSlot(item));
        acrossEl.appendChild(li);
      });
    }
    
    // Verticales
    const downEl = document.getElementById('clues-down');
    if (downEl) {
      downEl.innerHTML = '';
      clues.down.forEach((item: any) => {
        const li = document.createElement('li');
        li.textContent = `${item.num}. (${item.len}) ${item.clue}`;
        if (activeSlot && activeSlot.num === item.num && activeSlot.dir === item.dir) {
          li.classList.add('active');
        }
        li.addEventListener('click', () => setActiveSlot(item));
        downEl.appendChild(li);
      });
    }
  }, [gameData, activeSlot]);

  // Utilidades
  const getCellCoords = (slot: any, idx: number) => {
    return slot.dir === 'H' 
      ? { r: slot.row, c: slot.col + idx }
      : { r: slot.row + idx, c: slot.col };
  };

  const selectSlotFromCell = (r: number, c: number) => {
    if (!gameData) return;
    
    const { slots } = gameData;
    const candidates = slots.filter((s: any) => 
      (s.dir === 'H' && s.row === r && c >= s.col && c < s.col + s.len) ||
      (s.dir === 'V' && s.col === c && r >= s.row && r < s.row + s.len)
    );
    
    if (!candidates.length) return;
    
    let slot;
    if (activeSlot && candidates.some((s: any) => s.dir !== activeSlot.dir)) {
      const alt = candidates.find((s: any) => s.dir !== activeSlot.dir);
      slot = alt || candidates[0];
    } else {
      slot = candidates[0];
    }
    
    if (gameLogicRef.current) {
      gameLogicRef.current.setActive(slot);
    }
    
    let newIndex;
    if (slot.dir === 'H') {
      newIndex = c - slot.col;
    } else {
      newIndex = r - slot.row;
    }
    
    // Sincronizar el índice en la lógica del juego
    if (gameLogicRef.current) {
      gameLogicRef.current.setIndexInWord(newIndex);
    }
    
    setIndexInWord(newIndex);
    setActiveSlot(slot);
    renderGrid(); // Actualizar visualización
  };

  // Manejar navegación con teclado
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (gameState !== 'playing' || !gameLogicRef.current) return;
    
    const { key } = event;
    
    // Navegación con flechas
    if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown') {
      event.preventDefault();
      
      let direction: 'left' | 'right' | 'up' | 'down';
      if (key === 'ArrowLeft') direction = 'left';
      else if (key === 'ArrowRight') direction = 'right';
      else if (key === 'ArrowUp') direction = 'up';
      else direction = 'down';
      
      // Verificar si la celda de destino está descubierta antes de moverse
      if (activeSlot && gameData) {
        const { dir, row, col, len } = activeSlot;
        const currentIndex = gameLogicRef.current.getIndexInWord();
        let newIndex = currentIndex;
        
        if (dir === 'H') {
          if (direction === 'left') {
            newIndex = Math.max(0, currentIndex - 1);
          } else if (direction === 'right') {
            newIndex = Math.min(len - 1, currentIndex + 1);
          }
        } else {
          if (direction === 'up') {
            newIndex = Math.max(0, currentIndex - 1);
          } else if (direction === 'down') {
            newIndex = Math.min(len - 1, currentIndex + 1);
          }
        }
        
        // Verificar si la celda de destino está descubierta
        const r = dir === 'H' ? row : row + newIndex;
        const c = dir === 'H' ? col + newIndex : col;
        
        if (gameData.grid[r] && gameData.grid[r][c] && gameData.grid[r][c].discovered) {
          // No permitir moverse a celdas descubiertas
          return;
        }
      }
      
      gameLogicRef.current.moveCursor(direction);
      setIndexInWord(gameLogicRef.current.getIndexInWord());
      renderGrid();
    }
    
    // Escribir letras
    if (key.length === 1 && /[A-Za-zÑñ]/.test(key)) {
      event.preventDefault();
      
      // Verificar si la celda actual está descubierta
      if (activeSlot && gameData) {
        const { dir, row, col, len } = activeSlot;
        const index = gameLogicRef.current.getIndexInWord();
        const r = dir === 'H' ? row : row + index;
        const c = dir === 'H' ? col + index : col;
        
        if (gameData.grid[r] && gameData.grid[r][c] && gameData.grid[r][c].discovered) {
          // No permitir escribir en celdas descubiertas
          return;
        }
      }
      
      gameLogicRef.current.putLetter(key);
      setIndexInWord(gameLogicRef.current.getIndexInWord()); // Actualizar índice después de escribir
      renderGrid();
    }
    
    // Backspace para borrar letra
    if (key === 'Backspace') {
      event.preventDefault();
      
      // Verificar si la celda actual está descubierta
      if (activeSlot && gameData) {
        const { dir, row, col, len } = activeSlot;
        const index = gameLogicRef.current.getIndexInWord();
        const r = dir === 'H' ? row : row + index;
        const c = dir === 'H' ? col + index : col;
        
        if (gameData.grid[r] && gameData.grid[r][c] && gameData.grid[r][c].discovered) {
          // No permitir borrar celdas descubiertas
          return;
        }
      }
      
      gameLogicRef.current.deleteLetter();
      setIndexInWord(gameLogicRef.current.getIndexInWord());
      renderGrid();
    }
    
    // Enter para cambiar a la siguiente palabra
    if (key === 'Enter') {
      event.preventDefault();
      gameLogicRef.current.goToNextWord();
      setActiveSlot(gameLogicRef.current.getActiveSlot());
      setIndexInWord(gameLogicRef.current.getIndexInWord());
      renderGrid();
    }
    
    // Tab para cambiar de palabra (con Shift para retroceder)
    if (key === 'Tab') {
      event.preventDefault();
      if (event.shiftKey) {
        gameLogicRef.current.goToPreviousWord();
      } else {
        gameLogicRef.current.goToNextWord();
      }
      setActiveSlot(gameLogicRef.current.getActiveSlot());
      setIndexInWord(gameLogicRef.current.getIndexInWord());
      renderGrid();
    }
  }, [gameState, renderGrid]);

  // Handlers para botones de validación
  const handleCheckLetter = useCallback(() => {
    if (!gameLogicRef.current || !activeSlot || credits < 1) return;
    
    const result = gameLogicRef.current.checkCurrentLetter();
    // Aplicar validación visual sin mostrar mensajes
    if (result.position.row >= 0 && result.position.col >= 0) {
      // Marcar la celda con color visual
      const cellElement = document.querySelector(`[data-row="${result.position.row}"][data-col="${result.position.col}"]`);
      if (cellElement) {
        cellElement.classList.remove('validation-correct', 'validation-incorrect');
        cellElement.classList.add(result.correct ? 'validation-correct' : 'validation-incorrect');
        
        // Remover la clase después de 2 segundos
        setTimeout(() => {
          cellElement.classList.remove('validation-correct', 'validation-incorrect');
        }, 2000);
      }
    }
    // Consumir 1 crédito
    setCredits(prev => prev - 1);
  }, [activeSlot, credits]);

  const handleCheckWord = useCallback(() => {
    if (!gameLogicRef.current || !activeSlot || credits < 3) return;
    
    const result = gameLogicRef.current.checkCurrentWord();
    // Aplicar validación visual a todas las celdas de la palabra
    result.positions.forEach((pos, index) => {
      const cellElement = document.querySelector(`[data-row="${pos.row}"][data-col="${pos.col}"]`);
      if (cellElement) {
        cellElement.classList.remove('validation-correct', 'validation-incorrect');
        cellElement.classList.add(result.correct ? 'validation-correct' : 'validation-incorrect');
        
        // Remover la clase después de 2 segundos
        setTimeout(() => {
          cellElement.classList.remove('validation-correct', 'validation-incorrect');
        }, 2000);
      }
    });
    // Consumir 3 créditos
    setCredits(prev => prev - 3);
  }, [activeSlot, credits]);

  const handleHintLetter = useCallback(() => {
    if (!gameLogicRef.current || !activeSlot || credits < 3) return;
    
    const success = gameLogicRef.current.hintCurrentLetter();
    if (success) {
      // Marcar la letra como descubierta (no se puede borrar)
      const { dir, row, col, len } = activeSlot;
      const index = gameLogicRef.current.getIndexInWord();
      const r = dir === 'H' ? row : row + index;
      const c = dir === 'H' ? col + index : col;
      
      // Marcar la celda como descubierta en el estado
      if (gameData && gameData.grid[r] && gameData.grid[r][c]) {
        gameData.grid[r][c].discovered = true;
      }
      
      setCredits(prev => prev - 3);
      renderGrid();
    }
  }, [activeSlot, credits, gameData, renderGrid]);

  const handleHintWord = useCallback(() => {
    if (!gameLogicRef.current || !activeSlot || credits < 5) return;
    
    const success = gameLogicRef.current.hintCurrentWord();
    if (success) {
      // Marcar toda la palabra como descubierta (no se puede borrar)
      const { dir, row, col, len } = activeSlot;
      for (let i = 0; i < len; i++) {
        const r = dir === 'H' ? row : row + i;
        const c = dir === 'H' ? col + i : col;
        
        if (gameData && gameData.grid[r] && gameData.grid[r][c]) {
          gameData.grid[r][c].discovered = true;
        }
      }
      
      setCredits(prev => prev - 5);
      renderGrid();
    }
  }, [activeSlot, credits, gameData, renderGrid]);

  // Efectos
  useEffect(() => {
    if (gameState === 'playing') {
      renderGrid();
      renderClues();
      
      // Agregar listener de teclado
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [gameState, renderGrid, renderClues, handleKeyDown]);

  return (
    <div className="crossword2-game">
      <header>
        <div>
          <h1>🧩 Crucigrama</h1>
        </div>
      </header>

      {/* Layout principal del juego - solo visible cuando se está jugando */}
      {gameState === 'playing' && (
        <div className="layout">
          <section className="surface grid-wrap">
            {/* Definición actual - encima del crucigrama */}
            <div className="current-clue-display">
              <div className="current-clue-content">
                <span className="clue-number">{activeSlot && activeSlot.num !== undefined ? `${activeSlot.num}.` : ''}</span>
                <span className="clue-text">
                  {activeSlot && gameData?.clues && activeSlot.num !== undefined ? 
                    (activeSlot.dir === 'H' ? 
                      (gameData.clues.across && gameData.clues.across.find(c => c.num === activeSlot.num) ? 
                        gameData.clues.across.find(c => c.num === activeSlot.num)!.clue : 
                        `Definición horizontal ${activeSlot.num} no encontrada`) :
                      (gameData.clues.down && gameData.clues.down.find(c => c.num === activeSlot.num) ? 
                        gameData.clues.down.find(c => c.num === activeSlot.num)!.clue : 
                        `Definición vertical ${activeSlot.num} no encontrada`)) : 
                    'Selecciona una palabra para ver su definición'}
                </span>
              </div>
            </div>
            <div 
              ref={gridRef}
              id="grid" 
              className="crossword" 
              aria-label="Tablero de crucigrama" 
              role="grid" 
              tabIndex={0}
            />
            
            {/* Botones de control debajo del crucigrama */}
            <div className="control-buttons">
              <div className="toggle-group">
                <button 
                  id="btn-clear" 
                  className={!showSolution ? "toggle-active" : "toggle-inactive"}
                  title="Mostrar crucigrama en blanco"
                  onClick={() => setShowSolution(false)}
                >
                  En blanco
                </button>
                <button 
                  id="btn-solution" 
                  className={showSolution ? "toggle-active" : "toggle-inactive"}
                  title="Mostrar solución completa"
                  onClick={() => setShowSolution(true)}
                >
                  Solución
                </button>
              </div>
              <button 
                id="btn-regenerate" 
                className="secondary" 
                title="Generar nuevo crucigrama"
                onClick={startGame}
              >
                Regenerar
              </button>
            </div>
            
            <div className="meta small" id="meta">
              {gameData && (
                <>
                  Tamaño: {gameData.grid.length}×{gameData.grid.length} · 
                  Letras: {gameData.grid.flat().filter((c: any) => c.ch).length} · 
                  Palabras: {gameData.clues.across.length + gameData.clues.down.length} · 
                  Créditos: {credits}
                </>
              )}
            </div>
          </section>

          <aside className="surface legend">
            {/* Acordeón de herramientas */}
            <div className="tools-accordion">
              
              <details open>
                <summary>🔍 Comprobar y pistas ({credits} créditos)</summary>
                <div className="toolbar-group">
                  {/* Fila 1: Comprobar */}
                  <div className="button-row">
                    <button 
                      id="btn-check-letter" 
                      className="ghost" 
                      title="Comprobar letra seleccionada (-1 crédito)"
                      disabled={!activeSlot || showSolution || credits < 1}
                      onClick={handleCheckLetter}
                    >
                      Comprobar letra
                    </button>
                    <button 
                      id="btn-check-word" 
                      className="ghost" 
                      title="Comprobar palabra activa (-3 créditos)"
                      disabled={!activeSlot || showSolution || credits < 3}
                      onClick={handleCheckWord}
                    >
                      Comprobar palabra
                    </button>
                  </div>
                  
                  {/* Fila 2: Pistas */}
                  <div className="button-row">
                    <button
                      id="btn-hint-letter"
                      className="ghost"
                      title="Descubrir letra actual (-3 créditos)"
                      disabled={!activeSlot || showSolution || credits < 3}
                      onClick={handleHintLetter}
                    >
                      🔎 Descubrir: Letra
                    </button>
                    <button
                      id="btn-hint-word"
                      className="ghost"
                      title="Descubrir palabra completa (-5 créditos)"
                      disabled={!activeSlot || showSolution || credits < 5}
                      onClick={handleHintWord}
                    >
                      💡 Descubrir: Palabra
                    </button>
                  </div>
                </div>
              </details>
            </div>

            <h3>Horizontales</h3>
            <ul id="clues-across"></ul>
            <h3>Verticales</h3>
            <ul id="clues-down"></ul>
            
            {/* Acordeón de instrucciones */}
            <div className="instructions-accordion">
              <details>
                <summary>📖 Cómo jugar</summary>
                <div className="instructions-content">
                  <div className="instruction-section">
                    <h4>🎯 Navegación</h4>
                    <ul>
                      <li><strong>Flechas</strong>: Mover dentro de la palabra activa</li>
                      <li><strong>Click en pista</strong>: Seleccionar palabra</li>
                      <li><strong>Enter/Tab</strong>: Cambiar a siguiente palabra</li>
                      <li><strong>Shift+Tab</strong>: Cambiar a palabra anterior</li>
                    </ul>
                  </div>
                  <div className="instruction-section">
                    <h4>⌨️ Escribir</h4>
                    <ul>
                      <li><strong>Letras</strong>: Escribir y avanzar automáticamente</li>
                      <li><strong>Backspace</strong>: Borrar y retroceder</li>
                      <li><strong>Ñ y acentos</strong>: Soporte completo</li>
                    </ul>
                  </div>
                  <div className="instruction-section">
                    <h4>🔧 Herramientas</h4>
                    <ul>
                      <li><strong>Comprobar letra</strong>: Verificar letra actual</li>
                      <li><strong>Comprobar palabra</strong>: Verificar palabra completa</li>
                      <li><strong>🔎 Letra</strong>: Revelar letra (-1 crédito)</li>
                      <li><strong>💡 Palabra</strong>: Revelar palabra (-2 créditos)</li>
                    </ul>
                  </div>
                </div>
              </details>
            </div>
          </aside>
        </div>
      )}

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
            </select>
          </div>

          <div className="config-row">
            <label htmlFor="theme">Tema:</label>
            <select
              id="theme"
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
            >
              {getThemeDisplayNames().map(theme => (
                <option key={theme.id} value={theme.id}>
                  {theme.displayName}
                </option>
              ))}
            </select>
          </div>

          <button 
            className="btn" 
            onClick={startGame}
          >
            Iniciar Juego
          </button>
        </div>
      )}
    </div>
  );
};

export default Crossword2Game;
