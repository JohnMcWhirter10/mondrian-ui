import { render, screen } from '@testing-library/react';
import {
  PLANE_THEMES,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
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

  itForwardsRef<HTMLSpanElement>({
    render: (ref) => <Loader ref={ref} />,
    tagName: 'SPAN',
    className: 'mondrian-loader',
  });

  itPassesThroughAttributes({
    render: (props) => <Loader {...props} />,
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES,
    defaultTheme: 'blue',
    render: (theme) => <Loader theme={theme} />,
    classFor: (theme) => `mondrian-loader-${theme}`,
  });
});
