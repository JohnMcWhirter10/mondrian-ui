import * as React from 'react';
import { ComponentTheme } from '../../themes';

// Export just the component props type for documentation
export type LabelProps = React.ComponentPropsWithoutRef<'label'> & {
  /**
   * The content to display within the label
   */
  children: React.ReactNode;

  /**
   * The theme color for the label
   * @default "blue"
   */
  theme?: ComponentTheme;

  /**
   * The size of the label
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';

  /**
   * Additional class name to apply to the label
   */
  className?: string;

  /**
   * The position styling for the label
   * @default "left"
   */
  position?: 'left' | 'right' | 'top' | 'bottom' | 'floating';
};
