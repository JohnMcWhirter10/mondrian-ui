import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import { LabelProps } from './Label.types';
import './Label.css';

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    { children, theme = 'blue', size = 'default', asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : LabelPrimitive.Root;

    // Compose the class name based on theme and size
    const labelClassName = [
      'mondrian-label',
      `mondrian-label-${theme}`,
      size === 'sm' ? 'mondrian-label-sm' : '',
      size === 'lg' ? 'mondrian-label-lg' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Comp ref={ref} className={labelClassName} {...props}>
        {children}
      </Comp>
    );
  }
);

Label.displayName = 'Label';

export { Label };
