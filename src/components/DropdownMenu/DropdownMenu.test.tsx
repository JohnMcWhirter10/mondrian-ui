import * as React from 'react';
import { render, screen } from '@testing-library/react';
import {
  PLANE_THEMES_WITH_GREEN,
  itAppliesThemeClasses,
} from '../../test-utils';
import userEvent from '@testing-library/user-event';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from './DropdownMenu';

describe('DropdownMenu', () => {
  it('renders the dropdown trigger', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByText('Open Menu')).toBeInTheDocument();
  });

  it('opens the dropdown menu when trigger is clicked', async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    // Content shouldn't be visible initially
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();

    // Click the trigger
    await user.click(screen.getByText('Open Menu'));

    // Now items should be visible
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('applies the correct theme class', () => {
    render(
      <DropdownMenu theme="red">
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByText('Open Menu');
    expect(trigger).toHaveClass('mondrian-dropdown-trigger');
  });

  it('passes theme prop from DropdownMenu to DropdownMenuContent', async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu theme="red">
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    // Click the trigger to open the menu
    await user.click(screen.getByText('Open Menu'));

    // Check that the content has the correct theme class
    const content = screen.getByRole('menu');
    expect(content).toHaveClass('mondrian-dropdown-content');
    expect(content).toHaveClass('red');
  });

  it('allows theme override in DropdownMenuContent', async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu theme="red">
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent theme="green">
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    // Click the trigger to open the menu
    await user.click(screen.getByText('Open Menu'));

    // Check that the content has the overridden theme class
    const content = screen.getByRole('menu');
    expect(content).toHaveClass('mondrian-dropdown-content');
    expect(content).toHaveClass('green');
    expect(content).not.toHaveClass('red');
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES_WITH_GREEN,
    render: (theme) => (
      <DropdownMenu theme={theme}>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    classFor: (theme) => theme,
    target: () => screen.getByRole('button', { name: 'Open Menu' }),
  });

  it.each(PLANE_THEMES_WITH_GREEN)(
    'applies the %s theme class to content',
    async (theme) => {
      const user = userEvent.setup();
      render(
        <DropdownMenu theme={theme}>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
      await user.click(screen.getByText('Open Menu'));
      expect(screen.getByRole('menu')).toHaveClass(theme);
    }
  );

  it('defaults to the blue theme', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    await user.click(screen.getByText('Open Menu'));
    expect(screen.getByRole('menu')).toHaveClass('blue');
  });

  it('forwards refs to trigger and content', async () => {
    const user = userEvent.setup();
    const triggerRef = React.createRef<HTMLButtonElement>();
    const contentRef = React.createRef<HTMLDivElement>();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger ref={triggerRef}>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent ref={contentRef}>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    await user.click(screen.getByText('Open Menu'));
    expect(triggerRef.current).toHaveClass('mondrian-dropdown-trigger');
    expect(contentRef.current).toBe(screen.getByRole('menu'));
  });

  it('shows a decorative glyph only for checked items and keeps aria-checked', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked>On</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={false}>
            Off
          </DropdownMenuCheckboxItem>
          <DropdownMenuRadioGroup value="a">
            <DropdownMenuRadioItem value="a">A</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="b">B</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    await user.click(screen.getByText('Open Menu'));

    const on = screen.getByRole('menuitemcheckbox', { name: 'On' });
    const off = screen.getByRole('menuitemcheckbox', { name: 'Off' });
    expect(on).toHaveAttribute('aria-checked', 'true');
    expect(on.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(off).toHaveAttribute('aria-checked', 'false');
    expect(off.querySelector('svg')).toBeNull();

    const a = screen.getByRole('menuitemradio', { name: 'A' });
    const b = screen.getByRole('menuitemradio', { name: 'B' });
    expect(a.querySelector('svg')).not.toBeNull();
    expect(b.querySelector('svg')).toBeNull();
  });

  it('marks the keyboard-focused item with data-highlighted', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    await user.click(screen.getByText('Open Menu'));
    await user.keyboard('{ArrowDown}');
    const highlighted = document.querySelector('[data-highlighted]');
    expect(highlighted).toBeInTheDocument();
    expect(highlighted).toHaveClass('mondrian-dropdown-item');
  });
});
