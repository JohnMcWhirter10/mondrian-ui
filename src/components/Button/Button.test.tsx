import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';
import { ThemeProvider } from '../../themes';

describe('Button Component', () => {
  const renderButton = (props = {}) => {
    render(
      <ThemeProvider>
        <Button {...props} />
      </ThemeProvider>
    );
  };

  test('renders the button with primary theme', () => {
    renderButton({ children: 'Primary Button', theme: 'primary' });

    const button = screen.getByRole('button', { name: /primary button/i });
    expect(button).not.toBeNull();
    expect(button.className.includes('primary')).toBe(true);
  });

  test('renders the button with light theme', () => {
    renderButton({ children: 'Light Button', theme: 'light' });

    const button = screen.getByRole('button', { name: /light button/i });
    expect(button).not.toBeNull();
    expect(button.className.includes('light')).toBe(true);
  });

  test('handles button click', async () => {
    const handleClick = jest.fn();
    renderButton({ children: 'Clickable Button', onClick: handleClick });

    const button = screen.getByRole('button', { name: /clickable button/i });
    userEvent.click(button);

    await waitFor(() => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  test('renders the button with error theme', () => {
    renderButton({ children: 'Error Button', theme: 'error' });

    const button = screen.getByRole('button', { name: /error button/i });
    expect(button).not.toBeNull();
    expect(button.className.includes('error')).toBe(true);
  });

  test('renders the button with success theme', () => {
    renderButton({ children: 'Success Button', theme: 'success' });

    const button = screen.getByRole('button', { name: /success button/i });
    expect(button).not.toBeNull();
    expect(button.className.includes('success')).toBe(true);
  });
});
