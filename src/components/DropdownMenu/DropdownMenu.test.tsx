import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
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
});
