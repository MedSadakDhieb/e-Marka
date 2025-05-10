import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../ui/InputField';
import { SelectField } from '../ui/SelectField';
import { AnimatedButton } from '../ui/AnimatedButton';
import { useGame } from '../../hooks/useGame';
import { BelotConfig as BelotConfigType, Team } from '../../types';

export const BelotConfig: React.FC = () => {
  const navigate = useNavigate();
  const { setGameConfig, setGameType } = useGame();
  
  const [team1Name, setTeam1Name] = useState('Team 1');
  const [team2Name, setTeam2Name] = useState('Team 2');
  const [finalScore, setFinalScore] = useState(1000);
  
  const finalScoreOptions = [
    { value: 1000, label: '1000 points' },
    { value: 2000, label: '2000 points' }
  ];
  
  const handleStartGame = () => {
    const team1: Team = { id: 'team1', name: team1Name || 'Team 1' };
    const team2: Team = { id: 'team2', name: team2Name || 'Team 2' };
    
    const config: BelotConfigType = {
      finalScore,
      teams: [team1, team2],
    };
    
    setGameType('belot');
    setGameConfig(config);
    navigate('/play/belot');
  };
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Belot Configuration</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <SelectField
          label="Final Score"
          value={finalScore}
          options={finalScoreOptions}
          onChange={(value) => setFinalScore(value as number)}
          required
        />
        
        <InputField
          label="Team 1 Name"
          value={team1Name}
          onChange={setTeam1Name}
          placeholder="Enter team name"
          required
        />
        
        <InputField
          label="Team 2 Name"
          value={team2Name}
          onChange={setTeam2Name}
          placeholder="Enter team name"
          required
        />
        
        <div className="mt-8">
          <AnimatedButton
            onClick={handleStartGame}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600"
            animationType="bounce"
          >
            Start Game
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};