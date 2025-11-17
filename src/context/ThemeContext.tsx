import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme } from '../types';

// =============================================================================
// Type Definitions
// =============================================================================

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}

// =============================================================================
// Context Creation
// =============================================================================

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// =============================================================================
// Custom Hook
// =============================================================================

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// =============================================================================
// Provider Component
// =============================================================================

export const ThemeProvider = ({ children }: ThemeProviderProps): React.ReactElement => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('aoe2-calculator-theme');
    return (saved as Theme) || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('aoe2-calculator-theme', theme);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const contextValue: ThemeContextValue = {
    theme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
