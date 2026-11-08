import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../themes';
import { DARK_MODE_STORAGE_KEY } from '../../themes/darkModeStorage';
import { DarkModeToggle } from './DarkModeToggle';

const renderToggle = () =>
  render(
    <ThemeProvider mode="system">
      <DarkModeToggle>Dark mode</DarkModeToggle>
    </ThemeProvider>
  );

describe('DarkModeToggle', () => {
  beforeEach(() => window.localStorage.clear());

  test('is a switch named by its children', () => {
    renderToggle();
    expect(
      screen.getByRole('switch', { name: 'Dark mode' })
    ).toBeInTheDocument();
  });

  test('is off when the system prefers light', () => {
    renderToggle();
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  test('turns dark mode on and off and saves the choice', () => {
    renderToggle();
    const toggle = screen.getByRole('switch');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(window.localStorage.getItem(DARK_MODE_STORAGE_KEY)).toBe('dark');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-checked', 'false');
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(window.localStorage.getItem(DARK_MODE_STORAGE_KEY)).toBe('light');
  });

  test('restores a saved dark choice on mount', () => {
    window.localStorage.setItem(DARK_MODE_STORAGE_KEY, 'dark');
    renderToggle();
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  test('throws outside a ThemeProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<DarkModeToggle>Dark</DarkModeToggle>)).toThrow();
    spy.mockRestore();
  });
});
