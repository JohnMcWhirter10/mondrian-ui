import * as React from 'react';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import type { PlaneTheme } from '../../themes/Theme.types';

export interface AspectRatioProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>,
    'className'
  > {
  /**
   * Width divided by height of the frame, for example 16 / 9.
   * @default 1
   */
  ratio?: number;

  /**
   * Color of the small swatch pinned to the frame's lower right edge.
   * Neutral draws a black (white in dark mode) bar.
   * @default "neutral"
   */
  theme?: PlaneTheme;
}
