import * as React from 'react';
import { ComponentTheme } from '../../themes';

// Reuse the common theme type
export type BoxVariant = ComponentTheme;

export type BoxSize = 'default' | 'sm' | 'md' | 'lg' | 'xl';

export type BoxProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'className'
> & {
  /**
   * The visual style variant of the box
   * @default "primary"
   */
  variant?: BoxVariant;

  /**
   * The size of the box which affects padding
   * @default "default"
   */
  size?: BoxSize;

  /**
   * When true, renders the children with props forwarded through Radix Slot
   * @default false
   */
  asChild?: boolean;

  /**
   * Determines if the box should take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * When true, the box will display as a flexbox container
   * @default false
   */
  flex?: boolean;

  /**
   * When true, the box will not have the default border
   * @default false
   */
  noBorder?: boolean;
};
