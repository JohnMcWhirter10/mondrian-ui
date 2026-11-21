import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from './NavigationMenu';

const Nav = ({ theme, viewport }: { theme?: 'red'; viewport?: boolean }) => (
  <NavigationMenu theme={theme} viewport={viewport} aria-label="Main">
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink href="#a">Alpha</NavigationMenuLink>
          <NavigationMenuLink href="#b">Beta</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Company</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink href="#c">About</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="#docs" active>
          Docs
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

describe('NavigationMenu', () => {
  it('renders a labelled navigation landmark with theme class', () => {
    render(<Nav theme="red" />);
    const nav = screen.getByRole('navigation', { name: 'Main' });
    expect(nav).toHaveClass('mondrian-navigation-menu red');
  });

  it('keeps panels closed until a trigger is activated', async () => {
    const user = userEvent.setup();
    render(<Nav />);
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
    const trigger = screen.getByRole('button', { name: 'Products' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Alpha')).toBeInTheDocument();
  });

  it('closes the panel with Escape', async () => {
    const user = userEvent.setup();
    render(<Nav />);
    await user.click(screen.getByRole('button', { name: 'Products' }));
    await user.keyboard('{Escape}');
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
  });

  it('opens with Enter from the keyboard', async () => {
    const user = userEvent.setup();
    render(<Nav />);
    await user.tab();
    expect(screen.getByRole('button', { name: 'Products' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('marks the current link', () => {
    render(<Nav />);
    const link = screen.getByRole('link', { name: 'Docs' });
    expect(link).toHaveAttribute('data-active');
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('renders the viewport by default and can omit it', () => {
    const { container, unmount } = render(<Nav />);
    expect(
      container.querySelector('.mondrian-navigation-menu-viewport-position')
    ).toBeInTheDocument();
    unmount();
    const second = render(<Nav viewport={false} />);
    expect(
      second.container.querySelector(
        '.mondrian-navigation-menu-viewport-position'
      )
    ).not.toBeInTheDocument();
  });
});
