import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { ThemeGradient } from '../../types';

export const ThemeSwitcher: React.FC = () => {
  const { mode, gradient, toggleMode, setGradient } = useTheme();
  
  const gradients: ThemeGradient[] = [
    'purple-blue',
    'red-orange',
    'green-blue',
    'pink-purple'
  ];

  const getGradientStyle = (gradientName: ThemeGradient) => {
    switch (gradientName) {
      case 'purple-blue':
        return 'from-purple-500 to-blue-600';
      case 'red-orange':
        return 'from-red-500 to-orange-500';
      case 'green-blue':
        return 'from-green-500 to-blue-500';
      case 'pink-purple':
        return 'from-pink-500 to-purple-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Theme Settings</h3>
        <motion.button
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700"
          onClick={toggleMode}
          whileTap={{ scale: 0.9 }}
        >
          {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Gradient Themes</h4>
        <p>SOON</p>
      </div>
    </div>
  );
};