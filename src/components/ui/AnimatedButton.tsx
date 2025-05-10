import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  animationType?: 'bounce' | 'pulse' | 'gradient';
  disabled?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  onClick,
  children,
  className = '',
  animationType = 'bounce',
  disabled = false,
}) => {
  const baseClasses = `
    px-6 py-3 rounded-lg font-semibold text-white shadow-md
    focus:outline-none focus:ring-2 focus:ring-opacity-50
    transition-all duration-300 ease-in-out
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  const animationVariants = {
    bounce: {
      whileTap: { scale: 0.95 },
      whileHover: { scale: 1.05, transition: { duration: 0.2 } },
    },
    pulse: {
      whileHover: { 
        boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.5)',
        scale: 1.02,
      },
    },
    gradient: {
      whileHover: { 
        backgroundPosition: ['0% 50%', '100% 50%'],
        transition: { 
          duration: 0.8, 
          ease: 'easeInOut', 
          repeat: Infinity,
          repeatType: 'reverse',
        },
      },
    },
  };

  const animationProps = animationVariants[animationType];

  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      className={baseClasses}
      {...animationProps}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};