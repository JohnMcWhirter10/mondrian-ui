import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { BoxProps } from './Box.types';
import './Box.css';

/**
 * A fundamental layout primitive for creating rectangular containers
 * that follow Mondrian's neoplasticism principles.
 */
const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      children,
      variant = 'blue',
      size = 'default',
      asChild = false,
      fullWidth = false,
      flex = false,
      noBorder = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'div';

    // Compose the class name based on variant, size, and other modifiers
    const boxClassName = [
      'mondrian-box',
      variant,
      size === 'sm' ? 'mondrian-box-sm' : '',
      size === 'md' ? 'mondrian-box-md' : '',
      size === 'lg' ? 'mondrian-box-lg' : '',
      size === 'xl' ? 'mondrian-box-xl' : '',
      fullWidth ? 'mondrian-box-full-width' : '',
      flex ? 'mondrian-box-flex' : '',
      noBorder ? 'mondrian-box-no-border' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Comp ref={ref} className={boxClassName} {...props}>
        {children}
      </Comp>
    );
  }
);

Box.displayName = 'Box';

export { Box };
