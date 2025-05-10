import React from 'react';
import { useParams } from 'react-router-dom';
import { BelotConfig } from '../components/game/BelotConfig';
import { ChkobaConfig } from '../components/game/ChkobaConfig';
import { RamiConfig } from '../components/game/RamiConfig';
import { GameType } from '../types';

export const GameConfig: React.FC = () => {
  const { gameType } = useParams<{ gameType: string }>();
  
  const renderConfig = () => {
    switch (gameType as GameType) {
      case 'belot':
        return <BelotConfig />;
      case 'chkoba':
        return <ChkobaConfig />;
      case 'rami':
        return <RamiConfig />;
      default:
        return <div>Unknown game type</div>;
    }
  };
  
  return (
    <div className="pb-16">
      {renderConfig()}
    </div>
  );
};