import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

export type SeparatorOrientation = 'horizontal' | 'vertical';

export interface SeparatorProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
    'className'
  > {
  /**
   * Direction of the line.
   * @default "horizontal"
   */
  orientation?: SeparatorOrientation;

  /**
   * When true the separator is purely visual and drops its separator role.
   * @default true
   */
  decorative?: boolean;
}
