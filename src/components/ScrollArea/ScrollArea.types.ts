import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { ComponentTheme } from '../../themes';

export type ScrollAreaTheme = ComponentTheme;

export interface ScrollAreaProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>,
    'className'
  > {
  /**
   * The theme color for the scrollbar thumb
   * @default "blue"
   */
  theme?: ScrollAreaTheme;

  /**
   * The height of the scroll area
   */
  height?: React.CSSProperties['height'];

  /**
   * The width of the scroll area
   */
  width?: React.CSSProperties['width'];
}

export interface ScrollBarProps
  extends Omit<
    React.ComponentPropsWithoutRef<
      typeof ScrollAreaPrimitive.ScrollAreaScrollbar
    >,
    'className'
  > {
  /**
   * The theme color for the scrollbar thumb
   * @default "blue"
   */
  theme?: ScrollAreaTheme;
}
