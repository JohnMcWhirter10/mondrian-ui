/**
 * Toolbar Component Types
 */

import * as React from 'react';
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';

// Distributive so the single | multiple union of toggle groups is preserved.
type NoClass<T> = T extends unknown ? Omit<T, 'className'> : never;

export type ToolbarProps = NoClass<
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>
>;
export type ToolbarButtonProps = NoClass<
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>
>;
export type ToolbarLinkProps = NoClass<
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Link>
>;
export type ToolbarSeparatorProps = NoClass<
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>;
export type ToolbarToggleGroupProps = NoClass<
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleGroup>
>;
export type ToolbarToggleItemProps = NoClass<
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleItem>
>;
