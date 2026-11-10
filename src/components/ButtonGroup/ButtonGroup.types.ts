/**
 * ButtonGroup Component Types
 */

import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

export type ButtonGroupSize = 'default' | 'sm' | 'lg';

// Omit distributed over the single | multiple union so `type` still narrows.
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

type RootBase = DistributiveOmit<
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>,
  'className'
>;

/**
 * `type="single"` and `type="multiple"` both work (Radix props).
 * Arrow keys move focus as Radix provides.
 */
export type ButtonGroupProps = RootBase & {
  /**
   * Size of every item, matching `Button`.
   * @default "default"
   */
  size?: ButtonGroupSize;
};

export type ButtonGroupItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>,
  'className'
>;
