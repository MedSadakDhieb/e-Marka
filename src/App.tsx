import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { GameProvider } from './context/GameContext';
import { StorageProvider } from './context/StorageContext';
import { NavigationBar } from './components/ui/NavigationBar';
import { Home } from './pages/Home';
import { GameConfig } from './pages/GameConfig';
import { GamePlay } from './pages/GamePlay';
import { History } from './pages/History';
import { Settings } from './pages/Settings';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <StorageProvider>
          <GameProvider>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/config/:gameType" element={<GameConfig />} />
                <Route path="/play/:gameType" element={<GamePlay />} />
                <Route path="/history" element={<History />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
              <NavigationBar />
            </div>
          </GameProvider>
        </StorageProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;