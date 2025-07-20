'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Settings } from './types';

interface ThemeContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  toggleTheme: () => void;
}

const defaultSettings: Settings = {
  theme: 'developer',
  matrixRain: true,
  animations: true,
  soundEffects: false,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('portfolio-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem('portfolio-settings', JSON.stringify(settings));
    
    // Apply theme to document
    document.documentElement.className = `theme-${settings.theme}`;
    document.body.style.background = settings.theme === 'developer' ? '#0a0a0f' : '#f8fafc';
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const toggleTheme = () => {
    updateSettings({
      theme: settings.theme === 'developer' ? 'entrepreneur' : 'developer'
    });
  };

  return (
    <ThemeContext.Provider value={{ settings, updateSettings, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};