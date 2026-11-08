/** @jsxRuntime classic */
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { itForwardsRef, renderWithTheme } from '../../test-utils';
import { ButtonGroup, ButtonGroupItem } from './ButtonGroup';

const items = (
  <>
    <ButtonGroupItem value="a">A</ButtonGroupItem>
    <ButtonGroupItem value="b">B</ButtonGroupItem>
    <ButtonGroupItem value="c">C</ButtonGroupItem>
  </>
);

describe('ButtonGroup', () => {
  describe('type="single"', () => {
    it('presses one item at a time', async () => {
      renderWithTheme(
        <ButtonGroup type="single" aria-label="group">
          {items}
        </ButtonGroup>
      );
      await userEvent.click(screen.getByRole('radio', { name: 'A' }));
      expect(screen.getByRole('radio', { name: 'A' })).toBeChecked();

      await userEvent.click(screen.getByRole('radio', { name: 'B' }));
      expect(screen.getByRole('radio', { name: 'B' })).toBeChecked();
      expect(screen.getByRole('radio', { name: 'A' })).not.toBeChecked();
    });

    it('reports the value through onValueChange', async () => {
      const onValueChange = jest.fn();
      renderWithTheme(
        <ButtonGroup type="single" onValueChange={onValueChange}>
          {items}
        </ButtonGroup>
      );
      await userEvent.click(screen.getByRole('radio', { name: 'C' }));
      expect(onValueChange).toHaveBeenCalledWith('c');
    });
  });

  describe('type="multiple"', () => {
    it('allows several items pressed together', async () => {
      renderWithTheme(<ButtonGroup type="multiple">{items}</ButtonGroup>);
      const a = screen.getByRole('button', { name: 'A' });
      const b = screen.getByRole('button', { name: 'B' });
      await userEvent.click(a);
      await userEvent.click(b);
      expect(a).toHaveAttribute('aria-pressed', 'true');
      expect(b).toHaveAttribute('aria-pressed', 'true');
      expect(a).toHaveAttribute('data-state', 'on');
    });
  });

  it('moves focus with the arrow keys', async () => {
    renderWithTheme(<ButtonGroup type="single">{items}</ButtonGroup>);
    screen.getByRole('radio', { name: 'A' }).focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('radio', { name: 'B' })).toHaveFocus();
    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByRole('radio', { name: 'A' })).toHaveFocus();
  });

  describe('orientation', () => {
    it('is horizontal by default', () => {
      renderWithTheme(
        <ButtonGroup type="single" data-testid="g">
          {items}
        </ButtonGroup>
      );
      expect(screen.getByTestId('g')).not.toHaveAttribute(
        'data-orientation',
        'vertical'
      );
    });

    it('stacks when vertical and moves focus with up/down', async () => {
      renderWithTheme(
        <ButtonGroup type="single" orientation="vertical" data-testid="g">
          {items}
        </ButtonGroup>
      );
      expect(screen.getByTestId('g')).toHaveAttribute(
        'data-orientation',
        'vertical'
      );
      screen.getByRole('radio', { name: 'A' }).focus();
      await userEvent.keyboard('{ArrowDown}');
      expect(screen.getByRole('radio', { name: 'B' })).toHaveFocus();
    });
  });

  describe('size', () => {
    it('has no size class by default', () => {
      renderWithTheme(<ButtonGroup type="single">{items}</ButtonGroup>);
      screen
        .getAllByRole('radio')
        .forEach((el) => expect(el).toHaveClass('mondrian-button-group-item'));
      expect(screen.getAllByRole('radio')[0].className).not.toMatch(/-(sm|lg)/);
    });

    it.each(['sm', 'lg'] as const)('applies %s to every item', (size) => {
      renderWithTheme(
        <ButtonGroup type="single" size={size}>
          {items}
        </ButtonGroup>
      );
      screen
        .getAllByRole('radio')
        .forEach((el) =>
          expect(el).toHaveClass(`mondrian-button-group-item-${size}`)
        );
    });
  });

  it('disables an item', async () => {
    renderWithTheme(
      <ButtonGroup type="single">
        <ButtonGroupItem value="a" disabled>
          A
        </ButtonGroupItem>
      </ButtonGroup>
    );
    await userEvent.click(screen.getByRole('radio'));
    expect(screen.getByRole('radio')).toBeDisabled();
    expect(screen.getByRole('radio')).not.toBeChecked();
  });

  itForwardsRef<HTMLDivElement>({
    render: (ref) => (
      <ButtonGroup type="single" ref={ref}>
        {items}
      </ButtonGroup>
    ),
    tagName: 'DIV',
    className: 'mondrian-button-group',
  });

  itForwardsRef<HTMLButtonElement>({
    render: (ref) => (
      <ButtonGroup type="single">
        <ButtonGroupItem value="a" ref={ref}>
          A
        </ButtonGroupItem>
      </ButtonGroup>
    ),
    tagName: 'BUTTON',
    className: 'mondrian-button-group-item',
  });
});
