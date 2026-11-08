import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from './ThemeProvider';

const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }),
  });
};

const modeOnRoot = () => document.documentElement.getAttribute('data-theme');
const cssVar = (name: string) => {
  const sheets = Array.from(document.head.querySelectorAll('style'));
  const css = sheets[sheets.length - 1]?.textContent ?? '';
  return css.match(new RegExp(`${name}:\\s*([^;]+);`))?.[1];
};

describe('ThemeProvider mode', () => {
  test('light mode ignores a dark OS preference', () => {
    mockMatchMedia(true);
    render(<ThemeProvider mode="light">x</ThemeProvider>);
    expect(modeOnRoot()).toBe('light');
    expect(cssVar('--mondrian-background')).toBe('#FFFFFF');
    expect(cssVar('--mondrian-border')).toBe('#000000');
  });

  test('dark mode ignores a light OS preference', () => {
    mockMatchMedia(false);
    render(<ThemeProvider mode="dark">x</ThemeProvider>);
    expect(modeOnRoot()).toBe('dark');
    expect(cssVar('--mondrian-background')).toBe('#000000');
    expect(cssVar('--mondrian-border')).toBe('#FFFFFF');
  });

  test('system mode follows the OS preference', () => {
    mockMatchMedia(true);
    render(<ThemeProvider>x</ThemeProvider>);
    expect(modeOnRoot()).toBe('dark');
  });

  test('changing the mode prop switches at runtime', () => {
    mockMatchMedia(false);
    const { rerender } = render(<ThemeProvider mode="light">x</ThemeProvider>);
    expect(modeOnRoot()).toBe('light');
    act(() => {
      rerender(<ThemeProvider mode="dark">x</ThemeProvider>);
    });
    expect(modeOnRoot()).toBe('dark');
  });

  test('focus ring flips from blue to yellow in dark mode', () => {
    mockMatchMedia(false);
    const { rerender } = render(<ThemeProvider mode="light">x</ThemeProvider>);
    expect(cssVar('--mondrian-focus')).toBe('#0D47A1');
    act(() => {
      rerender(<ThemeProvider mode="dark">x</ThemeProvider>);
    });
    expect(cssVar('--mondrian-focus')).toBe('#FFDE03');
  });
});
