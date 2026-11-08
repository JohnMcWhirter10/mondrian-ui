import { render, screen } from '@testing-library/react';
import {
  PLANE_THEMES,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
import { Badge } from './index';

describe('Badge', () => {
  test('renders a non-interactive span with the default plane', () => {
    render(<Badge>Draft</Badge>);

    const badge = screen.getByText('Draft');
    expect(badge).toBeInTheDocument();
    expect(badge.tagName).toBe('SPAN');
    expect(badge).toHaveClass('mondrian-badge');
    expect(badge).toHaveClass('mondrian-badge-blue');
    expect(badge).not.toHaveClass('mondrian-badge-sm');
    expect(badge).not.toHaveClass('mondrian-badge-lg');
    expect(badge).not.toHaveAttribute('role', 'button');
  });

  test('applies the library size scale', () => {
    const { rerender } = render(<Badge size="sm">Small</Badge>);
    expect(screen.getByText('Small')).toHaveClass('mondrian-badge-sm');

    rerender(<Badge size="default">Default</Badge>);
    const defaultBadge = screen.getByText('Default');
    expect(defaultBadge).toHaveClass('mondrian-badge');
    expect(defaultBadge).not.toHaveClass('mondrian-badge-sm');
    expect(defaultBadge).not.toHaveClass('mondrian-badge-lg');

    rerender(<Badge size="lg">Large</Badge>);
    expect(screen.getByText('Large')).toHaveClass('mondrian-badge-lg');
  });

  itForwardsRef<HTMLSpanElement>({
    render: (ref) => <Badge ref={ref}>Ref</Badge>,
    tagName: 'SPAN',
    className: 'mondrian-badge',
  });

  itPassesThroughAttributes({
    render: (props) => <Badge {...props}>Published</Badge>,
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES,
    defaultTheme: 'blue',
    render: (theme) => <Badge theme={theme}>Status</Badge>,
    classFor: (theme) => `mondrian-badge-${theme}`,
  });
});
