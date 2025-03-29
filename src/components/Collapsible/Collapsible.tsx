'use client';

import * as React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import {
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
} from './Collapsible.types';
import './Collapsible.css';
import { ChevronRight } from '..';

const Collapsible = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  CollapsibleProps
>(({ children, theme = 'blue', size = 'default', ...props }, ref) => {
  const collapsibleClassName = [
    'mondrian-collapsible',
    theme,
    size === 'sm' ? 'mondrian-collapsible-sm' : '',
    size === 'lg' ? 'mondrian-collapsible-lg' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <CollapsiblePrimitive.Root
      className={collapsibleClassName}
      ref={ref}
      {...props}
    >
      {children}
    </CollapsiblePrimitive.Root>
  );
});
Collapsible.displayName = 'Collapsible';

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  CollapsibleTriggerProps
>(({ children, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger
    className="mondrian-collapsible-trigger"
    ref={ref}
    {...props}
  >
    {children}
    <ChevronRight className="mondrian-collapsible-icon" />
  </CollapsiblePrimitive.Trigger>
));
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  CollapsibleContentProps
>(({ children, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    className="mondrian-collapsible-content"
    ref={ref}
    {...props}
  >
    <div className="mondrian-collapsible-content-inner">{children}</div>
  </CollapsiblePrimitive.Content>
));
CollapsibleContent.displayName = 'CollapsibleContent';

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
