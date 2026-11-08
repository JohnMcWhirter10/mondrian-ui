/** @jsxRuntime classic */
/** @jsx React.createElement */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';
import { InputProps } from './Input.types';

describe('Input Component', () => {
  const renderInput = (props: Partial<InputProps>) => {
    render(
      <React.Fragment>
        <label htmlFor={props.id || 'test-input'}>Default Label</label>
        <Input id={props.id || 'test-input'} {...props} />
      </React.Fragment>
    );
  };

  test('renders the input with blue theme', () => {
    renderInput({ id: 'blue-input', theme: 'blue' });

    const input = screen.getByLabelText(/default label/i) as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input).toHaveClass('mondrian-input-blue');
  });

  test('renders the input with neutral theme', () => {
    renderInput({ id: 'neutral-input', theme: 'neutral' });

    const input = screen.getByLabelText(/default label/i) as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input).toHaveClass('mondrian-input-neutral');
  });

  test('renders the input with red theme', () => {
    renderInput({ id: 'red-input', theme: 'red' });

    const input = screen.getByLabelText(/default label/i) as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input).toHaveClass('mondrian-input-red');
  });

  test('renders the input with green theme', () => {
    renderInput({ id: 'green-input', theme: 'green' });

    const input = screen.getByLabelText(/default label/i) as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input).toHaveClass('mondrian-input-green');
  });

  test('renders the input with yellow theme', () => {
    renderInput({ id: 'yellow-input', theme: 'yellow' });

    const input = screen.getByLabelText(/default label/i) as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input).toHaveClass('mondrian-input-yellow');
  });

  test('handles input change', async () => {
    renderInput({ id: 'change-input' });

    const input = screen.getByLabelText(/default label/i) as HTMLInputElement;
    await userEvent.type(input, 'Hello');

    expect(input.value).toBe('Hello');
  });

  test('exposes aria-invalid and keeps the real input semantics', () => {
    renderInput({ id: 'bad-input', 'aria-invalid': true });

    const input = screen.getByLabelText(/default label/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input.tagName).toBe('INPUT');
  });

  test('uses a real disabled attribute', () => {
    renderInput({ id: 'off-input', disabled: true });

    expect(screen.getByLabelText(/default label/i)).toBeDisabled();
  });

  test('forwards a ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} aria-label="x" />);

    expect(ref.current?.tagName).toBe('INPUT');
  });

  test('does not expose className', () => {
    render(
      <Input
        aria-label="x"
        {...({ className: 'x' } as Record<string, string>)}
      />
    );
    expect(screen.getByLabelText('x')).toHaveClass('mondrian-input');
    expect(screen.getByLabelText('x')).not.toHaveClass('x');
  });
});
