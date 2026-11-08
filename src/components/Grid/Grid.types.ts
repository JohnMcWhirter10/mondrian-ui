import * as React from 'react';

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
