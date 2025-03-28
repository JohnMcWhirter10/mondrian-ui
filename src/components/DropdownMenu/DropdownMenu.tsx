'use client';

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Square } from '../icons';
import './DropdownMenu.css';
import {
  DropdownMenuTriggerProps,
  DropdownMenuItemProps,
  DropdownMenuContentProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuLabelProps,
  MondrianTheme,
  MondrianSize,
} from './DropdownMenu.types';

export const DropdownMenu = DropdownMenuPrimitive.Root;

export const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  DropdownMenuTriggerProps
>(({ theme = 'primary', size = 'default', ...props }, ref) => {
  const className = `mondrian-dropdown-menu-trigger ${theme} ${size !== 'default' ? `mondrian-dropdown-menu-trigger-${size}` : ''}`;
  return (
    <DropdownMenuPrimitive.Trigger ref={ref} className={className} {...props} />
  );
});
DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  Omit<
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>,
    'className'
  > & {
    inset?: boolean;
    theme?: MondrianTheme;
    size?: MondrianSize;
  }
>(({ inset, theme = 'primary', size = 'default', children, ...props }, ref) => {
  const className = `mondrian-dropdown-menu-subtrigger ${inset ? 'inset' : ''} ${theme} ${size !== 'default' ? `mondrian-dropdown-menu-subtrigger-${size}` : ''}`;
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={className}
      {...props}
    >
      {children}
      <ChevronRight className="mondrian-dropdown-menu-chevron" />
    </DropdownMenuPrimitive.SubTrigger>
  );
});
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

export const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  Omit<
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>,
    'className'
  > & {
    theme?: MondrianTheme;
    size?: MondrianSize;
  }
>(({ theme = 'primary', size = 'default', ...props }, ref) => {
  const className = `mondrian-dropdown-menu-subcontent ${theme} ${size !== 'default' ? `mondrian-dropdown-menu-subcontent-${size}` : ''}`;
  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={className}
      {...props}
    />
  );
});
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ sideOffset = 4, theme = 'primary', size = 'default', ...props }, ref) => {
  const className = `mondrian-dropdown-menu-content ${theme} ${size !== 'default' ? `mondrian-dropdown-menu-content-${size}` : ''}`;
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={className}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
});
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ inset, theme = 'primary', size = 'default', ...props }, ref) => {
  const className = `mondrian-dropdown-menu-item ${inset ? 'inset' : ''} ${theme} ${size !== 'default' ? `mondrian-dropdown-menu-item-${size}` : ''}`;
  return (
    <DropdownMenuPrimitive.Item ref={ref} className={className} {...props} />
  );
});
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(
  (
    { children, checked, theme = 'primary', size = 'default', ...props },
    ref
  ) => {
    const className = `mondrian-dropdown-menu-checkbox-item ${theme} ${size !== 'default' ? `mondrian-dropdown-menu-checkbox-item-${size}` : ''}`;
    const iconSize = size === 'sm' ? 12 : size === 'lg' ? 18 : 14;

    return (
      <DropdownMenuPrimitive.CheckboxItem
        ref={ref}
        className={className}
        checked={checked}
        {...props}
      >
        <span className="mondrian-dropdown-menu-checkbox-indicator">
          <DropdownMenuPrimitive.ItemIndicator>
            <Check className="mondrian-dropdown-menu-check" size={iconSize} />
          </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
      </DropdownMenuPrimitive.CheckboxItem>
    );
  }
);
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

export const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  Omit<
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>,
    'className'
  > & {
    theme?: MondrianTheme;
    size?: MondrianSize;
  }
>(({ children, theme = 'primary', size = 'default', ...props }, ref) => {
  const className = `mondrian-dropdown-menu-radio-item ${theme} ${size !== 'default' ? `mondrian-dropdown-menu-radio-item-${size}` : ''}`;
  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 18 : 14;

  return (
    <DropdownMenuPrimitive.RadioItem ref={ref} className={className} {...props}>
      <DropdownMenuPrimitive.ItemIndicator className="mondrian-dropdown-menu-radio-indicator">
        <Square className="mondrian-dropdown-menu-square" size={iconSize} />
      </DropdownMenuPrimitive.ItemIndicator>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
});
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(({ inset, theme = 'primary', size = 'default', ...props }, ref) => {
  const className = `mondrian-dropdown-menu-label ${inset ? 'inset' : ''} ${theme} ${size !== 'default' ? `mondrian-dropdown-menu-label-${size}` : ''}`;
  return (
    <DropdownMenuPrimitive.Label ref={ref} className={className} {...props} />
  );
});
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  Omit<
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>,
    'className'
  >
>(({ ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className="mondrian-dropdown-menu-separator"
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

export const DropdownMenuShortcut = ({
  ...props
}: Omit<React.HTMLAttributes<HTMLSpanElement>, 'className'>) => {
  return <span className="mondrian-dropdown-menu-shortcut" {...props} />;
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';
