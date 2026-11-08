/**
 * ToggleButton Component Types
 */

import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { ComponentTheme } from '../../themes';

export type ToggleButtonTheme = ComponentTheme;
export type ToggleButtonSize = 'default' | 'sm' | 'lg';

export type ToggleButtonProps = Omit<
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
  'className'
> & {
  /**
   * Colour of the filled plane shown while pressed.
   * @default "blue"
   */
  theme?: ToggleButtonTheme;

  /**
   * Size, matching `Button`.
   * @default "default"
   */
  size?: ToggleButtonSize;
};
