/**
 * Dialog Component Types
 */

import * as DialogPrimitive from '@radix-ui/react-dialog';
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
 * Base Dialog props (Root component)
 */
export type DialogProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Root
>;

/**
 * DialogContent props (excluding className)
 */
export type DialogContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
  'className'
> & {
  /**
   * The theme variant for the dialog content
   * @default "primary"
   */
  theme?: MondrianTheme;

  /**
   * The size variant for the dialog content
   * @default "default"
   */
  size?: MondrianSize;
};

/**
 * DialogTrigger props (excluding className)
 */
export type DialogTriggerProps = Omit<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>,
  'className'
> & {
  /**
   * When true, the component renders its children directly with props forwarded.
   * @default false
   */
  asChild?: boolean;

  /**
   * The theme variant for the trigger button
   * @default "primary"
   */
  theme?: MondrianTheme;

  /**
   * The size variant for the trigger button
   * @default "default"
   */
  size?: MondrianSize;
};

/**
 * DialogOverlay props (excluding className)
 */
export type DialogOverlayProps = Omit<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>,
  'className'
>;

/**
 * DialogClose props (excluding className)
 */
export type DialogCloseProps = Omit<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>,
  'className'
>;

/**
 * DialogTitle props (excluding className)
 */
export type DialogTitleProps = Omit<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>,
  'className'
>;

/**
 * DialogDescription props (excluding className)
 */
export type DialogDescriptionProps = Omit<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>,
  'className'
>;
