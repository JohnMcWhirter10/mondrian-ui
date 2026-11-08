import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Skeleton } from './index';

describe('Skeleton', () => {
  test('renders an aria-hidden plane with default size', () => {
    const { container } = render(<Skeleton />);
    const el = container.firstElementChild as HTMLElement;

    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass('mondrian-skeleton');
    expect(el).toHaveAttribute('aria-hidden', 'true');
    expect(el).toHaveStyle({ width: '100%', height: '16px' });
  });

  test('applies width and height props', () => {
    const { container } = render(<Skeleton width={120} height="3rem" />);
    expect(container.firstElementChild).toHaveStyle({
      width: '120px',
      height: '3rem',
    });
  });

  test('merges style and passes through attributes', () => {
    const { container } = render(
      <Skeleton id="loading" style={{ marginTop: 8 }} data-testid="sk" />
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveAttribute('id', 'loading');
    expect(el).toHaveStyle({ marginTop: '8px' });
  });

  test('forwards a ref to the div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current?.tagName).toBe('DIV');
    expect(ref.current).toHaveClass('mondrian-skeleton');
  });

  test('defaults to neutral, applies each theme, stays aria-hidden', () => {
    const { container, rerender } = render(<Skeleton />);
    expect(container.firstElementChild).toHaveClass(
      'mondrian-skeleton-neutral'
    );
    for (const theme of ['blue', 'neutral', 'red', 'yellow'] as const) {
      rerender(<Skeleton theme={theme} />);
      const el = container.firstElementChild as HTMLElement;
      expect(el).toHaveClass(`mondrian-skeleton-${theme}`);
      expect(el).toHaveAttribute('aria-hidden', 'true');
    }
  });
});
