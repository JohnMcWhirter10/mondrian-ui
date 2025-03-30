import * as React from 'react';
import { ComponentTheme } from '../../themes';

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  /**
   * The theme color for the alert
   * @default "blue"
   *
   * Values: 'blue', 'neutral', 'red', 'green', 'yellow'
   */
  theme?: ComponentTheme;

  /**
   * The size of the alert
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';
}

export interface AlertTitleProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'className'> {}

export interface AlertDescriptionProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'className'> {}
