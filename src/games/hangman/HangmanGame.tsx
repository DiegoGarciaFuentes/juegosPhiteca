import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { HangmanConfig } from './types';
import { HangmanLogic } from './HangmanLogic';
import './HangmanGame.css';

const HangmanGame: React.FC = () => {
  // Configuración del juego
  const config: HangmanConfig = {
    maxAttempts: 6,
    words: [
      { word: "PROGRAMACION", hint: "Actividad de crear software", category: "Tecnología" },
      { word: "REACT", hint: "Biblioteca de JavaScript para interfaces", category: "Tecnología" },
      { word: "TYPESCRIPT", hint: "Superset tipado de JavaScript", category: "Tecnología" },
      { word: "COMPUTADORA", hint: "Máquina que procesa información", category: "Tecnología" },
      { word: "ALGORITMO", hint: "Secuencia de pasos para resolver un problema", category: "Tecnología" }
    ]
  };

  // Estado del juego
  const hangmanLogic = useRef(new HangmanLogic(config));
  const [currentGame, setCurrentGame] = useState(() => hangmanLogic.current.startNewGame());
  const [allowedMisses, setAllowedMisses] = useState(6);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [selectedTheme, setSelectedTheme] = useState('mezcla');
  const [customList, setCustomList] = useState<string>('');
  const [toast, setToast] = useState({ message: '', type: '' });

  // Datos del banco de palabras
  const BANK = {
    animales: [
      { word: "ELEFANTE", hint: "Mamífero grande", category: "Animales" },
      { word: "MARIPOSA", hint: "Insecto", category: "Animales" },
      { word: "PINGUINO", hint: "Ave fría", category: "Animales" },
      { word: "CAMALEON", hint: "Reptil", category: "Animales" },
      { word: "MURCIELAGO", hint: "Mamífero volador", category: "Animales" },
      { word: "NANDU", hint: "Ave corredora", category: "Animales" }
    ],
    ciencia: [
      { word: "FOTOSINTESIS", hint: "Plantas", category: "Ciencia" },
      { word: "EVAPORACION", hint: "Líquido a gas", category: "Ciencia" },
      { word: "ATOMO", hint: "Materia", category: "Ciencia" },
      { word: "NEURONA", hint: "Célula nerviosa", category: "Ciencia" },
      { word: "BACTERIA", hint: "Microorganismo", category: "Ciencia" }
    ],
    geografia: [
      { word: "CORDILLERA", hint: "Montañas", category: "Geografía" },
      { word: "PENINSULA", hint: "Casi isla", category: "Geografía" },
      { word: "ARCHIPIELAGO", hint: "Grupo de islas", category: "Geografía" },
      { word: "ECUADOR", hint: "Línea imaginaria", category: "Geografía" }
    ],
    verbos: [
      { word: "ANALIZAR", hint: "Examinar", category: "Verbos" },
      { word: "PROGRAMAR", hint: "Escribir código", category: "Verbos" },
      { word: "INVESTIGAR", hint: "Buscar info", category: "Verbos" },
      { word: "IMAGINAR", hint: "Representar", category: "Verbos" },
      { word: "CONSTRUIR", hint: "Fabricar", category: "Verbos" }
    ]
  };

  const ALL_TOPICS = ['animales', 'ciencia', 'geografia', 'verbos'];
  const LETTERS = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

  // Utilidades
  const isLetter = (ch: string): boolean => /^[A-ZÑ]$/.test(ch);

  // Seleccionar palabra aleatoria según tema
  const pickWord = useCallback(() => {
    let pool: Array<{word: string, hint: string, category: string}>;
    
    if (customList.trim()) {
      const lines = customList.split(/\n+/).map(s => s.trim()).filter(Boolean);
      pool = lines.map(line => {
        const [w, h] = line.split('|').map(s => (s || '').trim());
        return { word: w.toUpperCase(), hint: h || '', category: 'Personalizada' };
      }).filter(({ word }) => !!word);
    } else if (ALL_TOPICS.includes(selectedTheme)) {
      pool = BANK[selectedTheme as keyof typeof BANK];
    } else {
      pool = Object.values(BANK).flat();
    }
    
    return pool[Math.floor(Math.random() * pool.length)];
  }, [selectedTheme, customList]);

  // Iniciar nuevo juego
  const startGame = useCallback(() => {
    const selectedWord = pickWord();
    const newGame = hangmanLogic.current.startNewGame(selectedWord);
    setCurrentGame(newGame);
    setHintsLeft(3);
    setToast({ message: '', type: '' });
  }, [pickWord]);

  // Adivinar letra
  const onGuess = useCallback((letter: string) => {
    if (currentGame.gameStatus !== 'playing') return;
    
    const newGame = hangmanLogic.current.guessLetter(letter);
    setCurrentGame(newGame);
    
    if (newGame.gameStatus === 'won') {
      setToast({ message: '¡Muy bien! 🎉', type: 'win' });
    } else if (newGame.gameStatus === 'lost') {
      setToast({ message: `Oh… perdiste. La palabra era: "${newGame.currentWord}"`, type: 'lose' });
    }
  }, [currentGame.gameStatus]);

  // Usar pista
  const useHint = useCallback(() => {
    if (currentGame.gameStatus !== 'playing' || hintsLeft <= 0) return;
    
    // Encontrar letras que no han sido adivinadas
    const hiddenLetters = currentGame.currentWord
      .split('')
      .map((ch, i) => ({ ch: ch.toUpperCase(), i }))
      .filter(({ ch }) => /[A-ZÑ]/.test(ch) && !currentGame.guessedLetters.includes(ch));
    
    if (hiddenLetters.length > 0) {
      const pick = hiddenLetters[Math.floor(Math.random() * hiddenLetters.length)];
      onGuess(pick.ch);
      setHintsLeft(prev => prev - 1);
    }
  }, [currentGame.gameStatus, hintsLeft, currentGame, onGuess]);

  // Revelar palabra
  const revealWord = useCallback(() => {
    setCurrentGame(prev => ({ ...prev, gameStatus: 'lost' }));
    setToast({ message: `La palabra era: "${currentGame.currentWord}"`, type: 'lose' });
  }, [currentGame.currentWord]);

  // Aplicar configuración
  const applyConfig = useCallback(() => {
    setAllowedMisses(Math.max(4, Math.min(6, 10)));
  }, []);

  // Usar lista personalizada
  const useCustomList = useCallback(() => {
    startGame();
  }, [startGame]);

  // Limpiar lista
  const clearList = useCallback(() => {
    setCustomList('');
  }, []);

  // Manejar teclado físico
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentGame.gameStatus !== 'playing') return;
      
      const key = e.key.toUpperCase();
      const map: { [key: string]: string } = {
        'Á': 'A', 'À': 'A', 'Â': 'A', 'Ä': 'A',
        'É': 'E', 'È': 'E', 'Ê': 'E', 'Ë': 'E',
        'Í': 'I', 'Ì': 'I', 'Î': 'I', 'Ï': 'I',
        'Ó': 'O', 'Ò': 'O', 'Ô': 'O', 'Ö': 'O',
        'Ú': 'U', 'Ù': 'U', 'Û': 'U', 'Ü': 'U'
      };
      
      const k = map[key] || key;
      if (isLetter(k)) onGuess(k);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGame.gameStatus, onGuess]);

  // El juego se inicializa automáticamente con useState

  // Renderizar letra del teclado
  const renderKey = (letter: string) => {
    const isGuessed = currentGame.guessedLetters.includes(letter);
    const isInWord = currentGame.currentWord.includes(letter);
    const isCorrect = isGuessed && isInWord;
    const isWrong = isGuessed && !isInWord;
    
    return (
      <button
        key={letter}
        className={`key ${isCorrect ? 'right' : isWrong ? 'wrong' : ''}`}
        onClick={() => onGuess(letter)}
        disabled={currentGame.gameStatus !== 'playing' || isGuessed}
      >
        {letter}
      </button>
    );
  };

  // Renderizar palabra
  const renderWord = () => {
    return currentGame.currentWord.split('').map((letter, index) => {
      const upperLetter = letter.toUpperCase();
      const isGuessed = currentGame.guessedLetters.includes(upperLetter);
      const displayLetter = isGuessed || currentGame.gameStatus === 'lost' ? upperLetter : '_';
      
      return (
        <span key={index} className="slot">
          {displayLetter}
        </span>
      );
    });
  };

  // Renderizar partes del ahorcado (usado en el SVG)
  const getHangmanOpacity = (stepIndex: number) => {
    const steps = [
      'hg-noose', 'hg-head', 'hg-body', 'hg-arm-l', 'hg-arm-r',
      'hg-leg-l', 'hg-leg-r', 'hg-eye-l', 'hg-eye-r', 'hg-mouth'
    ];
    
    const partsToShow = currentGame.gameStatus === 'lost' 
      ? steps.length 
      : Math.floor((currentGame.wrongAttempts * steps.length) / allowedMisses);
    
    return stepIndex < partsToShow ? 1 : 0;
  };

  return (
    <div className="hangman-game">
      <div className="header">
        <div>
          <h1>🎯 Ahorcado</h1>
          <div className="tag">Game by phiteca</div>
        </div>
        <div className="controls">
          <button className="btn" onClick={startGame}>Nuevo juego</button>
          <button className="btn secondary" onClick={revealWord}>Revelar palabra</button>
          <button 
            className="btn hint" 
            onClick={useHint}
            disabled={currentGame.gameStatus !== 'playing' || hintsLeft <= 0}
          >
            Pista ({hintsLeft})
          </button>
        </div>
      </div>
      
      <div className="grid">
        <div className="panel">
          <div className="hangman">
            <svg width="320" height="300" viewBox="0 0 320 300">
              {/* Horca */}
              <line x1="20" y1="280" x2="160" y2="280" stroke="#475569" strokeWidth="8" />
              <line x1="60" y1="280" x2="60" y2="40" stroke="#475569" strokeWidth="8" />
              <line x1="56" y1="40" x2="200" y2="40" stroke="#475569" strokeWidth="8" />
              <line x1="196" y1="40" x2="196" y2="80" stroke="#475569" strokeWidth="8" />
              
              {/* Partes del muñeco */}
              <line id="hg-noose" x1="196" y1="80" x2="196" y2="92" stroke="#e5e7eb" strokeWidth="6" opacity={getHangmanOpacity(0)} />
              <circle id="hg-head" cx="196" cy="110" r="28" stroke="#e5e7eb" strokeWidth="6" fill="none" opacity={getHangmanOpacity(1)} />
              <line id="hg-body" x1="196" y1="138" x2="196" y2="200" stroke="#e5e7eb" strokeWidth="6" opacity={getHangmanOpacity(2)} />
              <line id="hg-arm-l" x1="196" y1="155" x2="166" y2="175" stroke="#e5e7eb" strokeWidth="6" opacity={getHangmanOpacity(3)} />
              <line id="hg-arm-r" x1="196" y1="155" x2="226" y2="175" stroke="#e5e7eb" strokeWidth="6" opacity={getHangmanOpacity(4)} />
              <line id="hg-leg-l" x1="196" y1="200" x2="172" y2="240" stroke="#e5e7eb" strokeWidth="6" opacity={getHangmanOpacity(5)} />
              <line id="hg-leg-r" x1="196" y1="200" x2="220" y2="240" stroke="#e5e7eb" strokeWidth="6" opacity={getHangmanOpacity(6)} />
              <circle id="hg-eye-l" cx="188" cy="105" r="2.8" fill="#e5e7eb" opacity={getHangmanOpacity(7)} />
              <circle id="hg-eye-r" cx="204" cy="105" r="2.8" fill="#e5e7eb" opacity={getHangmanOpacity(8)} />
              <path id="hg-mouth" d="M188 120 Q196 114 204 120" fill="none" stroke="#e5e7eb" strokeWidth="3.5" opacity={getHangmanOpacity(9)} />
            </svg>
          </div>
          
          <div className="word" id="word" data-testid="word-display">
            {renderWord()}
          </div>
          
          <div className="hint" id="hint" data-testid="hint-display">
            {currentGame.hint}
          </div>
          
          <div className="keyboard" id="keyboard" data-testid="keyboard">
            {LETTERS.map(renderKey)}
          </div>
          
          <div className="row" style={{ marginTop: '12px' }}>
            <div className="stats">
              <div className="pill bad">
                Fallos: <span id="misses">{currentGame.wrongAttempts}</span>/<span id="max-misses">{allowedMisses}</span>
              </div>
              <div className="pill good">
                Aciertos: <span id="hits">{currentGame.guessedLetters.filter(l => currentGame.currentWord.includes(l)).length}</span>
              </div>
            </div>
            <div className="small">Pulsa las teclas en pantalla o el teclado físico.</div>
          </div>
          
          {toast.message && (
            <div className={`toast ${toast.type}`} id="toast">
              {toast.message}
            </div>
          )}
        </div>
        
        <div className="panel">
          <h3>📚 Banco de palabras</h3>
          <label htmlFor="tema">Tema:</label>
          <select id="tema" value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}>
            <option value="mezcla">Mezcla</option>
            <option value="animales">Animales</option>
            <option value="ciencia">Ciencia</option>
            <option value="geografia">Geografía</option>
            <option value="verbos">Verbos</option>
          </select>
          
          <div className="custom-box">
            <label htmlFor="lista">Lista personalizada</label>
            <textarea
              id="lista"
              value={customList}
              onChange={(e) => setCustomList(e.target.value)}
              placeholder="Una palabra por línea. Opcional: palabra | pista"
            />
            <div className="row">
              <button className="btn" onClick={useCustomList}>Usar lista</button>
              <button className="btn secondary" onClick={clearList}>Limpiar</button>
            </div>
          </div>
          
          <hr />
          
          <h3>⚙️ Reglas</h3>
          <div className="row">
            <label htmlFor="vidas">Fallos permitidos:</label>
            <input
              id="vidas"
              type="number"
              min="4"
              max="10"
              value={allowedMisses}
              onChange={(e) => setAllowedMisses(parseInt(e.target.value))}
            />
            <button className="btn" onClick={applyConfig}>Aplicar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HangmanGame;
