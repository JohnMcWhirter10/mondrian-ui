import { render, screen } from '@testing-library/react';
import {
  PLANE_THEMES,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
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

  itForwardsRef<HTMLDivElement>({
    render: (ref) => <Separator ref={ref} />,
    tagName: 'DIV',
    className: 'mondrian-separator',
  });

  itPassesThroughAttributes({
    render: (props) => <Separator {...props} />,
  });

  test('passes through data attributes', () => {
    render(<Separator data-testid="rule" />);
    expect(screen.getByTestId('rule')).toBeInTheDocument();
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES,
    defaultTheme: 'neutral',
    render: (theme) => <Separator theme={theme} />,
    classFor: (theme) => `mondrian-separator-${theme}`,
  });
});
