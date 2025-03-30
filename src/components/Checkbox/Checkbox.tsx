import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckboxProps } from './Checkbox.types';
import { Dash } from '../icons';
import './Checkbox.css';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ theme = 'blue', size = 'default', ...props }, ref) => {
  // Compose class names
  const rootClassName = [
    'mondrian-checkbox-root',
    `mondrian-checkbox-${theme}`,
    size === 'sm' ? 'mondrian-checkbox-sm' : '',
    size === 'lg' ? 'mondrian-checkbox-lg' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const indicatorClassName = 'mondrian-checkbox-indicator';

  return (
    <CheckboxPrimitive.Root ref={ref} className={rootClassName} {...props}>
      <CheckboxPrimitive.Indicator className={indicatorClassName}>
        <Dash />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };
