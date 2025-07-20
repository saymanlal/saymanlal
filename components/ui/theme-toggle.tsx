'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Briefcase } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

export default function ThemeToggle() {
  const { settings, toggleTheme } = useTheme();
  const isDeveloper = settings.theme === 'developer';

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
        isDeveloper
          ? 'bg-black/50 border-green-500 text-green-400 hover:bg-green-400/10'
          : 'bg-white/50 border-blue-500 text-blue-600 hover:bg-blue-50'
      } backdrop-blur-md`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={`Switch to ${isDeveloper ? 'Entrepreneur' : 'Developer'} mode`}
    >
      <div className="flex items-center space-x-3">
        <motion.div
          initial={false}
          animate={{ rotate: isDeveloper ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          {isDeveloper ? (
            <Terminal className="h-6 w-6" />
          ) : (
            <Briefcase className="h-6 w-6" />
          )}
        </motion.div>
        <div className="text-left">
          <div className={`text-sm font-medium ${
            isDeveloper ? 'text-green-400' : 'text-blue-600'
          }`}>
            {isDeveloper ? 'Developer' : 'Entrepreneur'}
          </div>
          <div className={`text-xs ${
            isDeveloper ? 'text-green-300' : 'text-blue-500'
          }`}>
            {isDeveloper ? 'Code Mode' : 'Business Mode'}
          </div>
        </div>
      </div>
    </motion.button>
  );
}