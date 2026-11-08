import * as React from 'react';

/**
 * Primary planes plus the noncolor case.
 * Green is reserved for success semantics on other components.
 */
export type BadgeTheme = 'blue' | 'neutral' | 'red' | 'yellow';

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'className'> {
  /**
   * The single color plane behind the label.
   * Red, blue, and yellow are primary planes. Neutral is black on white
   * in both modes, held by a black grid line of one weight.
   * @default "blue"
   */
  theme?: BadgeTheme;

  /**
   * Size from the library scale.
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';
}
