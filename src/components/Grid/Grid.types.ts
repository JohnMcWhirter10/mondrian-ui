import * as React from 'react';
import type { PlaneTheme } from '../../themes/Theme.types';

/** Spacing scale names drawn from the --mondrian-spacing-* variables. */
export type GridGap = 'none' | 'small' | 'medium' | 'large';

export interface GridProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  /**
   * Number of equal columns, or a CSS grid-template-columns value.
   * @default 12
   */
  columns?: number | string;

  /**
   * Gap between planes from the spacing scale.
   * @default "none"
   */
  gap?: GridGap;

  /**
   * Draw visible grid lines between items: base weight verticals and
   * heavy horizontals. A heavy cap in the theme color runs past the top left.
   * @default false
   */
  lines?: boolean;

  /**
   * Color of the heavy cap bar drawn when `lines` is true.
   * @default "neutral"
   */
  theme?: PlaneTheme;
}

export interface GridItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  /**
   * Number of columns the item spans.
   */
  span?: number;

  /**
   * Number of rows the item spans.
   */
  rowSpan?: number;
}
