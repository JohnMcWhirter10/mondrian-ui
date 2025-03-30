import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { ComponentTheme } from '../../themes';

// Use the standard ComponentTheme
export type CheckboxTheme = ComponentTheme;

// Export a compatible type for public use
export type CheckboxProps = Omit<
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  'className'
> & {
  /**
   * The theme color for the checkbox
   * @default "blue"
   */
  theme?: CheckboxTheme;

  /**
   * The size of the checkbox
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';
};
