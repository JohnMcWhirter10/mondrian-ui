'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { TooltipContentProps } from './Tooltip.types';

import './Tooltip.css';

export const TooltipProvider = TooltipPrimitive.Provider;

export const Tooltip = TooltipPrimitive.Root;

export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(
  (
    {
      children,
      side = 'top',
      sideOffset = 4,
      variant = 'default',
      theme,
      ...props
    },
    ref
  ) => {
    // `variant` is kept for backwards compatibility; `theme` wins when given.
    const resolved = theme ?? (variant === 'default' ? 'neutral' : variant);

    return (
      <TooltipPrimitive.Content
        ref={ref}
        side={side}
        sideOffset={sideOffset}
        className={`mondrian-tooltip-content ${resolved}`}
        {...props}
      >
        {children}
      </TooltipPrimitive.Content>
    );
  }
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
