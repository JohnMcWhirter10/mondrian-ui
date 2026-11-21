/**
 * Toast Component Types
 */

import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';

export type ToastTheme = 'yellow' | 'blue' | 'red' | 'neutral';

export type ToastProviderProps = React.ComponentProps<
  typeof ToastPrimitive.Provider
>;

/** Screen edge the stack sits against. */
export type ToastViewportPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface ToastViewportProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>,
    'className'
  > {
  /** Where the stack sits. Default `bottom-right`. */
  position?: ToastViewportPosition;
}

export interface ToastProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    'className'
  > {
  /** Plane color. Default `yellow`. */
  theme?: ToastTheme;
  /**
   * Show a bar along the bottom edge that drains in steps as the toast
   * counts down to closing. Pauses with the timer. Default `false`. Nothing
   * shows when `duration` is `Infinity`.
   */
  progress?: boolean;
}

export type ToastTitleProps = Omit<
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>,
  'className'
>;

export type ToastDescriptionProps = Omit<
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>,
  'className'
>;

export type ToastActionProps = Omit<
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>,
  'className'
>;

export type ToastCloseProps = Omit<
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>,
  'className'
>;
