import React, { useState } from 'react';
import { InputField } from '../ui/InputField';
import { AnimatedButton } from '../ui/AnimatedButton';
import { ScoreTable } from '../ui/ScoreTable';
import { useGame } from '../../hooks/useGame';
import { ChkobaConfig, Round, Team } from '../../types';

export const ChkobaScoring: React.FC = () => {
  const { gameConfig, rounds, addRound } = useGame();
  const config = gameConfig as ChkobaConfig;
  
  const [team1Score, setTeam1Score] = useState<string>('');
  const [team2Score, setTeam2Score] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const teams: Team[] = config?.teams || [];
  const team1 = teams[0];
  const team2 = teams[1];
  
  // Calculate running totals
  const totalTeam1 = rounds.reduce(
    (sum, round) => sum + (round.scores[team1.id] || 0), 
    0
  );
  const totalTeam2 = rounds.reduce(
    (sum, round) => sum + (round.scores[team2.id] || 0), 
    0
  );
  
  const handleAddRound = () => {
    if (!team1Score || !team2Score) {
      setErrorMessage('Please enter scores for both teams');
      return;
    }
    
    const team1ScoreNum = parseInt(team1Score);
    const team2ScoreNum = parseInt(team2Score);
    
    if (isNaN(team1ScoreNum) || isNaN(team2ScoreNum)) {
      setErrorMessage('Scores must be valid numbers');
      return;
    }
    
    const round: Round = {
      id: Date.now().toString(),
      scores: {
        [team1.id]: team1ScoreNum,
        [team2.id]: team2ScoreNum,
      },
      timestamp: new Date().toISOString(),
    };
    
    addRound(round);
    setTeam1Score('');
    setTeam2Score('');
    setErrorMessage('');
  };
  
  const hasWinner = totalTeam1 >= config.targetScore || totalTeam2 >= config.targetScore;
  
  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1 text-gray-800 dark:text-gray-100">Chkoba Scoring</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          First to {config.targetScore} points wins
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium mb-1">{team1.name}</p>
            <p className="text-2xl font-bold">{totalTeam1}</p>
          </div>
          <div>
            <p className="font-medium mb-1">{team2.name}</p>
            <p className="text-2xl font-bold">{totalTeam2}</p>
          </div>
        </div>
      </div>
      
      {hasWinner && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 rounded-lg text-center">
          <p className="font-bold text-green-800 dark:text-green-200">
            {totalTeam1 >= config.targetScore ? team1.name : team2.name} wins!
          </p>
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-100">Add New Round</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label={team1.name}
            value={team1Score}
            onChange={setTeam1Score}
            placeholder="0"
            type="number"
          />
          <InputField
            label={team2.name}
            value={team2Score}
            onChange={setTeam2Score}
            placeholder="0"
            type="number"
          />
        </div>
        
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
        
        <div className="mt-4">
          <AnimatedButton
            onClick={handleAddRound}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600"
            animationType="gradient"
          >
            Add Round
          </AnimatedButton>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-100">Score History</h3>
        <ScoreTable rounds={rounds} teams={teams} />
      </div>
    </div>
  );
};