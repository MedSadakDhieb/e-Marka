import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../ui/InputField';
import { SelectField } from '../ui/SelectField';
import { AnimatedButton } from '../ui/AnimatedButton';
import { useGame } from '../../hooks/useGame';
import { RamiConfig as RamiConfigType, Team } from '../../types';

export const RamiConfig: React.FC = () => {
  const navigate = useNavigate();
  const { setGameConfig, setGameType } = useGame();
  
  const [playerCount, setPlayerCount] = useState(2);
  const [playerNames, setPlayerNames] = useState(['Player 1', 'Player 2', 'Player 3', 'Player 4']);
  
  const playerCountOptions = [
    { value: 2, label: '2 Players' },
    { value: 3, label: '3 Players' },
    { value: 4, label: '4 Players' },
  ];
  
  const handleNameChange = (index: number, value: string) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
  };
  
  const handleStartGame = () => {
    const players: Team[] = Array.from({ length: playerCount }, (_, i) => ({
      id: `player${i + 1}`,
      name: playerNames[i] || `Player ${i + 1}`,
    }));
    
    const config: RamiConfigType = {
      players,
    };
    
    setGameType('rami');
    setGameConfig(config);
    navigate('/play/rami');
  };
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Rami Configuration</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <SelectField
          label="Number of Players"
          value={playerCount}
          options={playerCountOptions}
          onChange={(value) => setPlayerCount(value as number)}
          required
        />
        
        {Array.from({ length: playerCount }).map((_, index) => (
          <InputField
            key={index}
            label={`Player ${index + 1} Name`}
            value={playerNames[index]}
            onChange={(value) => handleNameChange(index, value)}
            placeholder="Enter player name"
            required
          />
        ))}
        
        <div className="mt-8">
          <AnimatedButton
            onClick={handleStartGame}
            className="w-full bg-gradient-to-r from-rose-500 to-red-600"
            animationType="pulse"
          >
            Start Game
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};