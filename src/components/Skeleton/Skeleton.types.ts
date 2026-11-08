import * as React from 'react';
import type { PlaneTheme } from '../../themes/Theme.types';

export interface SkeletonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  /**
   * Width of the placeholder plane. Numbers are pixels.
   * @default "100%"
   */
  width?: number | string;

  /**
   * Height of the placeholder plane. Numbers are pixels.
   * @default 16
   */
  height?: number | string;

  /**
   * Color of the sweep plane. Neutral sweeps in black (white in dark mode).
   * @default "neutral"
   */
  theme?: PlaneTheme;
}
