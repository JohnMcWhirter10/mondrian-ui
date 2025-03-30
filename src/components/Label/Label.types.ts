import * as React from 'react';
import { ComponentTheme } from '../../themes';

export type LabelProps = Omit<
  React.ComponentPropsWithRef<'label'>,
  'className'
> & {
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
   * When true, the component renders its children directly with props forwarded
   * @default false
   */
  asChild?: boolean;
};
