import React, { createContext, useState, useEffect } from 'react';
import { StorageContextType, GameHistory } from '../types';

export const StorageContext = createContext<StorageContextType>({
  history: [],
  addToHistory: () => {},
  clearHistory: () => {},
  removeFromHistory: () => {},
});

export const StorageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<GameHistory[]>(() => {
    const savedHistory = localStorage.getItem('gameHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem('gameHistory', JSON.stringify(history));
  }, [history]);

  const addToHistory = (game: GameHistory) => {
    setHistory(prevHistory => [game, ...prevHistory]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const removeFromHistory = (id: string) => {
    setHistory(prevHistory => prevHistory.filter(game => game.id !== id));
  };

  return (
    <StorageContext.Provider value={{
      history,
      addToHistory,
      clearHistory,
      removeFromHistory,
    }}>
      {children}
    </StorageContext.Provider>
  );
};