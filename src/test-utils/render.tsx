import * as React from 'react';
import {
  render,
  type RenderOptions,
  type RenderResult,
} from '@testing-library/react';
import { ThemeProvider } from '../themes';

/**
 * Make `prefers-color-scheme: dark` match (or not) for the current test.
 * The default stub in setupTests is a light OS.
 */
export const mockMatchMedia = (prefersDark: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: prefersDark,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
};

/** Render inside ThemeProvider, with an explicit mode that ignores the OS. */
export const renderWithTheme = (
  ui: React.ReactElement,
  {
    mode = 'light',
    ...options
  }: RenderOptions & {
    mode?: 'light' | 'dark' | 'system';
  } = {}
): RenderResult =>
  render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider mode={mode}>{children}</ThemeProvider>
    ),
    ...options,
  });
