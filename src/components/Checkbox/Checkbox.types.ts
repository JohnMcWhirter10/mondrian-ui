import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { ComponentTheme } from '../../themes';

// Reuse the common theme type
export type CheckboxTheme = ComponentTheme;

// Export a compatible type for public use
export type CheckboxProps = Omit<
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  'className'
> & {
  /**
   * The label text for the checkbox
   */
  label?: string;

  /**
   * The theme color for the checkbox
   * @default "primary"
   */
  theme?: CheckboxTheme;

  /**
   * The size of the checkbox
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';

  /**
   * When true, the component merges props with its children
   * @default false
   */
  asChild?: boolean;

  /**
   * Additional class name to apply to the checkbox container
   */
  className?: string;

  /**
   * Initial checked state
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * Current checked state (controlled)
   */
  checked?: boolean | 'indeterminate';

  /**
   * Callback when checked state changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Optional ID for the checkbox
   */
  id?: string;
};
