import * as React from 'react';
import type { PlaneTheme } from '../../themes/Theme.types';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'div'
  | 'span'
  | 'p';

export type TextElement =
  | 'p'
  | 'span'
  | 'div'
  | 'label'
  | 'strong'
  | 'em'
  | 'small';

export type TextSize = 'tiny' | 'small' | 'medium' | 'large';

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'className'> {
  /**
   * The scale step. Also the element (h1-h6) unless `as` is set.
   * @default 2
   */
  level?: HeadingLevel;

  /**
   * Element to render, keeping visual level apart from the document outline.
   */
  as?: HeadingElement;

  /**
   * Color of the heavy accent bar above the heading. The text itself is
   * always black (white in dark mode). Neutral draws a black bar.
   * @default "neutral"
   */
  theme?: PlaneTheme;
}

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'className'> {
  /**
   * Element to render.
   * @default "p"
   */
  as?: TextElement;

  /**
   * Size from the theme type scale.
   * @default "small"
   */
  size?: TextSize;
}
