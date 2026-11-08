// themes/ThemeProvider.tsx
import React, { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import { MondrianTheme } from './Theme.types';
import { readStoredDarkMode } from './darkModeStorage';
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
export interface ThemeProviderProps {
  children: React.ReactNode;
  /**
   * Color mode.
   * - 'system' follows the OS preference and updates when it changes.
   * - 'light' and 'dark' are fixed and ignore the OS preference.
   * Changing this prop switches the mode at runtime.
   * @default "system"
   */
  mode?: 'light' | 'dark' | 'system';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  mode = 'system',
}) => {
  const systemPrefersDark = () =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;

  // In system mode, a choice saved by DarkModeToggle wins over the OS.
  const resolveSystem = () => readStoredDarkMode() ?? systemPrefersDark();

  // Initialize from the explicit mode, falling back to the system preference
  const prefersDarkMode = mode === 'system' ? resolveSystem() : mode === 'dark';

  const [isDarkMode, setDarkMode] = useState<boolean>(prefersDarkMode);

  // An explicit mode always wins, and follows the prop when it changes
  useEffect(() => {
    setDarkMode(mode === 'system' ? resolveSystem() : mode === 'dark');
  }, [mode]);

  // Listen for changes in system color scheme preference (system mode only)
  useEffect(() => {
    if (mode !== 'system') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      if (readStoredDarkMode() !== null) return;
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [mode]);

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
      // Start from the resolved mode so dark mode never flashes light on mount
      background: prefersDarkMode ? MONDRIAN_BLACK : MONDRIAN_WHITE,
      text: prefersDarkMode ? MONDRIAN_WHITE : MONDRIAN_BLACK,
      border: prefersDarkMode ? MONDRIAN_WHITE : MONDRIAN_BLACK,
      shadow: prefersDarkMode ? MONDRIAN_WHITE : MONDRIAN_BLACK,
      overlay: 'rgba(0, 0, 0, 0.7)',

      // Semantic colors
      error: MONDRIAN_RED,
      success: MONDRIAN_SUCCESS,
    },

    grid: {
      lineWidth: '2px',
      lineWidthHeavy: '5px',
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
    styleSheet.textContent = `
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
        --mondrian-grid-width-heavy: ${theme.grid.lineWidthHeavy};

        /* Focus ring: 3px, blue on light (8.6:1 on white), yellow on dark (>15:1 on black) */
        --mondrian-focus: ${theme.isDarkMode ? theme.colors.yellow : theme.colors.blue};
        --mondrian-focus-width: 3px;
        --mondrian-focus-offset: 2px;
        
        /* Motion. One vocabulary, no easing curves: change is stepped, like a
           cut from one plane to the next. Reduced-motion rules still apply. */
        --mondrian-motion-state: 120ms steps(2, end);
        --mondrian-motion-reveal: 200ms steps(4, end);
        --mondrian-motion-loop: 1.2s steps(8, end) infinite;

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
      
      /* Scoped overrides so any subtree can opt into a mode via data-theme */
      [data-theme='dark'] {
        --mondrian-background: ${theme.colors.black};
        --mondrian-text: ${theme.colors.white};
        --mondrian-border: ${theme.colors.white};
        --mondrian-shadow: ${theme.colors.white};
        --mondrian-focus: ${theme.colors.yellow};
        background-color: var(--mondrian-background);
        color: var(--mondrian-text);
      }
      [data-theme='light'] {
        --mondrian-background: ${theme.colors.white};
        --mondrian-text: ${theme.colors.black};
        --mondrian-border: ${theme.colors.black};
        --mondrian-shadow: ${theme.colors.black};
        --mondrian-focus: ${theme.colors.blue};
        background-color: var(--mondrian-background);
        color: var(--mondrian-text);
      }

      /* Global defaults */
      body {
        background-color: var(--mondrian-background);
        color: var(--mondrian-text);
        font-family: var(--mondrian-font-family);
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
