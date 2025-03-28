/** @jsxRuntime classic */
/** @jsx React.createElement */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';
import { ThemeProvider } from '../../themes';

describe('Button Component', () => {
  const renderButton = (props = {}) => {
    render(
      <ThemeProvider>
        <Button {...props} />
      </ThemeProvider>
    );
  };

  test('renders the button with blue theme', () => {
    renderButton({ children: 'Blue Button', theme: 'blue' });

    const button = screen.getByRole('button', { name: /blue button/i });
    expect(button).not.toBeNull();
    expect(button.className.includes('blue')).toBe(true);
  });

  test('renders the button with neutral theme', () => {
    renderButton({ children: 'Neutral Button', theme: 'neutral' });

    const button = screen.getByRole('button', { name: /neutral button/i });
    expect(button).not.toBeNull();
    expect(button.className.includes('neutral')).toBe(true);
  });

  test('renders the button with red theme', () => {
    renderButton({ children: 'Red Button', theme: 'red' });

    const button = screen.getByRole('button', { name: /red button/i });
    expect(button).not.toBeNull();
    expect(button.className.includes('red')).toBe(true);
  });

  test('renders the button with green theme', () => {
    renderButton({ children: 'Green Button', theme: 'green' });

    const button = screen.getByRole('button', { name: /green button/i });
    expect(button).not.toBeNull();
    expect(button.className.includes('green')).toBe(true);
  });

  test('renders the button with yellow theme', () => {
    renderButton({ children: 'Yellow Button', theme: 'yellow' });

    const button = screen.getByRole('button', { name: /yellow button/i });
    expect(button).not.toBeNull();
    expect(button.className.includes('yellow')).toBe(true);
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
});
