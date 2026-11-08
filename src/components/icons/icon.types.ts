import type * as React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Size of the icon, in pixels.
   * @default 16
   */
  size?: number;

  /**
   * Accessible name. When omitted (and no aria-label/aria-labelledby is
   * given) the icon is decorative and hidden from assistive technology.
   */
  title?: string;
}
