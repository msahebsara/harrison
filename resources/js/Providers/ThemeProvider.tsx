import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  isDark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    return saved ?? 'system';
  });

  const isSystemDark = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const isDark = useMemo(() => (theme === 'system' ? isSystemDark() : theme === 'dark'), [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  }, [isDark, theme]);

  useEffect(() => {
    if (theme !== 'system') return;
    const mm = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      document.documentElement.classList.toggle('dark', mm.matches);
    };
    mm.addEventListener('change', onChange);
    return () => mm.removeEventListener('change', onChange);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, isDark, toggle: () => setTheme(isDark ? 'light' : 'dark') }),
    [theme, isDark],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}


