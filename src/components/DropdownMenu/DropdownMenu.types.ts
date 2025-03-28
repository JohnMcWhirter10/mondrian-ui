import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ComponentTheme } from '../../themes';

export type DropdownMenuTheme = ComponentTheme;

export type DropdownMenuProps = Omit<
  DropdownMenuPrimitive.DropdownMenuProps,
  'className'
> & {
  /**
   * Determines the dropdown menu's visual style
   * @default "blue"
   */
  theme?: DropdownMenuTheme;
};

export type DropdownMenuTriggerProps = Omit<
  DropdownMenuPrimitive.DropdownMenuTriggerProps,
  'className'
>;

export type DropdownMenuContentProps = Omit<
  DropdownMenuPrimitive.DropdownMenuContentProps,
  'className'
> & {
  /**
   * The visual style variant to apply
   * @default inherited from DropdownMenu
   */
  theme?: DropdownMenuTheme;
};

export type DropdownMenuItemProps = Omit<
  DropdownMenuPrimitive.DropdownMenuItemProps,
  'className'
>;

export type DropdownMenuCheckboxItemProps = Omit<
  DropdownMenuPrimitive.DropdownMenuCheckboxItemProps,
  'className'
>;

export type DropdownMenuRadioGroupProps = Omit<
  DropdownMenuPrimitive.DropdownMenuRadioGroupProps,
  'className'
>;

export type DropdownMenuRadioItemProps = Omit<
  DropdownMenuPrimitive.DropdownMenuRadioItemProps,
  'className'
>;

export type DropdownMenuLabelProps = Omit<
  DropdownMenuPrimitive.DropdownMenuLabelProps,
  'className'
>;

export type DropdownMenuSeparatorProps = Omit<
  DropdownMenuPrimitive.DropdownMenuSeparatorProps,
  'className'
>;

export type DropdownMenuGroupProps = Omit<
  DropdownMenuPrimitive.DropdownMenuGroupProps,
  'className'
>;

export type DropdownMenuSubProps = Omit<
  DropdownMenuPrimitive.DropdownMenuSubProps,
  'className'
>;

export type DropdownMenuSubTriggerProps = Omit<
  DropdownMenuPrimitive.DropdownMenuSubTriggerProps,
  'className'
> & {
  /**
   * The visual style variant to apply
   * @default inherited from DropdownMenu
   */
  theme?: DropdownMenuTheme;
};

export type DropdownMenuSubContentProps = Omit<
  DropdownMenuPrimitive.DropdownMenuSubContentProps,
  'className'
> & {
  /**
   * The visual style variant to apply
   * @default inherited from DropdownMenu
   */
  theme?: DropdownMenuTheme;
};

export type DropdownMenuItemIndicatorProps = Omit<
  DropdownMenuPrimitive.DropdownMenuItemIndicatorProps,
  'className'
>;
