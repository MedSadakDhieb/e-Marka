import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useStorage } from '../hooks/useStorage';
import { HistoryItem } from '../components/history/HistoryItem';
import { ConfirmationDialog } from '../components/ui/ConfirmationDialog';
import { AnimatedButton } from '../components/ui/AnimatedButton';

export const History: React.FC = () => {
  const { history, clearHistory, removeFromHistory } = useStorage();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  
  if (history.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-[70vh] text-center">
        <h2 className="text-2xl font-bold mb-2">No Game History</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Start playing games to build your history
        </p>
      </div>
    );
  }
  
  return (
    <div className="p-4 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Game History</h2>
        <AnimatedButton
          onClick={() => setShowClearConfirm(true)}
          className="bg-red-600 hover:bg-red-700 px-3 py-2 flex items-center text-sm"
          animationType="bounce"
        >
          <Trash2 size={18} className="mr-1" />
          Clear All
        </AnimatedButton>
      </div>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        {history.map((game) => (
          <motion.div key={game.id} variants={item}>
            <HistoryItem
              game={game}
              onDelete={removeFromHistory}
            />
          </motion.div>
        ))}
      </motion.div>
      
      <ConfirmationDialog
        title="Clear History"
        message="Are you sure you want to clear all game history? This action cannot be undone."
        isOpen={showClearConfirm}
        onConfirm={() => {
          clearHistory();
          setShowClearConfirm(false);
        }}
        onCancel={() => setShowClearConfirm(false)}
      />
    </div>
  );
};