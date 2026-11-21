import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

/** The Neo-Plastic planes. These are the only choices. */
export type ColorPickerColor = 'red' | 'blue' | 'yellow' | 'black' | 'white';

export type ColorPickerProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
  'className' | 'orientation' | 'children'
> & {
  /**
   * The colour that gets the large cell.
   * @default "red"
   */
  primary?: ColorPickerColor;
};
