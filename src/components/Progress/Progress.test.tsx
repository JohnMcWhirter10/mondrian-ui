import { render, screen } from '@testing-library/react';
import {
  PLANE_THEMES,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
import { Progress } from './index';

describe('Progress', () => {
  test('renders a determinate bar with value and max', () => {
    render(<Progress value={40} max={80} aria-label="Upload" />);

    const bar = screen.getByRole('progressbar', { name: 'Upload' });
    expect(bar).toHaveClass('mondrian-progress');
    expect(bar).toHaveAttribute('aria-valuenow', '40');
    expect(bar).toHaveAttribute('aria-valuemax', '80');
    expect(bar).toHaveAttribute('data-state', 'loading');
  });

  test('fills the plane by transform', () => {
    render(<Progress value={25} aria-label="Upload" />);

    const indicator = screen
      .getByRole('progressbar')
      .querySelector('.mondrian-progress-indicator');
    expect(indicator).toHaveStyle({ transform: 'translateX(-75%)' });
  });

  test('clamps the fill to the frame', () => {
    render(<Progress value={100} max={100} aria-label="Done" />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('data-state', 'complete');
    expect(bar.querySelector('.mondrian-progress-indicator')).toHaveStyle({
      transform: 'translateX(-0%)',
    });
  });

  test('is indeterminate without a value', () => {
    render(<Progress aria-label="Loading" />);

    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('data-state', 'indeterminate');
    expect(bar).not.toHaveAttribute('aria-valuenow');
  });

  test('applies the size scale', () => {
    const { rerender } = render(<Progress size="sm" value={1} />);
    expect(screen.getByRole('progressbar')).toHaveClass('mondrian-progress-sm');

    rerender(<Progress size="lg" value={1} />);
    expect(screen.getByRole('progressbar')).toHaveClass('mondrian-progress-lg');
  });

  itForwardsRef<HTMLDivElement>({
    render: (ref) => <Progress ref={ref} value={10} />,
    tagName: 'DIV',
    className: 'mondrian-progress',
  });

  itPassesThroughAttributes({
    render: (props) => <Progress value={1} {...props} />,
    target: () => screen.getByRole('progressbar'),
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES,
    render: (theme) => <Progress theme={theme} value={1} aria-label="P" />,
    classFor: (theme) => `mondrian-progress-${theme}`,
    target: () => screen.getByRole('progressbar'),
  });

  test('shows percent text so progress is not color only', () => {
    render(<Progress value={40} max={80} aria-label="Upload" />);
    expect(screen.getByText('50%')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '40'
    );
  });

  test('can hide the text and omits it when indeterminate', () => {
    const { rerender } = render(
      <Progress value={40} showValue={false} aria-label="U" />
    );
    expect(screen.queryByText('40%')).toBeNull();
    rerender(<Progress aria-label="U" />);
    expect(screen.queryByText(/%/)).toBeNull();
  });
});
