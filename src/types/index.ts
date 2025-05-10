export type ThemeMode = 'light' | 'dark';
export type ThemeGradient = 'purple-blue' | 'red-orange' | 'green-blue' | 'pink-purple';

export interface GameHistory {
  id: string;
  gameType: GameType;
  date: string;
  teams: Team[];
  rounds: Round[];
  winner?: string;
  finalScore?: Record<string, number>;
}

export type GameType = 'belot' | 'chkoba' | 'rami';

export interface Team {
  id: string;
  name: string;
}

export interface Round {
  id: string;
  scores: Record<string, number>;
  timestamp: string;
  notes?: string;
}

export interface BelotConfig {
  finalScore: number;
  teams: Team[];
}

export interface ChkobaConfig {
  targetScore: number;
  teams: Team[];
}

export interface RamiConfig {
  players: Team[];
}

export interface GameContextType {
  gameType: GameType | null;
  gameConfig: BelotConfig | ChkobaConfig | RamiConfig | null;
  rounds: Round[];
  setGameType: (type: GameType | null) => void;
  setGameConfig: (config: BelotConfig | ChkobaConfig | RamiConfig | null) => void;
  addRound: (round: Round) => void;
  resetGame: () => void;
  saveGame: () => void;
}

export interface ThemeContextType {
  mode: ThemeMode;
  gradient: ThemeGradient;
  toggleMode: () => void;
  setGradient: (gradient: ThemeGradient) => void;
}

export interface StorageContextType {
  history: GameHistory[];
  addToHistory: (game: GameHistory) => void;
  clearHistory: () => void;
  removeFromHistory: (id: string) => void;
}