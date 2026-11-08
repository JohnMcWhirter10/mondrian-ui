/** @jsxRuntime classic */
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { itForwardsRef, renderWithTheme } from '../../test-utils';
import {
  Toolbar,
  ToolbarButton,
  ToolbarLink,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from './Toolbar';

const renderToolbar = (props = {}) =>
  renderWithTheme(
    <Toolbar aria-label="Formatting" {...props}>
      <ToolbarButton>Copy</ToolbarButton>
      <ToolbarSeparator />
      <ToolbarToggleGroup type="multiple" aria-label="Style">
        <ToolbarToggleItem value="bold">Bold</ToolbarToggleItem>
        <ToolbarToggleItem value="italic">Italic</ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarLink href="#help">Help</ToolbarLink>
    </Toolbar>
  );

describe('Toolbar', () => {
  it('renders a labelled toolbar with the Mondrian frame class', () => {
    renderToolbar();
    expect(screen.getByRole('toolbar', { name: 'Formatting' })).toHaveClass(
      'mondrian-toolbar'
    );
  });

  it('uses roving focus: Tab enters once and arrows move between items', async () => {
    renderToolbar();
    await userEvent.tab();
    expect(screen.getByText('Copy')).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByText('Bold')).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByText('Italic')).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByText('Help')).toHaveFocus();
    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByText('Italic')).toHaveFocus();
  });

  it('Tab leaves the toolbar after a single stop', async () => {
    renderWithTheme(
      <>
        <Toolbar aria-label="t">
          <ToolbarButton>One</ToolbarButton>
          <ToolbarButton>Two</ToolbarButton>
        </Toolbar>
        <button>After</button>
      </>
    );
    await userEvent.tab();
    expect(screen.getByText('One')).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByText('After')).toHaveFocus();
  });

  it('moves with up/down when vertical', async () => {
    renderToolbar({ orientation: 'vertical' });
    expect(screen.getByRole('toolbar', { name: 'Formatting' })).toHaveAttribute(
      'aria-orientation',
      'vertical'
    );
    await userEvent.tab();
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByText('Bold')).toHaveFocus();
  });

  it('fires button clicks', async () => {
    const onClick = jest.fn();
    renderWithTheme(
      <Toolbar aria-label="t">
        <ToolbarButton onClick={onClick}>Copy</ToolbarButton>
      </Toolbar>
    );
    await userEvent.click(screen.getByText('Copy'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('presses toggle items independently in a multiple group', async () => {
    renderToolbar();
    await userEvent.click(screen.getByText('Bold'));
    await userEvent.click(screen.getByText('Italic'));
    expect(screen.getByText('Bold')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Italic')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Bold')).toHaveAttribute('data-state', 'on');
  });

  it('renders a link with an href', () => {
    renderToolbar();
    const link = screen.getByRole('link', { name: 'Help' });
    expect(link).toHaveAttribute('href', '#help');
    expect(link).toHaveClass('mondrian-toolbar-link');
  });

  it('renders separators perpendicular to the toolbar', () => {
    renderToolbar();
    const separators = screen.getAllByRole('separator');
    expect(separators).toHaveLength(2);
    separators.forEach((s) => {
      expect(s).toHaveClass('mondrian-toolbar-separator');
      expect(s).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  it('gives every item the shared-border class', () => {
    renderToolbar();
    ['Copy', 'Bold', 'Italic', 'Help'].forEach((label) =>
      expect(screen.getByText(label)).toHaveClass('mondrian-toolbar-item')
    );
    expect(screen.getByRole('toolbar', { name: 'Style' })).toHaveClass(
      'mondrian-toolbar-toggle-group'
    );
  });

  itForwardsRef<HTMLDivElement>({
    render: (ref) => (
      <Toolbar ref={ref}>
        <ToolbarButton>x</ToolbarButton>
      </Toolbar>
    ),
    tagName: 'DIV',
    className: 'mondrian-toolbar',
  });
  itForwardsRef<HTMLButtonElement>({
    render: (ref) => (
      <Toolbar>
        <ToolbarButton ref={ref}>x</ToolbarButton>
      </Toolbar>
    ),
    tagName: 'BUTTON',
    className: 'mondrian-toolbar-item',
  });
  itForwardsRef<HTMLAnchorElement>({
    render: (ref) => (
      <Toolbar>
        <ToolbarLink ref={ref} href="#">
          x
        </ToolbarLink>
      </Toolbar>
    ),
    tagName: 'A',
    className: 'mondrian-toolbar-link',
  });
  itForwardsRef<HTMLDivElement>({
    render: (ref) => (
      <Toolbar>
        <ToolbarSeparator ref={ref} />
      </Toolbar>
    ),
    tagName: 'DIV',
    className: 'mondrian-toolbar-separator',
  });
  itForwardsRef<HTMLDivElement>({
    render: (ref) => (
      <Toolbar>
        <ToolbarToggleGroup type="single" ref={ref}>
          <ToolbarToggleItem value="a">a</ToolbarToggleItem>
        </ToolbarToggleGroup>
      </Toolbar>
    ),
    tagName: 'DIV',
    className: 'mondrian-toolbar-toggle-group',
  });
  itForwardsRef<HTMLButtonElement>({
    render: (ref) => (
      <Toolbar>
        <ToolbarToggleGroup type="single">
          <ToolbarToggleItem value="a" ref={ref}>
            a
          </ToolbarToggleItem>
        </ToolbarToggleGroup>
      </Toolbar>
    ),
    tagName: 'BUTTON',
    className: 'mondrian-toolbar-item',
  });
});
