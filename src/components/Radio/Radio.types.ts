import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { ComponentTheme } from '../../themes';

// Reuse the common theme type
export type RadioTheme = ComponentTheme;

// Radio Group types
export type RadioGroupProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
  'className'
> & {
  /**
   * The theme color for the radio group
   * @default "blue"
   */
  theme?: RadioTheme;

  /**
   * The size of the radio buttons
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';

  /**
   * The orientation of the radio group
   * @default "vertical"
   */
  orientation?: 'horizontal' | 'vertical';
};

// Radio Item types
export type RadioItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
  'className'
> & {
  /**
   * The theme color for the radio button
   * @default "blue"
   */
  theme?: RadioTheme;

  /**
   * The size of the radio button
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';
};

// Radio Indicator types
export type RadioIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Indicator>,
  'className'
>;
