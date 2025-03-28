import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { ComponentTheme } from '../../themes';

// Reuse the common theme type
export type ToggleTheme = ComponentTheme;

// Export a compatible type for public use
export type ToggleProps = Omit<
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
  'className'
> & {
  /**
   * The label text for the toggle
   */
  label?: string;

  /**
   * The theme color for the toggle
   * @default "primary"
   */
  theme?: ToggleTheme;

  /**
   * The size of the toggle
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';

  /**
   * Position of the label relative to the toggle
   * @default "right"
   */
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
};
