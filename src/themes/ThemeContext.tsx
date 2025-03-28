import { createContext, useContext } from 'react';
import { ThemeContextType } from './Theme.types';

/**
 * Mondrian Theme Context
 *
 * Provides access to the Mondrian theme and theme control functions
 * throughout the component tree.
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

/**
 * Use the Mondrian theme within components
 *
 * Provides access to:
 * - theme: The current Mondrian theme object with all colors and properties
 * - setDarkMode: Function to toggle between light and dark modes
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
