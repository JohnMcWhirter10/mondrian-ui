import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Separator } from './index';

describe('Separator', () => {
  test('renders a horizontal decorative line by default', () => {
    const { container } = render(<Separator />);
    const line = container.firstElementChild as HTMLElement;

    expect(line).toHaveClass('mondrian-separator');
    expect(line).toHaveClass('mondrian-separator-horizontal');
    expect(line).toHaveAttribute('data-orientation', 'horizontal');
    expect(line).toHaveAttribute('role', 'none');
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
  });

  test('applies vertical orientation', () => {
    const { container } = render(<Separator orientation="vertical" />);
    const line = container.firstElementChild as HTMLElement;

    expect(line).toHaveClass('mondrian-separator-vertical');
    expect(line).not.toHaveClass('mondrian-separator-horizontal');
    expect(line).toHaveAttribute('data-orientation', 'vertical');
  });

  test('exposes the separator role when not decorative', () => {
    render(<Separator decorative={false} />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  test('sets aria-orientation for vertical non-decorative separators', () => {
    render(<Separator decorative={false} orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute(
      'aria-orientation',
      'vertical'
    );
  });

  test('forwards a ref to the element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Separator ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current).toHaveClass('mondrian-separator');
  });

  test('passes through id and data attributes', () => {
    render(<Separator id="rule" data-testid="rule" />);
    expect(screen.getByTestId('rule')).toHaveAttribute('id', 'rule');
  });

  test('defaults to neutral and applies each theme class', () => {
    const { container, rerender } = render(<Separator />);
    expect(container.firstElementChild).toHaveClass(
      'mondrian-separator-neutral'
    );
    for (const theme of ['blue', 'neutral', 'red', 'yellow'] as const) {
      rerender(<Separator theme={theme} />);
      expect(container.firstElementChild).toHaveClass(
        `mondrian-separator-${theme}`
      );
    }
  });
});
