import * as React from 'react';
import { ComponentTheme } from '../../themes';

/**
 * One rectangle around a field and its start and end slots. Slots are
 * children. The group does not take a className.
 */
export type InputGroupProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'className'
> & {
  /**
   * Plane color of the swatch on the bottom bar. The default is the noncolor
   * grid.
   * @default "neutral"
   */
  theme?: ComponentTheme;

  /**
   * Size from the same scale as Input.
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';
};

/**
 * A cell at one end of the rectangle. Put an icon or a button in `children`.
 */
export type InputGroupSlotProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'className'
> & {
  /**
   * Which edge of the field the slot sits on.
   * @default "start"
   */
  side?: 'start' | 'end';
};

/**
 * The field inside the group. It has no border of its own. The consumer
 * supplies `id` and composes the Label.
 */
export type InputGroupInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className' | 'size' | 'children'
> & {
  id: string;
};
