import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { ToggleTheme } from './Toggle.types';
import './Toggle.css';

const Toggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  Omit<
    React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    'className'
  > & {
    /**
     * The theme color for the toggle
     * @default "blue"
     */
    theme?: ToggleTheme;

    /**
     * The size of the toggle
     * @default "default"
     */
    size?: 'default' | 'sm' | 'lg';
  }
>(({ theme = 'blue', size = 'default', ...props }, ref) => {
  // Compose class names
  const trackClassName = [
    'mondrian-toggle-track',
    theme,
    size === 'sm' ? 'mondrian-toggle-sm' : '',
    size === 'lg' ? 'mondrian-toggle-lg' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <SwitchPrimitive.Root ref={ref} className={trackClassName} {...props}>
      <SwitchPrimitive.Thumb className="mondrian-toggle-thumb" />
    </SwitchPrimitive.Root>
  );
});

Toggle.displayName = 'Toggle';

export { Toggle };
