import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarSeparator,
} from './Menubar';

const Bar = ({
  theme,
  onSelect,
}: {
  theme?: 'red' | 'yellow';
  onSelect?: () => void;
}) => (
  <Menubar theme={theme} aria-label="Application">
    <MenubarMenu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarItem onSelect={onSelect}>New</MenubarItem>
        <MenubarSeparator />
        <MenubarCheckboxItem checked>Autosave</MenubarCheckboxItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Edit</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>Undo</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
);

describe('Menubar', () => {
  it('renders a menubar with trigger classes', () => {
    render(<Bar theme="red" />);
    const bar = screen.getByRole('menubar', { name: 'Application' });
    expect(bar).toHaveClass('mondrian-menubar red');
    expect(screen.getByRole('menuitem', { name: 'File' })).toHaveClass(
      'mondrian-menubar-trigger'
    );
  });

  it('opens a menu on click with the shared dropdown frame', async () => {
    const user = userEvent.setup();
    render(<Bar theme="yellow" />);
    await user.click(screen.getByRole('menuitem', { name: 'File' }));
    const menu = screen.getByRole('menu');
    expect(menu).toHaveClass('mondrian-dropdown-content yellow');
    expect(screen.getByRole('menuitem', { name: 'New' })).toBeInTheDocument();
    expect(
      screen.getByRole('menuitemcheckbox', { name: 'Autosave' })
    ).toBeChecked();
  });

  it('moves between menus with ArrowRight while open', async () => {
    const user = userEvent.setup();
    render(<Bar />);
    await user.click(screen.getByRole('menuitem', { name: 'File' }));
    await user.keyboard('{ArrowRight}');
    expect(
      await screen.findByRole('menuitem', { name: 'Undo' })
    ).toBeInTheDocument();
    expect(screen.queryByRole('menuitem', { name: 'New' })).toBeNull();
  });

  it('selects an item and closes the menu', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(<Bar onSelect={onSelect} />);
    await user.click(screen.getByRole('menuitem', { name: 'File' }));
    await user.click(screen.getByRole('menuitem', { name: 'New' }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    render(<Bar />);
    await user.click(screen.getByRole('menuitem', { name: 'File' }));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
