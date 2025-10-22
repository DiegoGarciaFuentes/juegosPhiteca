import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HangmanLogic } from './HangmanLogic';
import { 
  HANGMAN_THEMES, 
  getThemeById, 
  getAllWords, 
  getThemeDisplayNames,
  getDefaultSettings,
  getDifficultyLevels,
  getDifficultyLevel
} from '../../data/games/hangman';
import './HangmanGame.css';

const HangmanGame: React.FC = () => {
  // Configuración por defecto
  const defaultSettings = getDefaultSettings();
  
  // Estado del juego
  const [allowedMisses, setAllowedMisses] = useState(defaultSettings.maxAttempts);
  
  // Lógica del juego (se recrea cuando cambia allowedMisses)
  const hangmanLogic = useRef(new HangmanLogic(allowedMisses));
  
  // Actualizar la configuración cuando cambie allowedMisses
  useEffect(() => {
    hangmanLogic.current = new HangmanLogic(allowedMisses);
  }, [allowedMisses]);
  
  const [currentGame, setCurrentGame] = useState(() => hangmanLogic.current.startNewGame());
  const [hintsLeft, setHintsLeft] = useState(defaultSettings.hintsPerGame);
  const [selectedTheme, setSelectedTheme] = useState(defaultSettings.defaultTheme);
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [customList, setCustomList] = useState<string>('');
  const [toast, setToast] = useState({ message: '', type: '' });

  // Datos del banco de palabras (ahora desde archivos JSON)
  const ALL_TOPICS = HANGMAN_THEMES.map(theme => theme.id);
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
      const theme = getThemeById(selectedTheme);
      pool = theme ? theme.words : [];
    } else {
      // Mezcla: todas las palabras de todos los temas
      pool = getAllWords();
    }
    
    return pool[Math.floor(Math.random() * pool.length)];
  }, [selectedTheme, customList, ALL_TOPICS]);

  // Iniciar nuevo juego
  const startGame = useCallback(() => {
    const selectedWord = pickWord();
    const newGame = hangmanLogic.current.startNewGame(selectedWord, selectedTheme);
    setCurrentGame(newGame);
    setHintsLeft(3);
    setToast({ message: '', type: '' });
  }, [pickWord, selectedTheme]);

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

  // Aplicar configuración de dificultad
  const applyDifficulty = useCallback(() => {
    const difficultySettings = getDifficultyLevel(selectedDifficulty);
    setAllowedMisses(difficultySettings.maxAttempts);
    setHintsLeft(difficultySettings.hintsPerGame);
    startGame();
  }, [selectedDifficulty, startGame]);

  // Aplicar configuración - iniciar nuevo juego cuando cambie allowedMisses
  const applyConfig = useCallback(() => {
    startGame();
  }, [startGame]);

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
            <line x1="20" y1="280" x2="160" y2="280" stroke="var(--phiteca-complement)" strokeWidth="8" />
            <line x1="60" y1="280" x2="60" y2="40" stroke="var(--phiteca-complement)" strokeWidth="8" />
            <line x1="56" y1="40" x2="200" y2="40" stroke="var(--phiteca-complement)" strokeWidth="8" />
            <line x1="196" y1="40" x2="196" y2="80" stroke="var(--phiteca-complement)" strokeWidth="8" />
              
              {/* Partes del muñeco */}
              <line id="hg-noose" x1="196" y1="80" x2="196" y2="82" stroke="var(--phiteca-primary)" strokeWidth="6" opacity={getHangmanOpacity(0)} />
              <circle id="hg-head" cx="196" cy="110" r="28" stroke="var(--phiteca-primary)" strokeWidth="6" fill="none" opacity={getHangmanOpacity(1)} />
              <line id="hg-body" x1="196" y1="138" x2="196" y2="200" stroke="var(--phiteca-primary)" strokeWidth="6" opacity={getHangmanOpacity(2)} />
              <line id="hg-arm-l" x1="196" y1="155" x2="166" y2="175" stroke="var(--phiteca-primary)" strokeWidth="6" opacity={getHangmanOpacity(3)} />
              <line id="hg-arm-r" x1="196" y1="155" x2="226" y2="175" stroke="var(--phiteca-primary)" strokeWidth="6" opacity={getHangmanOpacity(4)} />
              <line id="hg-leg-l" x1="196" y1="200" x2="172" y2="240" stroke="var(--phiteca-primary)" strokeWidth="6" opacity={getHangmanOpacity(5)} />
              <line id="hg-leg-r" x1="196" y1="200" x2="220" y2="240" stroke="var(--phiteca-primary)" strokeWidth="6" opacity={getHangmanOpacity(6)} />
              <circle id="hg-eye-l" cx="188" cy="105" r="2.8" fill="var(--phiteca-primary)" opacity={getHangmanOpacity(7)} />
              <circle id="hg-eye-r" cx="204" cy="105" r="2.8" fill="var(--phiteca-primary)" opacity={getHangmanOpacity(8)} />
              <path id="hg-mouth" d="M188 120 Q196 114 204 120" fill="none" stroke="var(--phiteca-primary)" strokeWidth="3.5" opacity={getHangmanOpacity(9)} />
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
            {getThemeDisplayNames().map(theme => (
              <option key={theme.id} value={theme.id}>
                {theme.displayName}
              </option>
            ))}
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
          
          <h3>⚙️ Configuración</h3>
          
          <div className="row">
            <label htmlFor="dificultad">Dificultad:</label>
            <select 
              id="dificultad" 
              value={selectedDifficulty} 
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              {getDifficultyLevels().map(level => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
            <button className="btn" onClick={applyDifficulty}>Aplicar</button>
          </div>
          
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
