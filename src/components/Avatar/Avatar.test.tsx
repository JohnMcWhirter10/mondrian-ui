import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  PLANE_THEMES,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
import { Avatar, AvatarFallback, AvatarImage, type AvatarSize } from './index';

describe('Avatar', () => {
  test('renders the fallback with initials', () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarImage src="" alt="Piet" />
        <AvatarFallback>PM</AvatarFallback>
      </Avatar>
    );

    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('mondrian-avatar');
    expect(avatar).not.toHaveClass('mondrian-avatar-sm');
    expect(avatar).not.toHaveClass('mondrian-avatar-lg');

    const fallback = screen.getByText('PM');
    expect(fallback).toHaveClass('mondrian-avatar-fallback');
  });

  test('applies the library size scale', () => {
    const sizes: AvatarSize[] = ['sm', 'lg'];
    sizes.forEach((size) => {
      const { unmount } = render(
        <Avatar size={size} data-testid={`avatar-${size}`}>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByTestId(`avatar-${size}`)).toHaveClass(
        `mondrian-avatar-${size}`
      );
      unmount();
    });
  });

  test('forwards a ref to the fallback', () => {
    const fallbackRef = React.createRef<HTMLSpanElement>();
    render(
      <Avatar>
        <AvatarFallback ref={fallbackRef}>R</AvatarFallback>
      </Avatar>
    );

    expect(fallbackRef.current).toHaveClass('mondrian-avatar-fallback');
  });

  test('exposes display names', () => {
    expect(Avatar.displayName).toBe('Avatar');
    expect(AvatarImage.displayName).toBe('AvatarImage');
    expect(AvatarFallback.displayName).toBe('AvatarFallback');
  });

  itForwardsRef<HTMLSpanElement>({
    render: (ref) => (
      <Avatar ref={ref}>
        <AvatarFallback>R</AvatarFallback>
      </Avatar>
    ),
    tagName: 'SPAN',
    className: 'mondrian-avatar',
  });

  itPassesThroughAttributes({
    render: (props) => (
      <Avatar {...props}>
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    ),
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES,
    defaultTheme: 'blue',
    render: (theme) => (
      <Avatar theme={theme}>
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
    ),
    classFor: (theme) => `mondrian-avatar-${theme}`,
  });
});
