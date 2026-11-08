import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { SeparatorProps } from './Separator.types';
import './Separator.css';

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      orientation = 'horizontal',
      decorative = true,
      theme = 'neutral',
      ...props
    },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      orientation={orientation}
      decorative={decorative}
      className={`mondrian-separator mondrian-separator-${orientation} mondrian-separator-${theme}`}
      {...props}
    />
  )
);

Separator.displayName = 'Separator';

export { Separator };
