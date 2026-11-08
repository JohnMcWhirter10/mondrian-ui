/**
 * Tooltip Component Types
 */

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React from 'react';
import type { PlaneTheme } from '../../themes/Theme.types';

/**
 * Base Tooltip props (Root component)
 */
export type TooltipProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Root
>;

/**
 * TooltipTrigger props (excluding className)
 */
export type TooltipTriggerProps = Omit<
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>,
  'className'
>;

/**
 * TooltipContent props (excluding className)
 */
export type TooltipContentProps = Omit<
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
   * The accent plane pinned to the tooltip's left edge. Text always stays
   * on the white (or black, in dark mode) plane for contrast.
   * @default "neutral"
   */
  theme?: PlaneTheme;

  /**
   * @deprecated Use `theme`. `default` maps to `neutral`.
   * @default "default"
   */
  variant?: 'default' | PlaneTheme;
};

/**
 * TooltipProvider props
 */
export type TooltipProviderProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Provider
>;
