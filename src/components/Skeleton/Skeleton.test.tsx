import { render } from '@testing-library/react';
import {
  PLANE_THEMES,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
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

  test('merges style and passes through data attributes', () => {
    const { container } = render(
      <Skeleton style={{ marginTop: 8 }} data-testid="sk" />
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveAttribute('data-testid', 'sk');
    expect(el).toHaveStyle({ marginTop: '8px' });
  });

  itForwardsRef<HTMLDivElement>({
    render: (ref) => <Skeleton ref={ref} />,
    tagName: 'DIV',
    className: 'mondrian-skeleton',
  });

  itPassesThroughAttributes({
    render: (props) => <Skeleton {...props} />,
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES,
    defaultTheme: 'neutral',
    render: (theme) => <Skeleton theme={theme} />,
    classFor: (theme) => `mondrian-skeleton-${theme}`,
  });

  test.each(PLANE_THEMES)('stays aria-hidden with the %s theme', (theme) => {
    const { container } = render(<Skeleton theme={theme} />);
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });
});
