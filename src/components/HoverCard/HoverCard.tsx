'use client';

import * as React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { HoverCardContentProps, HoverCardProps } from './HoverCard.types';
import './HoverCard.css';

export const HoverCard = ({ openDelay = 200, ...props }: HoverCardProps) => (
  <HoverCardPrimitive.Root openDelay={openDelay} {...props} />
);
HoverCard.displayName = 'HoverCard';

export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(({ sideOffset = 6, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className="mondrian-hover-card-content"
      {...props}
    />
  </HoverCardPrimitive.Portal>
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;
