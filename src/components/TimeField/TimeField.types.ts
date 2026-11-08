import * as React from 'react';
import type { PlaneTheme } from '../../themes/Theme.types';

/**
 * A native time field. It reuses the Input grid: white (black in dark mode)
 * inside a black line, heavy bottom bar, and a flat swatch of the theme plane.
 */
export type TimeFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className' | 'size' | 'type'
> & {
  /**
   * The plane color of the swatch on the bottom bar.
   * @default "blue"
   */
  theme?: PlaneTheme;

  /**
   * Size from the same scale as Input.
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';
};
