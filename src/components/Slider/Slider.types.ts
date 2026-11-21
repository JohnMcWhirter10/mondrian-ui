import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { ComponentTheme } from '../../themes';

export type SliderTheme = ComponentTheme;

export type SliderProps = Omit<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  'className'
> & {
  /**
   * The plane colour of the filled range.
   * @default "red"
   */
  theme?: SliderTheme;
};
