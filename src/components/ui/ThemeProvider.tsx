'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('dark');

  const applyTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme);
      document.documentElement.style.colorScheme = newTheme;
      window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme: newTheme } }));
    }
  }, []);

  useEffect(() => {
    let resolved: Theme = 'dark';
    try {
      const params = new URLSearchParams(window.location.search);
      const qTheme = params.get('theme') as Theme | null;
      if (qTheme === 'light' || qTheme === 'dark') {
        resolved = qTheme;
      } else {
        const saved = localStorage.getItem('theme') as Theme | null;
        if (saved === 'light' || saved === 'dark') {
          resolved = saved;
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          resolved = 'dark';
        } else {
          resolved = 'light';
        }
      }
    } catch {}

    applyTheme(resolved);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem('theme');
      if (!saved) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [applyTheme]);

  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem('theme', newTheme);
    } catch {}
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
