/** @jsxRuntime classic */
/** @jsx React.createElement */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';
import { ThemeProvider } from '../../themes';
import { InputProps } from './Input.types';

describe('Input Component', () => {
  const renderInput = (props: Partial<InputProps>) => {
    render(
      <ThemeProvider>
        <label htmlFor={props.id || 'test-input'}>Default Label</label>
        <Input id={props.id || 'test-input'} {...props} />
      </ThemeProvider>
    );
  };

  test('renders the input with blue theme', () => {
    renderInput({ id: 'blue-input', theme: 'blue' });

    const input = screen.getByLabelText(/default label/i) as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.className.includes('blue')).toBe(true);
  });

  test('renders the input with neutral theme', () => {
    renderInput({ id: 'neutral-input', theme: 'neutral' });

    const input = screen.getByLabelText(/default label/i) as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.className.includes('neutral')).toBe(true);
  });

  test('renders the input with red theme', () => {
    renderInput({ id: 'red-input', theme: 'red' });

    const input = screen.getByLabelText(/default label/i) as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.className.includes('red')).toBe(true);
  });

  test('renders the input with green theme', () => {
    renderInput({ id: 'green-input', theme: 'green' });

    const input = screen.getByLabelText(/default label/i) as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.className.includes('green')).toBe(true);
  });

  test('renders the input with yellow theme', () => {
    renderInput({ id: 'yellow-input', theme: 'yellow' });

    const input = screen.getByLabelText(/default label/i) as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.className.includes('yellow')).toBe(true);
  });

  test('handles input change', async () => {
    renderInput({ id: 'change-input' });

    const input = screen.getByLabelText(/default label/i) as HTMLInputElement;
    await userEvent.type(input, 'Hello');

    expect(input.value).toBe('Hello');
  });
});
