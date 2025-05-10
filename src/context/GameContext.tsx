import React, { createContext, useState } from 'react';
import { GameContextType, GameType, Round, BelotConfig, ChkobaConfig, RamiConfig, GameHistory } from '../types';
import { useStorage } from '../hooks/useStorage';

export const GameContext = createContext<GameContextType>({
  gameType: null,
  gameConfig: null,
  rounds: [],
  setGameType: () => {},
  setGameConfig: () => {},
  addRound: () => {},
  resetGame: () => {},
  saveGame: () => {},
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameType, setGameType] = useState<GameType | null>(null);
  const [gameConfig, setGameConfig] = useState<BelotConfig | ChkobaConfig | RamiConfig | null>(null);
  const [rounds, setRounds] = useState<Round[]>([]);
  const { addToHistory } = useStorage();

  const addRound = (round: Round) => {
    setRounds(prevRounds => [...prevRounds, round]);
  };

  const resetGame = () => {
    setRounds([]);
  };

  const saveGame = () => {
    if (!gameType || !gameConfig) return;

    const teams = 'teams' in gameConfig 
      ? gameConfig.teams 
      : 'players' in gameConfig 
        ? gameConfig.players 
        : [];

    const game: GameHistory = {
      id: Date.now().toString(),
      gameType,
      date: new Date().toISOString(),
      teams,
      rounds,
      finalScore: calculateFinalScore(),
    };

    // Determine winner based on game type
    if (gameType === 'belot' || gameType === 'chkoba') {
      const scores = calculateFinalScore();
      const winningTeam = Object.entries(scores).reduce(
        (winner, [teamId, score]) => 
          !winner || score > scores[winner] ? teamId : winner, 
        ''
      );
      game.winner = winningTeam;
    } else if (gameType === 'rami') {
      const scores = calculateFinalScore();
      const losingTeam = Object.entries(scores).reduce(
        (loser, [teamId, score]) => 
          !loser || score > scores[loser] ? teamId : loser, 
        ''
      );
      game.winner = Object.keys(scores)
        .filter(id => id !== losingTeam)
        .join(', ');
    }

    addToHistory(game);
    resetGame();
    setGameType(null);
    setGameConfig(null);
  };

  const calculateFinalScore = () => {
    if (!gameConfig) return {};

    const teamIds = 'teams' in gameConfig 
      ? gameConfig.teams.map(team => team.id)
      : 'players' in gameConfig 
        ? gameConfig.players.map(player => player.id)
        : [];

    return rounds.reduce((scores, round) => {
      teamIds.forEach(id => {
        scores[id] = (scores[id] || 0) + (round.scores[id] || 0);
      });
      return scores;
    }, {} as Record<string, number>);
  };

  return (
    <GameContext.Provider value={{
      gameType,
      gameConfig,
      rounds,
      setGameType,
      setGameConfig,
      addRound,
      resetGame,
      saveGame,
    }}>
      {children}
    </GameContext.Provider>
  );
};