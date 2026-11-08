/**
 * AlertDialog Component Types
 */

import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { ComponentTheme } from '../../themes';

export type AlertDialogProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Root
>;

export type AlertDialogTriggerProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Trigger
>;

/**
 * AlertDialogContent props (excluding className)
 */
export type AlertDialogContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>,
  'className'
> & {
  /**
   * Plane colour of the swatch pinned to the frame.
   * @default "red"
   */
  theme?: ComponentTheme;
};

type ActionBase = Omit<
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>,
  'className'
>;

/**
 * AlertDialogAction props (excluding className)
 */
export type AlertDialogActionProps = ActionBase & {
  /**
   * Colour of the confirm button.
   * @default "red"
   */
  theme?: ComponentTheme;
};

/**
 * AlertDialogCancel props (excluding className)
 */
export type AlertDialogCancelProps = ActionBase & {
  /**
   * Colour of the cancel button.
   * @default "neutral"
   */
  theme?: ComponentTheme;
};

export type AlertDialogTitleProps = Omit<
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>,
  'className'
>;

export type AlertDialogDescriptionProps = Omit<
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>,
  'className'
>;

export type AlertDialogHeaderProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'className'
>;

export type AlertDialogFooterProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'className'
>;
