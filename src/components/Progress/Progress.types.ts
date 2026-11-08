import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

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
}
