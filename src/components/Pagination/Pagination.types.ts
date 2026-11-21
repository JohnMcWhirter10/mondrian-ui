import * as React from 'react';
import { ComponentTheme } from '../../themes';

export type PaginationTheme = ComponentTheme;
export type PaginationSize = 'default' | 'sm';
export type PaginationVariant = 'pages' | 'compact';

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
   * `pages` shows numbered pages that collapse with ellipses.
   * `compact` shows previous, "3 of 12" and next.
   * @default "pages"
   */
  variant?: PaginationVariant;
  /**
   * Colour of the current page
   * @default "red"
   */
  theme?: PaginationTheme;
  /**
   * Size of the buttons. `sm` suits table footers and uses arrow icons.
   * @default "default"
   */
  size?: PaginationSize;
};
