import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { BelotScoring } from '../components/game/BelotScoring';
import { ChkobaScoring } from '../components/game/ChkobaScoring';
import { RamiScoring } from '../components/game/RamiScoring';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { useGame } from '../hooks/useGame';
import { ConfirmationDialog } from '../components/ui/ConfirmationDialog';
import { GameType } from '../types';
import { motion } from 'framer-motion';
import { Save, RotateCcw } from 'lucide-react';

export const GamePlay: React.FC = () => {
  const { gameType } = useParams<{ gameType: string }>();
  const { gameConfig, resetGame, saveGame } = useGame();
  const [showResetConfirm, setShowResetConfirm] = React.useState(false);
  
  // Redirect if no game config
  if (!gameConfig) {
    return <Navigate to="/" />;
  }
  
  const renderScoring = () => {
    switch (gameType as GameType) {
      case 'belot':
        return <BelotScoring />;
      case 'chkoba':
        return <ChkobaScoring />;
      case 'rami':
        return <RamiScoring />;
      default:
        return <div>Unknown game type</div>;
    }
  };
  
  const handleReset = () => {
    resetGame();
    setShowResetConfirm(false);
  };
  
  const handleSave = () => {
    saveGame();
  };
  
  return (
    <div className="pb-20">
      {renderScoring()}
      
      <motion.div 
        className="fixed bottom-20 right-4 flex flex-col space-y-2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <AnimatedButton
          onClick={() => setShowResetConfirm(true)}
          className="bg-gray-600 hover:bg-gray-700 p-3 rounded-full shadow-lg"
          animationType="bounce"
        >
          <RotateCcw size={24} />
        </AnimatedButton>
        
        <AnimatedButton
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 p-3 rounded-full shadow-lg"
          animationType="pulse"
        >
          <Save size={24} />
        </AnimatedButton>
      </motion.div>
      
      <ConfirmationDialog
        title="Reset Game"
        message="Are you sure you want to reset all scores? This action cannot be undone."
        isOpen={showResetConfirm}
        onConfirm={handleReset}
        onCancel={() => setShowResetConfirm(false)}
      />
    </div>
  );
};