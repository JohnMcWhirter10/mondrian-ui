/** @jsxRuntime classic */
/** @jsx React.createElement */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  const renderButton = (props = {}) => {
    render(<Button {...props} />);
  };

  test('renders the button with blue theme', () => {
    renderButton({ children: 'Blue Button', theme: 'blue' });

    const button = screen.getByRole('button', { name: /blue button/i });
    expect(button).not.toBeNull();
    expect(button).toHaveClass('mondrian-button-blue');
  });

  test('renders the button with neutral theme', () => {
    renderButton({ children: 'Neutral Button', theme: 'neutral' });

    const button = screen.getByRole('button', { name: /neutral button/i });
    expect(button).not.toBeNull();
    expect(button).toHaveClass('mondrian-button-neutral');
  });

  test('renders the button with red theme', () => {
    renderButton({ children: 'Red Button', theme: 'red' });

    const button = screen.getByRole('button', { name: /red button/i });
    expect(button).not.toBeNull();
    expect(button).toHaveClass('mondrian-button-red');
  });

  test('renders the button with green theme', () => {
    renderButton({ children: 'Green Button', theme: 'green' });

    const button = screen.getByRole('button', { name: /green button/i });
    expect(button).not.toBeNull();
    expect(button).toHaveClass('mondrian-button-green');
  });

  test('renders the button with yellow theme', () => {
    renderButton({ children: 'Yellow Button', theme: 'yellow' });

    const button = screen.getByRole('button', { name: /yellow button/i });
    expect(button).not.toBeNull();
    expect(button).toHaveClass('mondrian-button-yellow');
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

  test('defaults to the blue plane', () => {
    renderButton({ children: 'Default' });
    expect(screen.getByRole('button')).toHaveClass('mondrian-button-blue');
  });

  test('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current?.tagName).toBe('BUTTON');
  });

  test('keeps aria-pressed and real disabled', () => {
    render(
      <React.Fragment>
        <Button aria-pressed="true">On</Button>
        <Button disabled>Off</Button>
      </React.Fragment>
    );
    expect(screen.getByRole('button', { name: 'On' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'Off' })).toBeDisabled();
  });

  test('size classes', () => {
    render(
      <React.Fragment>
        <Button size="sm">S</Button>
        <Button size="lg">L</Button>
      </React.Fragment>
    );
    expect(screen.getByText('S')).toHaveClass('mondrian-button-sm');
    expect(screen.getByText('L')).toHaveClass('mondrian-button-lg');
  });
});
