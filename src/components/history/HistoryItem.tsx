import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Trophy, ChevronDown, Trash } from 'lucide-react';
import { GameHistory, GameType } from '../../types';
import { ScoreTable } from '../ui/ScoreTable';
import { formatDate } from '../../utils/date';

interface HistoryItemProps {
  game: GameHistory;
  onDelete: (id: string) => void;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({ game, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getGameTypeLabel = (type: GameType) => {
    switch (type) {
      case 'belot': return 'Belot';
      case 'chkoba': return 'Chkoba';
      case 'rami': return 'Rami';
      default: return 'Unknown';
    }
  };
  
  const getGameColor = (type: GameType) => {
    switch (type) {
      case 'belot': return 'from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800';
      case 'chkoba': return 'from-emerald-500 to-teal-600 dark:from-emerald-700 dark:to-teal-800';
      case 'rami': return 'from-rose-500 to-red-600 dark:from-rose-700 dark:to-red-800';
      default: return 'from-gray-500 to-gray-600 dark:from-gray-700 dark:to-gray-800';
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 overflow-hidden">
      <div 
        className={`p-4 bg-gradient-to-r ${getGameColor(game.gameType)} text-white cursor-pointer`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h3 className="text-lg font-bold">{getGameTypeLabel(game.gameType)}</h3>
            <span className="ml-2 text-sm opacity-80">
              {game.teams.map(t => t.name).join(' vs ')}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>
        
        <div className="flex text-sm mt-2">
          <div className="flex items-center mr-4">
            <Calendar size={16} className="mr-1" />
            {formatDate(game.date)}
          </div>
          <div className="flex items-center mr-4">
            <Users size={16} className="mr-1" />
            {game.teams.length} players
          </div>
          {game.winner && (
            <div className="flex items-center">
              <Trophy size={16} className="mr-1" />
              {game.winner}
            </div>
          )}
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4">
              <div className="mb-4">
                <h4 className="font-medium mb-2">Final Score:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {game.teams.map(team => (
                    <div key={team.id} className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{team.name}</p>
                      <p className="font-bold">{game.finalScore?.[team.id] || 0}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Rounds:</h4>
                <ScoreTable rounds={game.rounds} teams={game.teams} />
              </div>
              
              <div className="flex justify-end">
                <button
                  className="text-red-500 flex items-center text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(game.id);
                  }}
                >
                  <Trash size={16} className="mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};