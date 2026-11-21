import * as React from 'react';
import * as P from '@radix-ui/react-menubar';
import { MondrianRightArrow, Plus, Square } from '../icons';
import type {
  MenubarProps,
  MenubarMenuProps,
  MenubarTriggerProps,
  MenubarContentProps,
  MenubarItemProps,
  MenubarCheckboxItemProps,
  MenubarRadioGroupProps,
  MenubarRadioItemProps,
  MenubarLabelProps,
  MenubarSeparatorProps,
  MenubarGroupProps,
  MenubarSubProps,
  MenubarSubTriggerProps,
  MenubarSubContentProps,
} from './Menubar.types';
import '../../styles/native-scroll.css';
// Open menus reuse the DropdownMenu frame, rows and separators.
import '../DropdownMenu/DropdownMenu.css';
import './Menubar.css';

const MenubarContext = React.createContext<{ theme: MenubarProps['theme'] }>({
  theme: 'blue',
});

const cx = (...c: Array<string | undefined | false>) =>
  c.filter(Boolean).join(' ');

const Menubar = React.forwardRef<React.ElementRef<typeof P.Root>, MenubarProps>(
  ({ theme = 'blue', ...props }, ref) => (
    <MenubarContext.Provider value={{ theme }}>
      <P.Root className={cx('mondrian-menubar', theme)} ref={ref} {...props} />
    </MenubarContext.Provider>
  )
);
Menubar.displayName = 'Menubar';

const MenubarMenu = (props: MenubarMenuProps) => <P.Menu {...props} />;
MenubarMenu.displayName = 'MenubarMenu';

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof P.Trigger>,
  MenubarTriggerProps
>((props, ref) => (
  <P.Trigger className="mondrian-menubar-trigger" ref={ref} {...props} />
));
MenubarTrigger.displayName = 'MenubarTrigger';

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof P.Content>,
  MenubarContentProps
>(({ children, theme: propTheme, ...props }, ref) => {
  const { theme: ctx } = React.useContext(MenubarContext);
  return (
    <P.Portal>
      <P.Content
        className={cx('mondrian-dropdown-content', propTheme || ctx)}
        align="start"
        sideOffset={5}
        ref={ref}
        {...props}
      >
        <div className="mondrian-dropdown-scroll mondrian-native-scroll">
          {children}
        </div>
      </P.Content>
    </P.Portal>
  );
});
MenubarContent.displayName = 'MenubarContent';

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof P.Item>,
  MenubarItemProps
>((props, ref) => (
  <P.Item className="mondrian-dropdown-item" ref={ref} {...props} />
));
MenubarItem.displayName = 'MenubarItem';

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof P.CheckboxItem>,
  MenubarCheckboxItemProps
>(({ children, ...props }, ref) => (
  <P.CheckboxItem
    className="mondrian-dropdown-checkbox-item"
    ref={ref}
    {...props}
  >
    <P.ItemIndicator className="mondrian-dropdown-item-indicator">
      <Plus size={16} aria-hidden="true" focusable="false" />
    </P.ItemIndicator>
    {children}
  </P.CheckboxItem>
));
MenubarCheckboxItem.displayName = 'MenubarCheckboxItem';

const MenubarRadioGroup = React.forwardRef<
  React.ElementRef<typeof P.RadioGroup>,
  MenubarRadioGroupProps
>((props, ref) => (
  <P.RadioGroup
    className="mondrian-dropdown-radio-group"
    ref={ref}
    {...props}
  />
));
MenubarRadioGroup.displayName = 'MenubarRadioGroup';

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof P.RadioItem>,
  MenubarRadioItemProps
>(({ children, ...props }, ref) => (
  <P.RadioItem className="mondrian-dropdown-radio-item" ref={ref} {...props}>
    <P.ItemIndicator className="mondrian-dropdown-item-indicator">
      <Square size={12} aria-hidden="true" focusable="false" />
    </P.ItemIndicator>
    {children}
  </P.RadioItem>
));
MenubarRadioItem.displayName = 'MenubarRadioItem';

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof P.Label>,
  MenubarLabelProps
>((props, ref) => (
  <P.Label className="mondrian-dropdown-label" ref={ref} {...props} />
));
MenubarLabel.displayName = 'MenubarLabel';

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof P.Separator>,
  MenubarSeparatorProps
>((props, ref) => (
  <P.Separator className="mondrian-dropdown-separator" ref={ref} {...props} />
));
MenubarSeparator.displayName = 'MenubarSeparator';

const MenubarGroup = React.forwardRef<
  React.ElementRef<typeof P.Group>,
  MenubarGroupProps
>((props, ref) => (
  <P.Group className="mondrian-dropdown-group" ref={ref} {...props} />
));
MenubarGroup.displayName = 'MenubarGroup';

const MenubarSub = (props: MenubarSubProps) => <P.Sub {...props} />;
MenubarSub.displayName = 'MenubarSub';

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof P.SubTrigger>,
  MenubarSubTriggerProps
>(({ children, ...props }, ref) => {
  const { theme } = React.useContext(MenubarContext);
  return (
    <P.SubTrigger
      className={cx('mondrian-dropdown-sub-trigger', theme)}
      ref={ref}
      {...props}
    >
      {children}
      <div className="mondrian-dropdown-sub-icon" aria-hidden="true">
        <MondrianRightArrow />
      </div>
    </P.SubTrigger>
  );
});
MenubarSubTrigger.displayName = 'MenubarSubTrigger';

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof P.SubContent>,
  MenubarSubContentProps
>(({ children, theme: propTheme, ...props }, ref) => {
  const { theme: ctx } = React.useContext(MenubarContext);
  return (
    <P.SubContent
      className={cx('mondrian-dropdown-sub-content', propTheme || ctx)}
      ref={ref}
      {...props}
    >
      <div className="mondrian-dropdown-scroll mondrian-native-scroll">
        {children}
      </div>
    </P.SubContent>
  );
});
MenubarSubContent.displayName = 'MenubarSubContent';

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarGroup,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
};
