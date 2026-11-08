import * as React from 'react';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';

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
}
