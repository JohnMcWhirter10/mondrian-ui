import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import type { PlaneTheme } from '../../themes/Theme.types';

export type SeparatorOrientation = 'horizontal' | 'vertical';

export interface SeparatorProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
    'className'
  > {
  /**
   * Direction of the line. Horizontal uses the heavy weight, vertical the base weight.
   * @default "horizontal"
   */
  orientation?: SeparatorOrientation;

  /**
   * When true the separator is purely visual and drops its separator role.
   * @default true
   */
  decorative?: boolean;

  /**
   * Color of the short cap at the start of the line. Neutral is a black
   * (white in dark mode) cap, the same color as the line.
   * @default "neutral"
   */
  theme?: PlaneTheme;
}
