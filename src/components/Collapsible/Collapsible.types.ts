import * as React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { ComponentTheme } from '../../themes';

export type CollapsibleTheme = ComponentTheme;

export type CollapsibleProps = Omit<
  CollapsiblePrimitive.CollapsibleProps,
  'className'
> & {
  /**
   * Determines the collapsible's visual style
   * @default "blue"
   */
  theme?: CollapsibleTheme;

  /**
   * Determines the collapsible's size
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';
};

export type CollapsibleTriggerProps = Omit<
  CollapsiblePrimitive.CollapsibleTriggerProps,
  'className'
>;

export type CollapsibleContentProps = Omit<
  CollapsiblePrimitive.CollapsibleContentProps,
  'className'
>;
