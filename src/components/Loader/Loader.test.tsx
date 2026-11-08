import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Loader } from './index';

describe('Loader', () => {
  test('renders a status with the default accessible name', () => {
    render(<Loader />);

    const loader = screen.getByRole('status', { name: 'Loading' });
    expect(loader).toHaveClass('mondrian-loader');
    expect(loader).not.toHaveClass('mondrian-loader-sm');
    expect(loader).not.toHaveClass('mondrian-loader-lg');
  });

  test('uses a custom label', () => {
    render(<Loader label="Loading results" />);
    expect(
      screen.getByRole('status', { name: 'Loading results' })
    ).toBeInTheDocument();
  });

  test('applies the size scale', () => {
    const { rerender } = render(<Loader size="sm" />);
    expect(screen.getByRole('status')).toHaveClass('mondrian-loader-sm');

    rerender(<Loader size="lg" />);
    expect(screen.getByRole('status')).toHaveClass('mondrian-loader-lg');
  });

  test('hides decorative blocks from assistive technology', () => {
    render(<Loader />);
    const blocks = screen
      .getByRole('status')
      .querySelectorAll('.mondrian-loader-block');
    expect(blocks.length).toBeGreaterThan(1);
    blocks.forEach((block) =>
      expect(block).toHaveAttribute('aria-hidden', 'true')
    );
    expect(
      screen.getByRole('status').querySelector('.mondrian-loader-mover')
    ).toBeInTheDocument();
  });

  test('forwards a ref and passes through attributes', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Loader ref={ref} id="loader" />);

    expect(ref.current).toHaveClass('mondrian-loader');
    expect(ref.current).toHaveAttribute('id', 'loader');
  });

  test.each(['blue', 'neutral', 'red', 'yellow'] as const)(
    'applies the %s theme class',
    (theme) => {
      render(<Loader theme={theme} />);
      expect(screen.getByRole('status')).toHaveClass(
        `mondrian-loader-${theme}`
      );
    }
  );

  test('defaults to the blue theme', () => {
    render(<Loader />);
    expect(screen.getByRole('status')).toHaveClass('mondrian-loader-blue');
  });
});
