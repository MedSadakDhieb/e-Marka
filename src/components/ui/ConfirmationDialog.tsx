import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { AnimatedButton } from './AnimatedButton';

interface ConfirmationDialogProps {
  title: string;
  message: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  message,
  isOpen,
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={onCancel}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {title}
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={onCancel}
              >
                <X size={20} />
              </button>
            </div>
            <p className="mb-6 text-gray-600 dark:text-gray-300">{message}</p>
            <div className="flex justify-end space-x-3">
              <AnimatedButton
                onClick={onCancel}
                className="bg-gray-300 text-gray-800 hover:bg-gray-400"
                animationType="bounce"
              >
                Cancel
              </AnimatedButton>
              <AnimatedButton
                onClick={onConfirm}
                className="bg-red-600 hover:bg-red-700"
                animationType="pulse"
              >
                Confirm
              </AnimatedButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};