import * as React from 'react';

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
}
