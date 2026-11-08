'use client';

import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import {
  ButtonGroupItemProps,
  ButtonGroupProps,
  ButtonGroupSize,
} from './ButtonGroup.types';
import './ButtonGroup.css';

const SizeContext = React.createContext<ButtonGroupSize>('default');

export const ButtonGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ButtonGroupProps
>(({ size = 'default', ...props }, ref) => (
  <SizeContext.Provider value={size}>
    <ToggleGroupPrimitive.Root
      ref={ref}
      className="mondrian-button-group"
      {...props}
    />
  </SizeContext.Provider>
));
ButtonGroup.displayName = 'ButtonGroup';

export const ButtonGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ButtonGroupItemProps
>((props, ref) => {
  const size = React.useContext(SizeContext);
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={[
        'mondrian-button-group-item',
        size !== 'default' ? `mondrian-button-group-item-${size}` : '',
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
});
ButtonGroupItem.displayName = 'ButtonGroupItem';
