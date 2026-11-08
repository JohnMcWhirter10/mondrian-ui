import * as React from 'react';
import type { PlaneTheme } from '../../themes/Theme.types';
import { ScrollAreaProps } from '../ScrollArea/ScrollArea.types';

export interface TableProps
  extends Omit<React.ComponentPropsWithoutRef<'table'>, 'className'> {
  /**
   * Theme of the horizontal scrollbar thumb.
   * @default "blue"
   */
  scrollTheme?: ScrollAreaProps['theme'];

  /**
   * Color of the small corner swatch on the first header cell.
   * @default "blue"
   */
  theme?: PlaneTheme;
}

export interface TableHeaderProps
  extends Omit<React.ComponentPropsWithoutRef<'thead'>, 'className'> {}

export interface TableBodyProps
  extends Omit<React.ComponentPropsWithoutRef<'tbody'>, 'className'> {}

export interface TableFooterProps
  extends Omit<React.ComponentPropsWithoutRef<'tfoot'>, 'className'> {}

export interface TableRowProps
  extends Omit<React.ComponentPropsWithoutRef<'tr'>, 'className'> {}

export interface TableHeadProps
  extends Omit<React.ComponentPropsWithoutRef<'th'>, 'className'> {}

export interface TableCellProps
  extends Omit<React.ComponentPropsWithoutRef<'td'>, 'className'> {}

export interface TableCaptionProps
  extends Omit<React.ComponentPropsWithoutRef<'caption'>, 'className'> {}
