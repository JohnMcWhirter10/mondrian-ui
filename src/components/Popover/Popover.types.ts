/**
 * Popover Component Types
 */

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

export type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>;

export type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Trigger
>;

export type PopoverAnchorProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Anchor
>;

export type PopoverCloseProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Close
>;

/**
 * PopoverContent props (excluding className). `side`, `align` and the other
 * placement props come straight from Radix.
 */
export type PopoverContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
  'className'
>;
