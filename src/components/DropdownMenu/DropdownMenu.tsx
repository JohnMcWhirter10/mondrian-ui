import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ChevronRight } from '../icons';
import {
  DropdownMenuProps,
  DropdownMenuTriggerProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuLabelProps,
  DropdownMenuSeparatorProps,
  DropdownMenuGroupProps,
  DropdownMenuSubProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuSubContentProps,
  DropdownMenuItemIndicatorProps,
} from './DropdownMenu.types';
import './DropdownMenu.css';

// Create context to pass theme
const DropdownMenuContext = React.createContext<{
  theme: DropdownMenuProps['theme'];
}>({
  theme: 'blue',
});

const DropdownMenu = ({
  children,
  theme = 'blue',
  ...props
}: DropdownMenuProps) => (
  <DropdownMenuContext.Provider value={{ theme }}>
    <DropdownMenuPrimitive.Root {...props}>
      {children}
    </DropdownMenuPrimitive.Root>
  </DropdownMenuContext.Provider>
);
DropdownMenu.displayName = 'DropdownMenu';

const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  DropdownMenuTriggerProps
>(({ children, ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger
    className="mondrian-dropdown-trigger"
    ref={ref}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.Trigger>
));
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ children, theme: propTheme, ...props }, ref) => {
  // Use context theme as fallback when prop is not provided
  const { theme: contextTheme } = React.useContext(DropdownMenuContext);
  const theme = propTheme || contextTheme;

  const contentClassName = ['mondrian-dropdown-content', theme]
    .filter(Boolean)
    .join(' ');

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className={contentClassName}
        sideOffset={5}
        ref={ref}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
});
DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ children, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    className="mondrian-dropdown-item"
    ref={ref}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.Item>
));
DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ children, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    className="mondrian-dropdown-checkbox-item"
    ref={ref}
    {...props}
  >
    <DropdownMenuPrimitive.ItemIndicator className="mondrian-dropdown-item-indicator">
      ✓
    </DropdownMenuPrimitive.ItemIndicator>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

const DropdownMenuRadioGroup = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioGroup>,
  DropdownMenuRadioGroupProps
>(({ children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioGroup
    className="mondrian-dropdown-radio-group"
    ref={ref}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.RadioGroup>
));
DropdownMenuRadioGroup.displayName = 'DropdownMenuRadioGroup';

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(({ children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    className="mondrian-dropdown-radio-item"
    ref={ref}
    {...props}
  >
    <DropdownMenuPrimitive.ItemIndicator className="mondrian-dropdown-item-indicator">
      •
    </DropdownMenuPrimitive.ItemIndicator>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(({ children, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    className="mondrian-dropdown-label"
    ref={ref}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.Label>
));
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuSeparatorProps
>((props, ref) => (
  <DropdownMenuPrimitive.Separator
    className="mondrian-dropdown-separator"
    ref={ref}
    {...props}
  />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

const DropdownMenuGroup = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Group>,
  DropdownMenuGroupProps
>(({ children, ...props }, ref) => (
  <DropdownMenuPrimitive.Group
    className="mondrian-dropdown-group"
    ref={ref}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.Group>
));
DropdownMenuGroup.displayName = 'DropdownMenuGroup';

const DropdownMenuSub = ({ children, ...props }: DropdownMenuSubProps) => (
  <DropdownMenuPrimitive.Sub {...props}>{children}</DropdownMenuPrimitive.Sub>
);
DropdownMenuSub.displayName = 'DropdownMenuSub';

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(({ children, theme: propTheme, ...props }, ref) => {
  // Use context theme as fallback when prop is not provided
  const { theme: contextTheme } = React.useContext(DropdownMenuContext);
  const theme = propTheme || contextTheme;

  const triggerClassName = ['mondrian-dropdown-sub-trigger', theme]
    .filter(Boolean)
    .join(' ');

  return (
    <DropdownMenuPrimitive.SubTrigger
      className={triggerClassName}
      ref={ref}
      {...props}
    >
      {children}
      <div className="mondrian-dropdown-sub-icon">
        <ChevronRight />
      </div>
    </DropdownMenuPrimitive.SubTrigger>
  );
});
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  DropdownMenuSubContentProps
>(({ children, theme: propTheme, ...props }, ref) => {
  // Use context theme as fallback when prop is not provided
  const { theme: contextTheme } = React.useContext(DropdownMenuContext);
  const theme = propTheme || contextTheme;

  const contentClassName = ['mondrian-dropdown-sub-content', theme]
    .filter(Boolean)
    .join(' ');

  return (
    <DropdownMenuPrimitive.SubContent
      className={contentClassName}
      ref={ref}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.SubContent>
  );
});
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

const DropdownMenuItemIndicator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.ItemIndicator>,
  DropdownMenuItemIndicatorProps
>(({ children, ...props }, ref) => (
  <DropdownMenuPrimitive.ItemIndicator
    className="mondrian-dropdown-item-indicator"
    ref={ref}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.ItemIndicator>
));
DropdownMenuItemIndicator.displayName = 'DropdownMenuItemIndicator';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuItemIndicator,
};
