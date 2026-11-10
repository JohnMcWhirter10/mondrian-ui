'use client';

import * as React from 'react';
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { ToolbarToggleGroupProps } from './Toolbar.types';
import './Toolbar.css';

/**
 * Groups buttons, toggle groups, links and separators into one row with
 * roving focus. Items share borders so it reads as one rectangle.
 */
export const Toolbar = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Root>,
  Omit<
    React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>,
    'className'
  >
>((props, ref) => (
  <ToolbarPrimitive.Root ref={ref} className="mondrian-toolbar" {...props} />
));
Toolbar.displayName = 'Toolbar';

export const ToolbarButton = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Button>,
  Omit<
    React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>,
    'className'
  >
>((props, ref) => (
  <ToolbarPrimitive.Button
    ref={ref}
    className="mondrian-toolbar-item"
    {...props}
  />
));
ToolbarButton.displayName = 'ToolbarButton';

export const ToolbarLink = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Link>,
  Omit<
    React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Link>,
    'className'
  >
>((props, ref) => (
  <ToolbarPrimitive.Link
    ref={ref}
    className="mondrian-toolbar-item mondrian-toolbar-link"
    {...props}
  />
));
ToolbarLink.displayName = 'ToolbarLink';

export const ToolbarSeparator = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Separator>,
  Omit<
    React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>,
    'className'
  >
>((props, ref) => (
  <ToolbarPrimitive.Separator
    ref={ref}
    className="mondrian-toolbar-separator"
    {...props}
  />
));
ToolbarSeparator.displayName = 'ToolbarSeparator';

export const ToolbarToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.ToggleGroup>,
  ToolbarToggleGroupProps
>((props, ref) => (
  <ToolbarPrimitive.ToggleGroup
    ref={ref}
    className="mondrian-toolbar-toggle-group"
    {...props}
  />
));
ToolbarToggleGroup.displayName = 'ToolbarToggleGroup';

export const ToolbarToggleItem = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.ToggleItem>,
  Omit<
    React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleItem>,
    'className'
  >
>((props, ref) => (
  <ToolbarPrimitive.ToggleItem
    ref={ref}
    className="mondrian-toolbar-item"
    {...props}
  />
));
ToolbarToggleItem.displayName = 'ToolbarToggleItem';
