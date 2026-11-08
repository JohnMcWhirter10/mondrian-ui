import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  test('renders a checkbox with the default blue plane', () => {
    render(<Checkbox aria-label="Accept" />);
    const box = screen.getByRole('checkbox', { name: 'Accept' });
    expect(box).toHaveClass('mondrian-checkbox-root');
    expect(box).toHaveClass('mondrian-checkbox-blue');
    expect(box).toHaveAttribute('aria-checked', 'false');
  });

  test.each(['blue', 'neutral', 'red', 'yellow', 'green'] as const)(
    'applies the %s theme class',
    (theme) => {
      render(<Checkbox theme={theme} aria-label="x" />);
      expect(screen.getByRole('checkbox')).toHaveClass(
        `mondrian-checkbox-${theme}`
      );
    }
  );

  test('applies size classes', () => {
    render(
      <>
        <Checkbox size="sm" aria-label="s" />
        <Checkbox size="lg" aria-label="l" />
      </>
    );
    expect(screen.getByLabelText('s')).toHaveClass('mondrian-checkbox-sm');
    expect(screen.getByLabelText('l')).toHaveClass('mondrian-checkbox-lg');
  });

  test('toggles state and renders the glyph only when checked', () => {
    render(<Checkbox aria-label="Accept" />);
    const box = screen.getByRole('checkbox');
    expect(box.querySelector('svg')).toBeNull();

    fireEvent.click(box);
    expect(box).toHaveAttribute('aria-checked', 'true');
    expect(box).toHaveAttribute('data-state', 'checked');
    expect(box.querySelector('svg')).not.toBeNull();
  });

  test('calls onCheckedChange', () => {
    const onChange = jest.fn();
    render(<Checkbox aria-label="Accept" onCheckedChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  test('uses a real disabled attribute', () => {
    const onChange = jest.fn();
    render(<Checkbox disabled aria-label="Off" onCheckedChange={onChange} />);
    const box = screen.getByRole('checkbox');
    expect(box).toBeDisabled();
    fireEvent.click(box);
    expect(onChange).not.toHaveBeenCalled();
  });

  test('supports indeterminate state via aria-checked', () => {
    render(<Checkbox checked="indeterminate" aria-label="Some" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-checked',
      'mixed'
    );
  });

  test('forwards a ref to the button', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Checkbox ref={ref} aria-label="Ref" />);
    expect(ref.current?.tagName).toBe('BUTTON');
  });
});
