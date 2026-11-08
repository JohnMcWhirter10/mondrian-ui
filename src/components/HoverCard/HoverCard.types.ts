/**
 * HoverCard Component Types
 */

import * as React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

export type HoverCardProps = React.ComponentProps<
  typeof HoverCardPrimitive.Root
> & {
  /**
   * Milliseconds to wait before opening on hover.
   * @default 200
   */
  openDelay?: number;
};

export type HoverCardTriggerProps = React.ComponentPropsWithoutRef<
  typeof HoverCardPrimitive.Trigger
>;

/**
 * HoverCardContent props (excluding className)
 */
export type HoverCardContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>,
  'className'
>;
