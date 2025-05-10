import React from 'react';
import { motion } from 'framer-motion';
import { GameType } from '../../types';

interface GameCardProps {
  gameType: GameType;
  title: string;
  description: string;
  onClick: () => void;
  icon: React.ReactNode;
}

export const GameCard: React.FC<GameCardProps> = ({
  gameType,
  title,
  description,
  onClick,
  icon,
}) => {
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.05,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  const getCardColors = () => {
    switch (gameType) {
      case 'belot':
        return 'from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800';
      case 'chkoba':
        return 'from-emerald-500 to-teal-600 dark:from-emerald-700 dark:to-teal-800';
      case 'rami':
        return 'from-rose-500 to-red-600 dark:from-rose-700 dark:to-red-800';
      default:
        return 'from-gray-500 to-gray-600 dark:from-gray-700 dark:to-gray-800';
    }
  };

  return (
    <motion.div
      className={`rounded-xl p-6 bg-gradient-to-br ${getCardColors()} text-white shadow-lg cursor-pointer`}
      onClick={onClick}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex items-center mb-4">
        <div className="p-3 bg-white bg-opacity-20 rounded-full mr-4">
          {icon}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <p className="text-sm opacity-90">{description}</p>
    </motion.div>
  );
};