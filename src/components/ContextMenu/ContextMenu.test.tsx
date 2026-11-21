import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from './ContextMenu';

const open = () => fireEvent.contextMenu(screen.getByText('Right click here'));

const Basic = ({
  theme,
  contentTheme,
  onSelect,
}: {
  theme?: 'red' | 'blue';
  contentTheme?: 'green';
  onSelect?: () => void;
}) => (
  <ContextMenu theme={theme}>
    <ContextMenuTrigger>Right click here</ContextMenuTrigger>
    <ContextMenuContent theme={contentTheme}>
      <ContextMenuItem onSelect={onSelect}>Copy</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem disabled>Paste</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
);

describe('ContextMenu', () => {
  it('stays closed until the contextmenu event', () => {
    render(<Basic />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    open();
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Copy' })).toBeInTheDocument();
  });

  it('shares the DropdownMenu frame and row classes', () => {
    render(<Basic />);
    open();
    expect(screen.getByRole('menu')).toHaveClass('mondrian-dropdown-content');
    expect(screen.getByRole('menuitem', { name: 'Copy' })).toHaveClass(
      'mondrian-dropdown-item'
    );
    expect(screen.getByRole('separator')).toHaveClass(
      'mondrian-dropdown-separator'
    );
  });

  it('applies the theme and lets the content override it', () => {
    const { unmount } = render(<Basic theme="red" />);
    open();
    expect(screen.getByRole('menu')).toHaveClass('red');
    unmount();
    render(<Basic theme="red" contentTheme="green" />);
    open();
    expect(screen.getByRole('menu')).toHaveClass('green');
  });

  it('selects with Enter and closes', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(<Basic onSelect={onSelect} />);
    open();
    await user.keyboard('{ArrowDown}{Enter}');
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('marks disabled items', () => {
    render(<Basic />);
    open();
    expect(screen.getByRole('menuitem', { name: 'Paste' })).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });

  it('supports checkbox and radio items', async () => {
    const user = userEvent.setup();
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click here</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuCheckboxItem checked>Bookmarks</ContextMenuCheckboxItem>
          <ContextMenuRadioGroup value="a">
            <ContextMenuRadioItem value="a">Alpha</ContextMenuRadioItem>
            <ContextMenuRadioItem value="b">Beta</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    );
    open();
    expect(
      screen.getByRole('menuitemcheckbox', { name: 'Bookmarks' })
    ).toBeChecked();
    expect(screen.getByRole('menuitemradio', { name: 'Alpha' })).toBeChecked();
    expect(
      screen.getByRole('menuitemradio', { name: 'Beta' })
    ).not.toBeChecked();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens a submenu with ArrowRight', async () => {
    const user = userEvent.setup();
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click here</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuSub>
            <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Nested</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    );
    open();
    await user.keyboard('{ArrowDown}{ArrowRight}');
    expect(
      await screen.findByRole('menuitem', { name: 'Nested' })
    ).toBeInTheDocument();
  });
});
