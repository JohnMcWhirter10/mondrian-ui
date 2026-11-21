import * as React from 'react';
import { ComponentTheme } from '../../themes';

/**
 * A password field and a show/hide button inside one black grid. The consumer
 * supplies `id` and composes the Label. The field owns `type`.
 */
export type PasswordInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className' | 'size' | 'type' | 'children'
> & {
  /**
   * Id for the field. Pair it with a Label. Also names the button via
   * `aria-controls`.
   */
  id: string;

  /**
   * Plane color of the swatch on the bottom bar. The default is the noncolor
   * grid: black on white, white on black in dark mode.
   * @default "neutral"
   */
  theme?: ComponentTheme;

  /**
   * Size from the same scale as Input.
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';

  /**
   * When true, the field shows its value. Omit to let the field remember.
   */
  visible?: boolean;

  /**
   * Initial visibility when `visible` is omitted.
   * @default false
   */
  defaultVisible?: boolean;

  /**
   * Called with the next visibility after the button is pressed.
   */
  onVisibleChange?: (visible: boolean) => void;
};
