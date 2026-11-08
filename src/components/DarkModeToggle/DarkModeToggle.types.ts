import * as React from 'react';
import type { ToggleProps } from '../Toggle/Toggle.types';

export type DarkModeToggleProps = Omit<
  ToggleProps,
  'checked' | 'defaultChecked' | 'onCheckedChange' | 'children'
> & {
  /**
   * The visible text beside the switch, such as "Dark mode".
   */
  children: React.ReactNode;
};
