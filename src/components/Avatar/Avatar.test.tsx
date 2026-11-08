import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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

  test('forwards refs to root and fallback', () => {
    const ref = React.createRef<HTMLSpanElement>();
    const fallbackRef = React.createRef<HTMLSpanElement>();
    render(
      <Avatar ref={ref}>
        <AvatarFallback ref={fallbackRef}>R</AvatarFallback>
      </Avatar>
    );

    expect(ref.current).toHaveClass('mondrian-avatar');
    expect(fallbackRef.current).toHaveClass('mondrian-avatar-fallback');
  });

  test('passes through id and aria attributes', () => {
    render(
      <Avatar id="user" aria-label="User avatar">
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByLabelText('User avatar')).toHaveAttribute('id', 'user');
  });

  test('exposes display names', () => {
    expect(Avatar.displayName).toBe('Avatar');
    expect(AvatarImage.displayName).toBe('AvatarImage');
    expect(AvatarFallback.displayName).toBe('AvatarFallback');
  });

  test('defaults to blue and applies each theme class', () => {
    const { rerender } = render(
      <Avatar data-testid="a">
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId('a')).toHaveClass('mondrian-avatar-blue');
    for (const theme of ['blue', 'neutral', 'red', 'yellow'] as const) {
      rerender(
        <Avatar theme={theme} data-testid="a">
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByTestId('a')).toHaveClass(`mondrian-avatar-${theme}`);
    }
  });
});
