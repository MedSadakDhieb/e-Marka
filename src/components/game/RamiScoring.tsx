import React, { useState, useEffect } from 'react';
import { InputField } from '../ui/InputField';
import { AnimatedButton } from '../ui/AnimatedButton';
import { ScoreTable } from '../ui/ScoreTable';
import { useGame } from '../../hooks/useGame';
import { RamiConfig, Round, Team } from '../../types';

export const RamiScoring: React.FC = () => {
  const { gameConfig, rounds, addRound } = useGame();
  const config = gameConfig as RamiConfig;
  
  const [playerScores, setPlayerScores] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [xCounts, setXCounts] = useState<Record<string, number>>({});
  
  const players: Team[] = config?.players || [];
  
  // Initialize player scores state
  useEffect(() => {
    const initialScores: Record<string, string> = {};
    players.forEach(player => {
      initialScores[player.id] = '';
    });
    setPlayerScores(initialScores);
    
    // Initialize x counts
    const initialXCounts: Record<string, number> = {};
    players.forEach(player => {
      initialXCounts[player.id] = 0;
    });
    
    // Count existing x values in rounds
    rounds.forEach(round => {
      players.forEach(player => {
        if (round.scores[player.id] === -100) {
          initialXCounts[player.id] = (initialXCounts[player.id] || 0) + 1;
        }
      });
    });
    
    setXCounts(initialXCounts);
  }, [players, rounds]);
  
  // Calculate running totals
  const totalScores = players.reduce((acc, player) => {
    acc[player.id] = rounds.reduce(
      (sum, round) => sum + (round.scores[player.id] || 0), 
      0
    );
    return acc;
  }, {} as Record<string, number>);
  
  const handleScoreChange = (playerId: string, value: string) => {
    setPlayerScores(prev => ({
      ...prev,
      [playerId]: value === 'x' || value === 'X' ? 'x' : value,
    }));
  };
  
  const handleAddRound = () => {
    // Check if any player score is empty
    const hasEmptyScore = players.some(player => !playerScores[player.id] && playerScores[player.id] !== '0');
    if (hasEmptyScore) {
      setErrorMessage('Please enter scores for all players');
      return;
    }
    
    const scores: Record<string, number> = {};
    const newXCounts = { ...xCounts };
    
    // Process scores
    players.forEach(player => {
      const scoreValue = playerScores[player.id];
      if (scoreValue === 'x' || scoreValue === 'X') {
        newXCounts[player.id] = (newXCounts[player.id] || 0) + 1;
        
        // If this is the 4th x, add -100 points
        if (newXCounts[player.id] === 4) {
          scores[player.id] = -100;
        } else {
          scores[player.id] = 0;
        }
      } else {
        const numScore = parseInt(scoreValue);
        if (isNaN(numScore)) {
          setErrorMessage(`Invalid score for ${player.name}`);
          return;
        }
        scores[player.id] = numScore;
      }
    });
    
    const round: Round = {
      id: Date.now().toString(),
      scores,
      timestamp: new Date().toISOString(),
    };
    
    addRound(round);
    setXCounts(newXCounts);
    
    // Reset scores
    const resetScores: Record<string, string> = {};
    players.forEach(player => {
      resetScores[player.id] = '';
    });
    setPlayerScores(resetScores);
    setErrorMessage('');
  };
  
  const hasLoser = Object.values(totalScores).some(score => score >= 1000);
  const loserName = hasLoser
    ? players.find(
        player => totalScores[player.id] && totalScores[player.id] >= 1000
      )?.name
    : '';
  
  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1 text-gray-800 dark:text-gray-100">Rami Scoring</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          First to reach 1000 points loses
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          {players.map(player => (
            <div key={player.id} className={totalScores[player.id] >= 1000 ? 'opacity-50' : ''}>
              <p className="font-medium mb-1">{player.name}</p>
              <p className="text-2xl font-bold">{totalScores[player.id] || 0}</p>
              {xCounts[player.id] > 0 && (
                <p className="text-sm mt-1 text-yellow-600 dark:text-yellow-400">
                  {xCounts[player.id]} x {xCounts[player.id] === 4 ? '(-100)' : ''}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {hasLoser && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 rounded-lg text-center">
          <p className="font-bold text-red-800 dark:text-red-200">
            {loserName} loses!
          </p>
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-100">Add New Round</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {players.map(player => (
            <InputField
              key={player.id}
              label={player.name}
              value={playerScores[player.id] || ''}
              onChange={(value) => handleScoreChange(player.id, value)}
              placeholder="0 or 'x'"
            />
          ))}
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Enter a number or 'x'. Four 'x' values result in -100 points.
        </p>
        
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
        
        <div className="mt-4">
          <AnimatedButton
            onClick={handleAddRound}
            className="w-full bg-gradient-to-r from-rose-500 to-red-600"
            animationType="pulse"
          >
            Add Round
          </AnimatedButton>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-100">Score History</h3>
        <ScoreTable rounds={rounds} teams={players} />
      </div>
    </div>
  );
};