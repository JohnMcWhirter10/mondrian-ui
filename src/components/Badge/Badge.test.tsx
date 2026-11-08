import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Badge, type BadgeTheme } from './index';

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

  test('applies each primary plane and the noncolor plane', () => {
    const themes: BadgeTheme[] = ['blue', 'neutral', 'red', 'yellow'];
    const { rerender } = render(<Badge theme="blue">Status</Badge>);

    themes.forEach((theme) => {
      rerender(<Badge theme={theme}>Status</Badge>);
      expect(screen.getByText('Status')).toHaveClass(`mondrian-badge-${theme}`);
    });
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

  test('forwards a ref to the span', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Ref</Badge>);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('SPAN');
    expect(ref.current).toHaveClass('mondrian-badge');
  });

  test('passes through id and aria attributes', () => {
    render(
      <Badge id="status-badge" aria-label="Published status">
        Published
      </Badge>
    );

    const badge = screen.getByLabelText('Published status');
    expect(badge).toHaveAttribute('id', 'status-badge');
    expect(badge).toHaveTextContent('Published');
  });
});
