import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GameCard } from '../components/ui/GameCard';
import { Car as Cards, DivideCircle, ScrollText } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  
  return (
    <div className="p-6 mb-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          e-Marka
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track scores for card games <br />Mgos Ngrs ❤️
        </p>
      </motion.div>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6"
      >
        <GameCard
          gameType="belot"
          title="Belot"
          description="Belot is a popular card game that can burn your mind and make you hate life."
          onClick={() => navigate('/config/belot')}
          icon={<Cards size={24} className="text-white" />}
        />
        
        <GameCard
          gameType="chkoba"
          title="Chkoba"
          description="ken l7aya 3ndk i8mzni"
          onClick={() => navigate('/config/chkoba')}
          icon={<DivideCircle size={24} className="text-white" />}
        />
        
        <GameCard
          gameType="rami"
          title="Rami"
          description="Kenk m5bi jok rj3o"
          onClick={() => navigate('/config/rami')}
          icon={<ScrollText size={24} className="text-white" />}
        />
      </motion.div>
    </div>
  );
};