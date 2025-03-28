/**
 * Mondrian Theme System
 *
 * Based on Piet Mondrian's neoplasticism with:
 * - Primary colors (red, blue, yellow)
 * - Structural colors (black, white)
 * - Rectangular forms
 * - Asymmetrical balance
 */

export interface MondrianTheme {
  // Color palette
  colors: {
    // Mondrian primary colors
    red: string;
    blue: string;
    yellow: string;

    // Structural colors
    black: string;
    white: string;

    // Functional colors
    background: string;
    text: string;
    border: string;
    shadow: string;
    overlay: string;

    // Semantic colors
    error: string;
    success: string;
  };

  // Grid system
  grid: {
    lineWidth: string;
  };

  // Typography
  typography: {
    fontFamily: string;
    fontSize: {
      tiny: string;
      small: string;
      medium: string;
      large: string;
      xLarge: string;
    };
  };

  // Spacing
  spacing: {
    small: string;
    medium: string;
    large: string;
  };

  // Mode
  isDarkMode: boolean;
}

/**
 * Standard theme options for all Mondrian UI components using semantic names
 * - 'blue' - Primary color theme (for primary actions)
 * - 'neutral' - Uses background/text colors (for secondary actions)
 * - 'contrast' - High contrast with inverted colors (for emphasis)
 * - 'red' - Error/warning theme (for destructive actions)
 * - 'green' - Success theme (for confirmations)
 * - 'yellow' - Accent theme (for highlights)
 */
export type ComponentTheme =
  | 'blue'
  | 'neutral'
  | 'contrast'
  | 'red'
  | 'green'
  | 'yellow';

export interface ThemeContextType {
  theme: MondrianTheme;
  setDarkMode: (on: boolean) => void;
}
