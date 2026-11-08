import * as React from 'react';
import { ComponentTheme } from '../../themes';

// Reuse the common theme type
export type InputTheme = ComponentTheme;

// Export a compatible type for public use
export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className' | 'size'
> & {
  /**
   * The plane color of the swatch on the bottom bar. The field stays white
   * (black in dark mode) inside a black grid.
   * @default "blue"
   */
  theme?: InputTheme;

  /**
   * The size of the input
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';

  /**
   * When true, the component renders its children directly with props forwarded
   * @default false
   */
  asChild?: boolean;
};
