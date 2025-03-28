import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ComponentTheme } from '../../themes';

export type AccordionTheme = ComponentTheme;

export type AccordionProps = Omit<
  | AccordionPrimitive.AccordionSingleProps
  | AccordionPrimitive.AccordionMultipleProps,
  'className'
> & {
  /**
   * Determines the accordion's visual style
   * @default "blue"
   */
  theme?: AccordionTheme;

  /**
   * Determines the accordion's size
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';

  /**
   * When type is "single", determines whether the open item can be closed by clicking it.
   * This allows all accordion items to be closed at the same time.
   * @default true
   */
  collapsible?: boolean;
};

export type AccordionItemProps = Omit<
  AccordionPrimitive.AccordionItemProps,
  'className'
>;

export type AccordionTriggerProps = Omit<
  AccordionPrimitive.AccordionTriggerProps,
  'className'
>;

export type AccordionContentProps = Omit<
  AccordionPrimitive.AccordionContentProps,
  'className'
>;

export type AccordionHeaderProps = Omit<
  AccordionPrimitive.AccordionHeaderProps,
  'className'
>;
