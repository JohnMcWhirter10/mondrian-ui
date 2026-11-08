import * as React from 'react';
import { ComponentTheme } from '../../themes';

/**
 * Same vocabulary as Input. The field itself stays the noncolor plane:
 * a black grid on white, in both modes.
 */
export type TextareaTheme = ComponentTheme;

export type TextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'className'
> & {
  /**
   * Theme name shared with Input and Label.
   * The plane does not take a primary color. Red, blue, yellow, green,
   * and neutral all keep the black grid on white.
   * @default "blue"
   */
  theme?: TextareaTheme;

  /**
   * Size from the library scale.
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';
};
