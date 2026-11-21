import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Square } from '../icons';
import { ColorPickerColor, ColorPickerProps } from './ColorPicker.types';
import './ColorPicker.css';

const COLORS: readonly ColorPickerColor[] = [
  'red',
  'blue',
  'yellow',
  'black',
  'white',
];

const NAMES: Record<ColorPickerColor, string> = {
  red: 'Red',
  blue: 'Blue',
  yellow: 'Yellow',
  black: 'Black',
  white: 'White',
};

/**
 * ColorPicker is a single-select swatch grid of the five Neo-Plastic planes.
 * The `primary` colour takes the large cell. The value is the colour name.
 * Name the group with `aria-label` or `aria-labelledby`.
 */
const ColorPicker = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  ColorPickerProps
>(({ primary = 'red', ...props }, ref) => {
  const ordered = [primary, ...COLORS.filter((color) => color !== primary)];

  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className="mondrian-color-picker"
      {...props}
    >
      {ordered.map((color) => (
        <RadioGroupPrimitive.Item
          key={color}
          value={color}
          aria-label={NAMES[color]}
          className={[
            'mondrian-color-picker-item',
            `mondrian-color-picker-item-${color}`,
            color === primary ? 'mondrian-color-picker-item-primary' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <RadioGroupPrimitive.Indicator className="mondrian-color-picker-indicator">
            <Square />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  );
});

ColorPicker.displayName = 'ColorPicker';

export { ColorPicker };
