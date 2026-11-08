'use client';

import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { ToggleButtonProps } from './ToggleButton.types';
import './ToggleButton.css';

/**
 * A two-state pressed button. Not the same as `Toggle`, which is a switch.
 */
export const ToggleButton = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleButtonProps
>(({ theme = 'blue', size = 'default', ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={[
      'mondrian-toggle-button',
      `mondrian-toggle-button-${theme}`,
      size !== 'default' ? `mondrian-toggle-button-${size}` : '',
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
));
ToggleButton.displayName = 'ToggleButton';
