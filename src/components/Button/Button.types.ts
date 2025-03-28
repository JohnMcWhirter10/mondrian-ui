import * as React from 'react';
import { ComponentTheme } from '../../themes';

// Use the standard ComponentTheme
export type ButtonTheme = ComponentTheme;

// Export a compatible type for public use
export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
> & {
  /**
   * Determines the button's visual style
   * @default "blue"
   *
   * Values: 'blue', 'neutral', 'red', 'green', 'yellow'
   */
  theme?: ButtonTheme;

  /**
   * Determines the button's size
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';

  /**
   * When true, the component renders its children directly with props forwarded.
   * @default false
   */
  asChild?: boolean;
};
