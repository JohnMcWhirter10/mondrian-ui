'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from './Tabs.types';
import './Tabs.css';

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ theme = 'yellow', ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    className={`mondrian-tabs mondrian-tabs-${theme}`}
    {...props}
  />
));
Tabs.displayName = 'Tabs';

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>((props, ref) => (
  <TabsPrimitive.List ref={ref} className="mondrian-tabs-list" {...props} />
));
TabsList.displayName = 'TabsList';

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>((props, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className="mondrian-tabs-trigger"
    {...props}
  />
));
TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>((props, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className="mondrian-tabs-content"
    {...props}
  />
));
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
