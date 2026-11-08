import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import type { PlaneTheme } from '../../themes/Theme.types';

export type ProgressSize = 'default' | 'sm' | 'lg';

export interface ProgressProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    'className'
  > {
  /**
   * Current value. Omit it (or pass null) for the indeterminate state.
   */
  value?: number | null;

  /**
   * Maximum value.
   * @default 100
   */
  max?: number;

  /**
   * Size from the library scale.
   * @default "default"
   */
  size?: ProgressSize;

  /**
   * The plane that fills the bar.
   * @default "blue"
   */
  theme?: PlaneTheme;

  /**
   * Show the percentage as text beside the bar (determinate only).
   * A black notch at the edge of the fill is always drawn, so progress
   * never relies on color alone.
   * @default true
   */
  showValue?: boolean;
}
