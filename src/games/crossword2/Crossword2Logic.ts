/**
 * Crossword2 Logic - Converted from JavaScript to TypeScript
 * Advanced crossword generator with hybrid input, validation, and hints
 */

// --- Utilidades de texto ---
function stripDiacriticsKeepEnye(s: string | null): string {
  if (s == null) return '';
  const nfd = s.normalize('NFD').replace(/N\u0303/g, 'Ñ').replace(/n\u0303/g, 'ñ');
  return nfd.replace(/[\u0300-\u036f]/g, '');
}

const U = (s: string | null): string => stripDiacriticsKeepEnye((s ?? '').toUpperCase());

// --- Interfaces ---
interface Crossword2Config {
  size: number;
  maxWords: number;
  words: Array<{
    word: string;
    clue: string;
    difficulty?: string;
    category?: string;
    length: number;
  }>;
}

interface Cell {
  ch: string;
  player: string;
  revealed: boolean;
  flag: string | null;
  num: number | null;
}

interface PlacedWord {
  row: number;
  col: number;
  dir: 'H' | 'V';
  text: string;
  raw: any;
  num: number;
  len: number;
}

interface ClueItem {
  num: number;
  dir: 'H' | 'V';
  clue: string;
  answer: string;
  row: number;
  col: number;
  len: number;
}

interface Crossword2State {
  grid: Cell[][];
  placed: PlacedWord[];
  numbering: number[][];
  clues: {
    across: ClueItem[];
    down: ClueItem[];
  };
  slots: any[];
}

// PRNG
function RNG(seed: number): () => number {
  let x = seed >>> 0;
  return function(): number {
    x ^= x << 13;
    x >>>= 0;
    x ^= x >> 17;
    x >>>= 0;
    x ^= x << 5;
    x >>>= 0;
    return (x >>> 0) / 2**32;
  };
}

// Estructuras
function makeGrid(n: number): Cell[][] {
  return Array.from({ length: n }, () => 
    Array.from({ length: n }, () => ({
      ch: '',
      player: '',
      revealed: false,
      flag: null,
      num: null
    }))
  );
}

export class Crossword2Logic {
  private config: Crossword2Config;
  private seed: number;
  public runtime: {
    seed: number;
    showSolution: boolean;
    state: Crossword2State | null;
    active: any;
    indexInWord: number;
    hintsLeft: number;
    verified: Set<string>;
    verifiedLetters: Set<string>;
  };

  constructor(config: Crossword2Config) {
    this.config = config;
    this.seed = Math.floor(Math.random() * 1e9);
    this.runtime = {
      seed: this.seed,
      showSolution: false,
      state: null,
      active: null,
      indexInWord: 0,
      hintsLeft: 5,
      verified: new Set(),
      verifiedLetters: new Set(),
    };
  }

  // Construcción básica con cruces
  private build(grid: Cell[][], entries: any[], rand: () => number): Crossword2State {
    const placed: PlacedWord[] = [];
    
    // Ordenar por longitud descendente
    entries.sort((a, b) => U(b.word).length - U(a.word).length);
    
    const first = entries[0];
    const ftxt = U(first.word);
    const row0 = Math.floor(grid.length / 2);
    const col0 = Math.max(0, Math.floor((grid.length - ftxt.length) / 2));
    
    if (this.canPlace(grid, ftxt, row0, col0, 'H')) {
      this.place(grid, ftxt, row0, col0, 'H');
      placed.push({
        row: row0,
        col: col0,
        dir: 'H',
        text: ftxt,
        raw: first,
        num: 0,
        len: ftxt.length
      });
    }

    for (let i = 1; i < entries.length; i++) {
      const raw = entries[i];
      const word = U(raw.word);
      let best: { r: number; c: number; dir: 'H' | 'V' } | null = null;

      for (const p of placed) {
        for (let ia = 0; ia < p.text.length; ia++) {
          for (let ib = 0; ib < word.length; ib++) {
            if (p.text[ia] !== word[ib]) continue;
            
            let r, c, dir: 'H' | 'V';
            if (p.dir === 'H') {
              r = p.row - ib;
              c = p.col + ia;
              dir = 'V';
            } else {
              r = p.row + ia;
              c = p.col - ib;
              dir = 'H';
            }
            
            if (this.canPlace(grid, word, r, c, dir)) {
              best = { r, c, dir };
              break;
            }
          }
          if (best) break;
        }
        if (best) break;
      }

      if (!best) {
        for (let t = 0; t < 150; t++) {
          const dir = rand() < 0.5 ? 'H' : 'V';
          const r = Math.floor(rand() * grid.length);
          const c = Math.floor(rand() * grid.length);
          
          if (this.canPlace(grid, word, r, c, dir)) {
            best = { r, c, dir };
            break;
          }
        }
      }

      if (best) {
        this.place(grid, word, best.r, best.c, best.dir);
        placed.push({
          row: best.r,
          col: best.c,
          dir: best.dir,
          text: word,
          raw,
          num: 0,
          len: word.length
        });
      }
    }

    const numbering = this.numberClues(grid);
    const clues = this.computeClues(numbering, placed);
    const slots = this.computeSlotsFromNumbering(grid, numbering);

    return { grid, placed, numbering, clues, slots };
  }

  private canPlace(grid: Cell[][], word: string, r: number, c: number, dir: 'H' | 'V'): boolean {
    const n = grid.length;
    
    if (dir === 'H') {
      if (c < 0 || c + word.length > n || r < 0 || r >= n) return false;
    } else {
      if (r < 0 || r + word.length > n || c < 0 || c >= n) return false;
    }

    for (let i = 0; i < word.length; i++) {
      const rr = dir === 'H' ? r : r + i;
      const cc = dir === 'H' ? c + i : c;
      const cell = grid[rr][cc];
      
      if (cell.ch && cell.ch !== word[i]) return false;
      
      if (!cell.ch) {
        if (dir === 'H') {
          if (rr > 0 && grid[rr - 1][cc].ch) return false;
          if (rr < n - 1 && grid[rr + 1][cc].ch) return false;
        } else {
          if (cc > 0 && grid[rr][cc - 1].ch) return false;
          if (cc < n - 1 && grid[rr][cc + 1].ch) return false;
        }
      }
    }

    if (dir === 'H') {
      if (c > 0 && grid[r][c - 1].ch) return false;
      if (c + word.length < n && grid[r][c + word.length].ch) return false;
    } else {
      if (r > 0 && grid[r - 1][c].ch) return false;
      if (r + word.length < n && grid[r + word.length][c].ch) return false;
    }

    return true;
  }

  private place(grid: Cell[][], word: string, r: number, c: number, dir: 'H' | 'V'): void {
    for (let i = 0; i < word.length; i++) {
      const rr = dir === 'H' ? r : r + i;
      const cc = dir === 'H' ? c + i : c;
      grid[rr][cc].ch = word[i];
    }
  }

  private numberClues(grid: Cell[][]): number[][] {
    const n = grid.length;
    let num = 1;
    const map = Array.from({ length: n }, () => Array(n).fill(null));

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const cell = grid[r][c];
        if (!cell.ch) continue;

        const startH = (c === 0 || !grid[r][c - 1].ch) && (c < n - 1 && grid[r][c + 1].ch);
        const startV = (r === 0 || !grid[r - 1][c].ch) && (r < n - 1 && grid[r + 1][c].ch);

        if (startH || startV) {
          map[r][c] = num++;
        }
      }
    }

    return map;
  }

  private computeClues(numbering: number[][], placed: PlacedWord[]): { across: ClueItem[]; down: ClueItem[] } {
    const across: ClueItem[] = [];
    const down: ClueItem[] = [];
    const used = new Set<string>();

    for (const p of placed) {
      const num = numbering[p.row][p.col];
      if (!num) continue;

      const key = `${num}-${p.dir}`;
      if (used.has(key)) continue;
      used.add(key);

      const item: ClueItem = {
        num,
        dir: p.dir,
        clue: p.raw.clue,
        answer: p.raw.word,
        row: p.row,
        col: p.col,
        len: p.text.length
      };

      if (p.dir === 'H') {
        across.push(item);
      } else {
        down.push(item);
      }
    }

    across.sort((a, b) => a.num - b.num);
    down.sort((a, b) => a.num - b.num);

    return { across, down };
  }

  private computeSlotsFromNumbering(grid: Cell[][], numbering: number[][]): any[] {
    const n = grid.length;
    const slots: any[] = [];

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const num = numbering[r][c];
        if (!num) continue;

        // Horizontal
        if (c === 0 || !grid[r][c - 1].ch) {
          let len = 0;
          while (c + len < n && grid[r][c + len].ch) len++;
          if (len >= 2) {
            slots.push({ num, dir: 'H', row: r, col: c, len });
          }
        }

        // Vertical
        if (r === 0 || !grid[r - 1][c].ch) {
          let len = 0;
          while (r + len < n && grid[r + len][c].ch) len++;
          if (len >= 2) {
            slots.push({ num, dir: 'V', row: r, col: c, len });
          }
        }
      }
    }

    return slots;
  }

  // Método principal para generar el crucigrama
  public generate(): Crossword2State {
    const rand = RNG(this.seed);
    const grid = makeGrid(this.config.size);
    const entries = this.pickEntries(this.config.words, rand, this.config.maxWords);
    const state = this.build(grid, entries, rand);
    
    // Establecer el estado en runtime
    this.runtime.state = state;
    this.runtime.active = null;
    this.runtime.indexInWord = 0;
    this.runtime.verified = new Set();
    this.runtime.verifiedLetters = new Set();
    
    return state;
  }

  private pickEntries(pool: any[], rand: () => number, maxWords: number): any[] {
    const clone = [...pool];
    this.shuffleInPlace(clone, rand);
    clone.sort((a, b) => U(b.word).length - U(a.word).length);
    return clone.slice(0, Math.min(maxWords, clone.length));
  }

  private shuffleInPlace(arr: any[], rand: () => number): any[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Utilidades para validación
  public lettersEqual(player: string, solution: string): boolean {
    if (!player) return false;
    return U(player) === solution;
  }

  // Obtener semilla actual
  public getSeed(): number {
    return this.seed;
  }

  // Establecer nueva semilla
  public setSeed(seed: number): void {
    this.seed = seed;
  }

  // Métodos de navegación y control del juego
  public setActive(slot: any): void {
    this.runtime.active = slot;
    this.runtime.indexInWord = 0;
  }

  public moveCursor(direction: 'left' | 'right' | 'up' | 'down'): void {
    if (!this.runtime.active) return;
    
    const { dir, len } = this.runtime.active;
    let newIndex = this.runtime.indexInWord;
    
    if (dir === 'H') {
      if (direction === 'left') {
        newIndex = Math.max(0, newIndex - 1);
      } else if (direction === 'right') {
        newIndex = Math.min(len - 1, newIndex + 1);
      }
    } else {
      if (direction === 'up') {
        newIndex = Math.max(0, newIndex - 1);
      } else if (direction === 'down') {
        newIndex = Math.min(len - 1, newIndex + 1);
      }
    }
    
    this.runtime.indexInWord = newIndex;
  }

  public setIndexInWord(index: number): void {
    if (!this.runtime.active) return;
    
    const { len } = this.runtime.active;
    this.runtime.indexInWord = Math.max(0, Math.min(len - 1, index));
  }

  public putLetter(letter: string): void {
    if (!this.runtime.active || !this.runtime.state) return;
    
    const { dir, row, col, len } = this.runtime.active;
    const index = this.runtime.indexInWord;
    
    if (index >= 0 && index < len) {
      const r = dir === 'H' ? row : row + index;
      const c = dir === 'H' ? col + index : col;
      
      if (this.runtime.state.grid[r] && this.runtime.state.grid[r][c]) {
        this.runtime.state.grid[r][c].player = letter.toUpperCase();
        
        // Avanzar automáticamente al siguiente carácter si no estamos al final
        if (this.runtime.indexInWord < len - 1) {
          this.runtime.indexInWord++;
        }
      }
    }
  }

  public deleteLetter(): void {
    if (!this.runtime.active || !this.runtime.state) return;
    
    const { dir, row, col, len } = this.runtime.active;
    const index = this.runtime.indexInWord;
    
    if (index >= 0 && index < len) {
      const r = dir === 'H' ? row : row + index;
      const c = dir === 'H' ? col + index : col;
      
      if (this.runtime.state.grid[r] && this.runtime.state.grid[r][c]) {
        // Borrar la letra actual
        this.runtime.state.grid[r][c].player = '';
        
        // Retroceder al carácter anterior si no estamos al principio
        if (this.runtime.indexInWord > 0) {
          this.runtime.indexInWord--;
        }
      }
    }
  }

  public getCurrentPosition(): { row: number; col: number } | null {
    if (!this.runtime.active) return null;
    
    const { dir, row, col } = this.runtime.active;
    const index = this.runtime.indexInWord;
    
    return {
      row: dir === 'H' ? row : row + index,
      col: dir === 'H' ? col + index : col
    };
  }

  public getActiveSlot(): any {
    return this.runtime.active;
  }

  public getIndexInWord(): number {
    return this.runtime.indexInWord;
  }

  public goToNextWord(): void {
    if (!this.runtime.state) return;
    
    const currentSlot = this.runtime.active;
    if (!currentSlot) return;
    
    const slots = this.runtime.state.slots;
    const currentIndex = slots.findIndex(
      (s: any) => s.num === currentSlot.num && s.dir === currentSlot.dir
    );
    
    if (currentIndex !== -1 && currentIndex < slots.length - 1) {
      // Ir a la siguiente palabra
      const nextSlot = slots[currentIndex + 1];
      this.setActive(nextSlot);
    } else if (slots.length > 0) {
      // Si estamos en la última, volver a la primera
      this.setActive(slots[0]);
    }
  }

  public goToPreviousWord(): void {
    if (!this.runtime.state) return;
    
    const currentSlot = this.runtime.active;
    if (!currentSlot) return;
    
    const slots = this.runtime.state.slots;
    const currentIndex = slots.findIndex(
      (s: any) => s.num === currentSlot.num && s.dir === currentSlot.dir
    );
    
    if (currentIndex > 0) {
      // Ir a la palabra anterior
      const prevSlot = slots[currentIndex - 1];
      this.setActive(prevSlot);
    } else if (slots.length > 0) {
      // Si estamos en la primera, ir a la última
      this.setActive(slots[slots.length - 1]);
    }
  }

  // Métodos de validación y pistas
  public checkCurrentLetter(): { correct: boolean; letter: string; position: { row: number; col: number } } {
    if (!this.runtime.active || !this.runtime.state) {
      return { correct: false, letter: '', position: { row: -1, col: -1 } };
    }

    const { dir, row, col, len } = this.runtime.active;
    const index = this.runtime.indexInWord;
    
    if (index < 0 || index >= len) {
      return { correct: false, letter: '', position: { row: -1, col: -1 } };
    }

    const r = dir === 'H' ? row : row + index;
    const c = dir === 'H' ? col + index : col;
    
    if (!this.runtime.state.grid[r] || !this.runtime.state.grid[r][c]) {
      return { correct: false, letter: '', position: { row: -1, col: -1 } };
    }

    const cell = this.runtime.state.grid[r][c];
    const playerLetter = cell.player || '';
    const solutionLetter = cell.ch || '';
    
    return {
      correct: this.lettersEqual(playerLetter, solutionLetter),
      letter: solutionLetter,
      position: { row: r, col: c }
    };
  }

  public checkCurrentWord(): { correct: boolean; word: string; positions: { row: number; col: number }[] } {
    if (!this.runtime.active || !this.runtime.state) {
      return { correct: false, word: '', positions: [] };
    }

    const { dir, row, col, len } = this.runtime.active;
    let playerWord = '';
    let solutionWord = '';
    const positions: { row: number; col: number }[] = [];

    for (let i = 0; i < len; i++) {
      const r = dir === 'H' ? row : row + i;
      const c = dir === 'H' ? col + i : col;
      positions.push({ row: r, col: c });
      
      if (this.runtime.state.grid[r] && this.runtime.state.grid[r][c]) {
        const cell = this.runtime.state.grid[r][c];
        playerWord += cell.player || '';
        solutionWord += cell.ch || '';
      }
    }

    return {
      correct: this.lettersEqual(playerWord, solutionWord),
      word: solutionWord,
      positions
    };
  }

  public hintCurrentLetter(): boolean {
    if (!this.runtime.active || !this.runtime.state || this.runtime.hintsLeft < 1) {
      return false;
    }

    const { dir, row, col, len } = this.runtime.active;
    const index = this.runtime.indexInWord;
    
    if (index < 0 || index >= len) {
      return false;
    }

    const r = dir === 'H' ? row : row + index;
    const c = dir === 'H' ? col + index : col;
    
    if (this.runtime.state.grid[r] && this.runtime.state.grid[r][c]) {
      const cell = this.runtime.state.grid[r][c];
      cell.player = cell.ch; // Revelar la letra
      this.runtime.hintsLeft--;
      return true;
    }

    return false;
  }

  public hintCurrentWord(): boolean {
    if (!this.runtime.active || !this.runtime.state || this.runtime.hintsLeft < 2) {
      return false;
    }

    const { dir, row, col, len } = this.runtime.active;
    
    for (let i = 0; i < len; i++) {
      const r = dir === 'H' ? row : row + i;
      const c = dir === 'H' ? col + i : col;
      
      if (this.runtime.state.grid[r] && this.runtime.state.grid[r][c]) {
        const cell = this.runtime.state.grid[r][c];
        cell.player = cell.ch; // Revelar la letra
      }
    }

    this.runtime.hintsLeft -= 2;
    return true;
  }
}
