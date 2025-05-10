import React, { createContext, useState, useEffect } from 'react';
import { ThemeContextType, ThemeMode, ThemeGradient } from '../types';

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  gradient: 'purple-blue',
  toggleMode: () => {},
  setGradient: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return (savedMode as ThemeMode) || 'dark';
  });
  
  const [gradient, setGradient] = useState<ThemeGradient>(() => {
    const savedGradient = localStorage.getItem('themeGradient');
    return (savedGradient as ThemeGradient) || 'purple-blue';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('themeGradient', gradient);
    
    // Remove all gradient classes
    document.documentElement.classList.remove(
      'gradient-purple-blue',
      'gradient-red-orange',
      'gradient-green-blue',
      'gradient-pink-purple'
    );
    
    // Add the selected gradient class
    document.documentElement.classList.add(`gradient-${gradient}`);
  }, [gradient]);

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ mode, gradient, toggleMode, setGradient }}>
      {children}
    </ThemeContext.Provider>
  );
};