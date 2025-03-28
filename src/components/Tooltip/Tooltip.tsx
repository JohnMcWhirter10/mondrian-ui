'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import './Tooltip.css';

export const TooltipProvider = TooltipPrimitive.Provider;

export const Tooltip = TooltipPrimitive.Root;

export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  Omit<
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    'className'
  > & {
    /**
     * The preferred side of the anchor to position against.
     * @default "top"
     */
    side?: 'top' | 'right' | 'bottom' | 'left';
    /**
     * The distance in pixels from the anchor.
     * @default 4
     */
    sideOffset?: number;
    /**
     * Color variant of the tooltip.
     * @default "default"
     */
    variant?: 'default' | 'red' | 'blue' | 'yellow';
  }
>(
  (
    { children, side = 'top', sideOffset = 4, variant = 'default', ...props },
    ref
  ) => (
    <TooltipPrimitive.Content
      ref={ref}
      side={side}
      sideOffset={sideOffset}
      className={`mondrian-tooltip-content ${variant !== 'default' ? variant : ''}`}
      {...props}
    >
      {children}
    </TooltipPrimitive.Content>
  )
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
