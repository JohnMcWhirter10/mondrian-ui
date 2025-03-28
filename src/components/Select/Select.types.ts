import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ComponentTheme } from '../../themes';

export type SelectTheme = ComponentTheme;

export type SelectProps = Omit<SelectPrimitive.SelectProps, 'className'> & {
  /**
   * Determines the select's visual style
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
