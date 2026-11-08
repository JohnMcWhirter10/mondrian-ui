import * as React from 'react';
import type { PlaneTheme } from '../../themes/Theme.types';

export interface KbdProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'className'> {
  /**
   * The key label, such as "Ctrl" or "K".
   */
  children?: React.ReactNode;

  /**
   * Color plane of the key cap. Text is white on red and blue, black on
   * yellow and neutral (white on black in dark mode).
   * @default "neutral"
   */
  theme?: PlaneTheme;
}
