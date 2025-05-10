import React from 'react';
import { motion } from 'framer-motion';
import { ThemeSwitcher } from '../components/ui/ThemeSwitcher';

export const Settings: React.FC = () => {
  return (
    <div className="p-4 pb-20">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ThemeSwitcher />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
      >
        <h3 className="text-lg font-semibold mb-2">About</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          e-Marka v1.0
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          An offline application for tracking card game scores .
          All data is stored locally on your device.
        </p>
      </motion.div>
      <br />
      <center><p>© 2025 <a href="https://github.com/MedSadakDhieb">Med Sadak Dhieb</a>. All rights reserved.</p></center>

    </div>
  );
};