import React from 'react';
import { motion } from 'framer-motion';
import { Home, PlaySquare, History, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGame } from '../../hooks/useGame';

export const NavigationBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { gameType } = useGame();
  
  const navItems = [
    { icon: <Home size={24} />, label: 'Home', path: '/' },
    { icon: <PlaySquare size={24} />, label: 'Game', path: gameType ? `/play/${gameType}` : null },
    { icon: <History size={24} />, label: 'History', path: '/history' },
    { icon: <Settings size={24} />, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path: string | null) => {
    if (!path) return false;
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg z-10"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map((item, index) => (
          <div 
            key={index} 
            className={`flex flex-col items-center ${!item.path ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => item.path && navigate(item.path)}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full ${isActive(item.path) ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300' : 'text-gray-600 dark:text-gray-400'}`}
            >
              {item.icon}
            </motion.div>
            <span className="text-xs mt-1">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.nav>
  );
}