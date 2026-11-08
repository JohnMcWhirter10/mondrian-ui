import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { SeparatorProps } from './Separator.types';
import './Separator.css';

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = 'horizontal', decorative = true, ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      orientation={orientation}
      decorative={decorative}
      className={`mondrian-separator mondrian-separator-${orientation}`}
      {...props}
    />
  )
);

Separator.displayName = 'Separator';

export { Separator };
