/** @jsxRuntime classic */
/** @jsx React.createElement */
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  PLANE_THEMES_WITH_GREEN,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
  renderWithTheme,
} from '../../test-utils';
import { ToggleButton } from './ToggleButton';

describe('ToggleButton', () => {
  it('starts unpressed and toggles aria-pressed on click', async () => {
    renderWithTheme(<ToggleButton>Bold</ToggleButton>);
    const button = screen.getByRole('button', { name: 'Bold' });
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).toHaveAttribute('data-state', 'off');

    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveAttribute('data-state', 'on');

    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('toggles from the keyboard with Space and Enter', async () => {
    renderWithTheme(<ToggleButton>Bold</ToggleButton>);
    const button = screen.getByRole('button');
    button.focus();
    await userEvent.keyboard(' ');
    expect(button).toHaveAttribute('aria-pressed', 'true');
    await userEvent.keyboard('{Enter}');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onPressedChange with the new state', async () => {
    const onPressedChange = jest.fn();
    renderWithTheme(
      <ToggleButton onPressedChange={onPressedChange}>Bold</ToggleButton>
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it('works controlled', async () => {
    renderWithTheme(<ToggleButton pressed>Bold</ToggleButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('does not toggle when disabled', async () => {
    renderWithTheme(<ToggleButton disabled>Bold</ToggleButton>);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  describe('size', () => {
    it('has no size class by default', () => {
      renderWithTheme(<ToggleButton>x</ToggleButton>);
      const el = screen.getByRole('button');
      expect(el).not.toHaveClass('mondrian-toggle-button-sm');
      expect(el).not.toHaveClass('mondrian-toggle-button-lg');
    });
    it.each(['sm', 'lg'] as const)('applies %s', (size) => {
      renderWithTheme(<ToggleButton size={size}>x</ToggleButton>);
      expect(screen.getByRole('button')).toHaveClass(
        `mondrian-toggle-button-${size}`
      );
    });
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES_WITH_GREEN,
    defaultTheme: 'blue',
    classFor: (t) => `mondrian-toggle-button-${t}`,
    render: (theme) => <ToggleButton theme={theme}>x</ToggleButton>,
  });
  itForwardsRef<HTMLButtonElement>({
    render: (ref) => <ToggleButton ref={ref}>x</ToggleButton>,
    tagName: 'BUTTON',
    className: 'mondrian-toggle-button',
  });
  itPassesThroughAttributes({
    render: (props) => <ToggleButton {...props}>x</ToggleButton>,
  });
});
