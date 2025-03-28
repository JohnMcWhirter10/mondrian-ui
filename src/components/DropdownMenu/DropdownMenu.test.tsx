import { render, screen, fireEvent, within } from '@testing-library/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from './DropdownMenu';

describe('DropdownMenu', () => {
  it('should render the trigger only initially', () => {
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
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
  });

  it('should open the menu when trigger is clicked', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    fireEvent.click(screen.getByText('Open Menu'));

    // Use queryByText since the content may be in a portal
    const content = document.querySelector('.mondrian-dropdown-menu-content');
    expect(content).toBeInTheDocument();
    expect(
      within(content as HTMLElement).getByText('Item 1')
    ).toBeInTheDocument();
    expect(
      within(content as HTMLElement).getByText('Item 2')
    ).toBeInTheDocument();
  });

  it('should render with Mondrian styling classes', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Menu Label</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    fireEvent.click(screen.getByText('Open Menu'));

    // Test content styling class
    const content = document.querySelector('.mondrian-dropdown-menu-content');
    expect(content).toBeInTheDocument();

    // Test label styling class
    const label = document.querySelector('.mondrian-dropdown-menu-label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Menu Label');

    // Test separator styling class
    const separator = document.querySelector(
      '.mondrian-dropdown-menu-separator'
    );
    expect(separator).toBeInTheDocument();

    // Test item styling class
    const item = document.querySelector('.mondrian-dropdown-menu-item');
    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent('Item 1');
  });

  it('should apply inset class to menu item when inset prop is true', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem inset={true}>Inset Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    fireEvent.click(screen.getByText('Open Menu'));

    const insetItem = document.querySelector(
      '.mondrian-dropdown-menu-item.inset'
    );
    expect(insetItem).toBeInTheDocument();
    expect(insetItem).toHaveTextContent('Inset Item');
  });
});
