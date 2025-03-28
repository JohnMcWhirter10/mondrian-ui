// themes/ThemeProvider.tsx
import React, { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import { MondrianTheme } from './Theme.types';
import {
  MONDRIAN_RED,
  MONDRIAN_BLUE,
  MONDRIAN_YELLOW,
  MONDRIAN_BLACK,
  MONDRIAN_WHITE,
  MONDRIAN_SUCCESS,
} from '../utils/colorUtils';

/**
 * ThemeProvider for Mondrian UI
 *
 * Implements Piet Mondrian's neoplasticism style principles with
 * a focus on primary colors, black grid lines, and asymmetrical layout.
 *
 * Theme Naming System:
 * Mondrian UI uses semantic theme names for all components:
 * - 'blue' - Primary color theme (for primary actions)
 * - 'neutral' - Uses background/text colors (for secondary actions)
 * - 'red' - Error/warning theme (for destructive actions)
 * - 'green' - Success theme (for confirmations)
 * - 'yellow' - Accent theme (for highlights)
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize dark mode based on system preference
  const prefersDarkMode =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;

  const [isDarkMode, setDarkMode] = useState<boolean>(prefersDarkMode);

  // Listen for changes in system color scheme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Create the standardized theme object
  const [theme, setTheme] = useState<MondrianTheme>({
    colors: {
      // Mondrian primary colors
      red: MONDRIAN_RED,
      blue: MONDRIAN_BLUE,
      yellow: MONDRIAN_YELLOW,

      // Structural colors
      black: MONDRIAN_BLACK,
      white: MONDRIAN_WHITE,

      // Functional colors
      background: MONDRIAN_WHITE,
      text: MONDRIAN_BLACK,
      border: MONDRIAN_BLACK,
      shadow: MONDRIAN_BLACK,
      overlay: 'rgba(0, 0, 0, 0.7)',

      // Semantic colors
      error: MONDRIAN_RED,
      success: MONDRIAN_SUCCESS,
    },

    grid: {
      lineWidth: '3px',
    },

    typography: {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: {
        tiny: '0.75rem',
        small: '0.875rem',
        medium: '1rem',
        large: '1.125rem',
        xLarge: '1.25rem',
      },
    },

    spacing: {
      small: '4px',
      medium: '8px',
      large: '16px',
    },

    isDarkMode: prefersDarkMode,
  });

  // Update theme when dark mode changes
  useEffect(() => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      colors: {
        ...prevTheme.colors,
        background: isDarkMode ? MONDRIAN_BLACK : MONDRIAN_WHITE,
        text: isDarkMode ? MONDRIAN_WHITE : MONDRIAN_BLACK,
        border: isDarkMode ? MONDRIAN_WHITE : MONDRIAN_BLACK,
        shadow: isDarkMode ? MONDRIAN_WHITE : MONDRIAN_BLACK,
        overlay: 'rgba(0, 0, 0, 0.7)',
      },
      isDarkMode,
    }));

    // Set data-theme attribute on document root for consistent theme handling
    document.documentElement.setAttribute(
      'data-theme',
      isDarkMode ? 'dark' : 'light'
    );
  }, [isDarkMode]);

  // Generate CSS variables from theme
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.innerText = `
      /* Mondrian Theme Variables */
      :root {
        /* Colors - Primary Mondrian Palette */
        --mondrian-red: ${theme.colors.red};
        --mondrian-blue: ${theme.colors.blue};
        --mondrian-yellow: ${theme.colors.yellow};
        --mondrian-black: ${theme.colors.black};
        --mondrian-white: ${theme.colors.white};
        
        /* Colors - Functional */
        --mondrian-background: ${theme.colors.background};
        --mondrian-text: ${theme.colors.text};
        --mondrian-border: ${theme.colors.border};
        --mondrian-shadow: ${theme.colors.shadow};
        --mondrian-overlay: ${theme.colors.overlay};
        
        /* Colors - Semantic */
        --mondrian-error: ${theme.colors.error};
        --mondrian-success: ${theme.colors.success};
        
        /* Grid System */
        --mondrian-grid-width: ${theme.grid.lineWidth};
        
        /* Typography */
        --mondrian-font-family: ${theme.typography.fontFamily};
        --mondrian-font-size-tiny: ${theme.typography.fontSize.tiny};
        --mondrian-font-size-small: ${theme.typography.fontSize.small};
        --mondrian-font-size-medium: ${theme.typography.fontSize.medium};
        --mondrian-font-size-large: ${theme.typography.fontSize.large};
        --mondrian-font-size-x-large: ${theme.typography.fontSize.xLarge};
        
        /* Spacing System */
        --mondrian-spacing-small: ${theme.spacing.small};
        --mondrian-spacing-medium: ${theme.spacing.medium};
        --mondrian-spacing-large: ${theme.spacing.large};
      }
      
      /* Global defaults */
      body {
        background-color: var(--mondrian-background);
        color: var(--mondrian-text);
        font-family: var(--mondrian-font-family);
        transition: background-color 0.3s, color 0.3s;
      }
      
      /* Base component styles */
      .mondrian-component {
        position: relative;
        border: var(--mondrian-grid-width) solid var(--mondrian-border);
      }
    `;

    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
