import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { SliderProps } from './Slider.types';
import './Slider.css';

/**
 * Slider picks a value in a range. One thumb per value: pass a one-item
 * `defaultValue` or `value` for a single thumb, two items for a range.
 * Give each thumb a name with `aria-label` (single) or label it from outside.
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ theme = 'red', defaultValue, value, min = 0, ...props }, ref) => {
  const thumbs = (value ?? defaultValue ?? [min]).length;

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={`mondrian-slider mondrian-slider-${theme}`}
      defaultValue={defaultValue}
      value={value}
      min={min}
      {...props}
    >
      <SliderPrimitive.Track className="mondrian-slider-track">
        <SliderPrimitive.Range className="mondrian-slider-range" />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbs }, (_, index) => (
        <SliderPrimitive.Thumb key={index} className="mondrian-slider-thumb" />
      ))}
    </SliderPrimitive.Root>
  );
});

Slider.displayName = 'Slider';

export { Slider };
