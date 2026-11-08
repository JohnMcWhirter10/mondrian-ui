import * as React from 'react';
import { ComponentTheme } from '../../themes';

export type AlertTheme = ComponentTheme;

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  /**
   * The theme color for the alert
   * @default "blue"
   *
   * Values: 'blue', 'neutral', 'red', 'green', 'yellow'
   */
  theme?: AlertTheme;

  /**
   * The size of the alert
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';

  /**
   * Visible severity label. Defaults per theme: blue "Information",
   * yellow "Warning", red "Error", green "Success", neutral "Note".
   * Red and yellow render role="alert"; the others role="status".
   * Override the label for other languages.
   */
  label?: string;
}

export interface AlertTitleProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'className'> {}

export interface AlertDescriptionProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'className'> {}
