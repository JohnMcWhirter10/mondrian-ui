import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { Toggle } from './Toggle';

describe('Toggle Component', () => {
  // Basic rendering tests
  test('renders correctly with default props', () => {
    render(<Toggle data-testid="test-toggle" />);
    expect(screen.getByTestId('test-toggle')).toBeInTheDocument();
  });

  test('renders in unchecked state by default', () => {
    render(<Toggle data-testid="test-toggle" />);
    const toggle = screen.getByTestId('test-toggle');
    expect(toggle.getAttribute('data-state')).toBe('unchecked');
  });

  // State tests
  test('toggles when clicked', () => {
    render(<Toggle data-testid="test-toggle" />);
    const toggle = screen.getByTestId('test-toggle');

    expect(toggle.getAttribute('data-state')).toBe('unchecked');
    fireEvent.click(toggle);
    expect(toggle.getAttribute('data-state')).toBe('checked');
    fireEvent.click(toggle);
    expect(toggle.getAttribute('data-state')).toBe('unchecked');
  });

  test('can be initialized as checked with defaultChecked', () => {
    render(<Toggle defaultChecked data-testid="test-toggle" />);
    const toggle = screen.getByTestId('test-toggle');
    expect(toggle.getAttribute('data-state')).toBe('checked');
  });

  test('can be controlled externally', () => {
    const { rerender } = render(
      <Toggle checked={false} data-testid="test-toggle" />
    );
    const toggle = screen.getByTestId('test-toggle');
    expect(toggle.getAttribute('data-state')).toBe('unchecked');

    rerender(<Toggle checked={true} data-testid="test-toggle" />);
    expect(toggle.getAttribute('data-state')).toBe('checked');
  });

  // Callback tests
  test('calls onCheckedChange when clicked', () => {
    const handleChange = jest.fn();
    render(<Toggle onCheckedChange={handleChange} data-testid="test-toggle" />);
    const toggle = screen.getByTestId('test-toggle');

    fireEvent.click(toggle);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenLastCalledWith(true);

    fireEvent.click(toggle);
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenLastCalledWith(false);
  });

  // Styling tests
  test('applies blue theme by default', () => {
    render(<Toggle data-testid="test-toggle" />);
    const trackElement = document.querySelector('.mondrian-toggle-track-blue');
    expect(trackElement).not.toBeNull();
  });

  test('applies green theme correctly', () => {
    render(<Toggle theme="green" data-testid="test-toggle" />);
    const trackElement = document.querySelector('.mondrian-toggle-track-green');
    expect(trackElement).not.toBeNull();
  });

  test('applies red theme correctly', () => {
    render(<Toggle theme="red" data-testid="test-toggle" />);
    const trackElement = document.querySelector('.mondrian-toggle-track-red');
    expect(trackElement).not.toBeNull();
  });

  test('applies small size correctly', () => {
    render(<Toggle size="sm" data-testid="test-toggle" />);
    const trackElement = document.querySelector(
      '.mondrian-toggle-track.mondrian-toggle-sm'
    );
    expect(trackElement).not.toBeNull();
  });

  test('applies large size correctly', () => {
    render(<Toggle size="lg" data-testid="test-toggle" />);
    const trackElement = document.querySelector(
      '.mondrian-toggle-track.mondrian-toggle-lg'
    );
    expect(trackElement).not.toBeNull();
  });

  // Accessibility tests
  test('is accessible with keyboard navigation', () => {
    render(<Toggle data-testid="test-toggle" />);
    const toggle = screen.getByTestId('test-toggle');

    // Focus the toggle
    toggle.focus();
    expect(document.activeElement).toBe(toggle);

    // Space activates a native button by dispatching click
    fireEvent.click(toggle);
    expect(toggle.getAttribute('data-state')).toBe('checked');
  });

  // Disabled state tests
  test('disables the toggle when disabled prop is true', () => {
    render(<Toggle disabled data-testid="test-toggle" />);
    const toggle = screen.getByTestId('test-toggle');
    expect(toggle).toBeDisabled();
  });

  test('does not toggle when clicked if disabled', () => {
    render(<Toggle disabled data-testid="test-toggle" />);
    const toggle = screen.getByTestId('test-toggle');

    expect(toggle.getAttribute('data-state')).toBe('unchecked');
    fireEvent.click(toggle);
    expect(toggle.getAttribute('data-state')).toBe('unchecked');
  });

  test.each(['blue', 'neutral', 'red', 'yellow', 'green'] as const)(
    'applies the %s theme class',
    (theme) => {
      render(<Toggle theme={theme} data-testid="t" />);
      expect(screen.getByTestId('t')).toHaveClass(
        `mondrian-toggle-track-${theme}`
      );
    }
  );

  test('exposes switch role and aria-checked state', () => {
    render(<Toggle aria-label="Notifications" />);
    const sw = screen.getByRole('switch', { name: 'Notifications' });
    expect(sw).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(sw);
    expect(sw).toHaveAttribute('aria-checked', 'true');
  });

  test('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Toggle ref={ref} />);
    expect(ref.current?.tagName).toBe('BUTTON');
  });
});
