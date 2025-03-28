import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckboxTheme } from './Checkbox.types';
import { Check } from '../icons';
import './Checkbox.css';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    'className'
  > & {
    /**
     * The theme color for the checkbox
     * @default "blue"
     */
    theme?: CheckboxTheme;

    /**
     * The size of the checkbox
     * @default "default"
     */
    size?: 'default' | 'sm' | 'lg';
  }
>(({ theme = 'blue', size = 'default', ...props }, ref) => {
  // Compose class names
  const rootClassName = [
    'mondrian-checkbox-root',
    theme,
    size === 'sm' ? 'mondrian-checkbox-sm' : '',
    size === 'lg' ? 'mondrian-checkbox-lg' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const indicatorClassName = 'mondrian-checkbox-indicator';

  return (
    <CheckboxPrimitive.Root ref={ref} className={rootClassName} {...props}>
      <CheckboxPrimitive.Indicator className={indicatorClassName}>
        <Check />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };
