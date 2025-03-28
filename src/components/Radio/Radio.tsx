import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Square } from '../icons';
import { RadioGroupProps, RadioItemProps } from './Radio.types';
import './Radio.css';

/**
 * RadioGroup component for selecting a single option from a list of options
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
  (
    { theme = 'blue', size = 'default', orientation = 'vertical', ...props },
    ref
  ) => {
    // Compose class names
    const groupClassName = [
      'mondrian-radio-group',
      orientation === 'horizontal' ? 'mondrian-radio-group-horizontal' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <RadioGroupPrimitive.Root
        ref={ref}
        className={groupClassName}
        {...props}
      />
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

/**
 * RadioItem component for individual radio buttons
 */
const RadioItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioItemProps
>(({ theme = 'blue', size = 'default', ...props }, ref) => {
  // Compose class names for the root
  const rootClassName = [
    'mondrian-radio-item',
    theme,
    size === 'sm' ? 'mondrian-radio-item-sm' : '',
    size === 'lg' ? 'mondrian-radio-item-lg' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const indicatorClassName = 'mondrian-radio-indicator';

  return (
    <RadioGroupPrimitive.Item ref={ref} className={rootClassName} {...props}>
      <RadioGroupPrimitive.Indicator className={indicatorClassName}>
        <Square />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});

RadioItem.displayName = 'RadioItem';

export { RadioGroup, RadioItem };
