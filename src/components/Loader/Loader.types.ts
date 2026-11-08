import * as React from 'react';
import type { PlaneTheme } from '../../themes/Theme.types';

export type LoaderSize = 'default' | 'sm' | 'lg';

export interface LoaderProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'className'> {
  /**
   * Accessible name announced by assistive technology.
   * @default "Loading"
   */
  label?: string;

  /**
   * Size from the library scale.
   * @default "default"
   */
  size?: LoaderSize;

  /**
   * The plane that moves across the white blocks.
   * @default "blue"
   */
  theme?: PlaneTheme;
}
