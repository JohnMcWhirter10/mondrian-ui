import * as SelectPrimitive from '@radix-ui/react-select';
import { ComponentTheme } from '../../themes';

export type SelectTheme = ComponentTheme;

export type SelectProps = Omit<SelectPrimitive.SelectProps, 'className'> & {
  /**
   * The plane color of the swatch on the trigger and of the highlighted item.
   * Pass it to SelectTrigger and SelectContent (the Radix root renders no
   * element, so it cannot carry the theme to them).
   * @default "blue"
   */
  theme?: SelectTheme;

  /**
   * Determines the select's size
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';
};

export type SelectTriggerProps = Omit<
  SelectPrimitive.SelectTriggerProps,
  'className'
>;

export type SelectContentProps = Omit<
  SelectPrimitive.SelectContentProps,
  'className'
>;

export type SelectItemProps = Omit<
  SelectPrimitive.SelectItemProps,
  'className'
>;

export type SelectLabelProps = Omit<
  SelectPrimitive.SelectLabelProps,
  'className'
>;

export type SelectSeparatorProps = Omit<
  SelectPrimitive.SelectSeparatorProps,
  'className'
>;

export type SelectGroupProps = Omit<
  SelectPrimitive.SelectGroupProps,
  'className'
>;

export type SelectValueProps = Omit<
  SelectPrimitive.SelectValueProps,
  'className'
>;
