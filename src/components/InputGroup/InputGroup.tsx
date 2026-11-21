import * as React from 'react';
import {
  InputGroupInputProps,
  InputGroupProps,
  InputGroupSlotProps,
} from './InputGroup.types';
import './InputGroup.css';

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ theme = 'neutral', size = 'default', ...props }, ref) => {
    const className = [
      'mondrian-input-group',
      `mondrian-input-group-${theme}`,
      size === 'sm' ? 'mondrian-input-group-sm' : '',
      size === 'lg' ? 'mondrian-input-group-lg' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return <div ref={ref} {...props} className={className} />;
  }
);

InputGroup.displayName = 'InputGroup';

const InputGroupSlot = React.forwardRef<HTMLDivElement, InputGroupSlotProps>(
  ({ side = 'start', ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={`mondrian-input-group-slot mondrian-input-group-slot-${side}`}
    />
  )
);

InputGroupSlot.displayName = 'InputGroupSlot';

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  InputGroupInputProps
>(({ id, ...props }, ref) => (
  <input ref={ref} {...props} id={id} className="mondrian-input-group-input" />
));

InputGroupInput.displayName = 'InputGroupInput';

export { InputGroup, InputGroupSlot, InputGroupInput };
