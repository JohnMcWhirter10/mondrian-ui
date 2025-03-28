/**
 * DropdownMenu Component Types
 */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { ComponentTheme } from '../../themes';

/**
 * Theme variants for Mondrian UI components
 */
export type MondrianTheme = ComponentTheme;

/**
 * Size variants for Mondrian UI components
 */
export type MondrianSize = 'default' | 'sm' | 'lg';

/**
 * Base DropdownMenu props (Root component)
 */
export type DropdownMenuProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Root
>;

/**
 * DropdownMenuTrigger props (excluding className)
 */
export type DropdownMenuTriggerProps = Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>,
  'className'
> & {
  /**
   * The theme variant for the trigger
   * @default "primary"
   */
  theme?: MondrianTheme;

  /**
   * The size variant for the trigger
   * @default "default"
   */
  size?: MondrianSize;
};

/**
 * DropdownMenuContent props (excluding className)
 */
export type DropdownMenuContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>,
  'className'
> & {
  /**
   * The distance in pixels from the trigger.
   * @default 4
   */
  sideOffset?: number;

  /**
   * The theme variant for the content
   * @default "primary"
   */
  theme?: MondrianTheme;

  /**
   * The size variant for the content
   * @default "default"
   */
  size?: MondrianSize;
};

/**
 * DropdownMenuItem props (excluding className)
 */
export type DropdownMenuItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>,
  'className'
> & {
  /**
   * Whether the item is inset, pushing its content to the right.
   * @default false
   */
  inset?: boolean;

  /**
   * The theme variant for the item
   * @default "primary"
   */
  theme?: MondrianTheme;

  /**
   * The size variant for the item
   * @default "default"
   */
  size?: MondrianSize;
};

/**
 * DropdownMenuCheckboxItem props (excluding className)
 */
export type DropdownMenuCheckboxItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  'className'
> & {
  /**
   * The theme variant for the checkbox item
   * @default "primary"
   */
  theme?: MondrianTheme;

  /**
   * The size variant for the checkbox item
   * @default "default"
   */
  size?: MondrianSize;
};

/**
 * DropdownMenuLabel props (excluding className)
 */
export type DropdownMenuLabelProps = Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>,
  'className'
> & {
  /**
   * Whether the label is inset, pushing its content to the right.
   * @default false
   */
  inset?: boolean;

  /**
   * The theme variant for the label
   * @default "primary"
   */
  theme?: MondrianTheme;

  /**
   * The size variant for the label
   * @default "default"
   */
  size?: MondrianSize;
};
