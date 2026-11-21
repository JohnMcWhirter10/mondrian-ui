import * as React from 'react';
import { ComponentTheme } from '../../themes';

export type PaginationTheme = ComponentTheme;
export type PaginationSize = 'default' | 'sm' | 'lg';

export type PaginationProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  'className' | 'children'
> & {
  /** Current page, 1-based. */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  /** Called with the requested page. */
  onPageChange: (page: number) => void;
  /**
   * Pages shown on each side of the current page before collapsing to an
   * ellipsis.
   * @default 1
   */
  siblingCount?: number;
  /**
   * Colour of the current page
   * @default "red"
   */
  theme?: PaginationTheme;
  /**
   * Size of the buttons
   * @default "default"
   */
  size?: PaginationSize;
};
