import { createContext, useContext, useEffect, useState } from 'react';
import { THEME_KEY, resolveInitialTheme } from '../lib/theme.js';

const ThemeContext = createContext(null);

const prefersDarkTheme = () =>
  Boolean(window.matchMedia?.('(prefers-color-scheme: dark)').matches);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      return resolveInitialTheme(localStorage.getItem(THEME_KEY), prefersDarkTheme());
    } catch {
      return resolveInitialTheme(null, prefersDarkTheme());
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
