import * as React from 'react';

export interface SkeletonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  /**
   * Width of the placeholder plane. Numbers are pixels.
   * @default "100%"
   */
  width?: number | string;

  /**
   * Height of the placeholder plane. Numbers are pixels.
   * @default 16
   */
  height?: number | string;
}
