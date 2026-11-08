import * as React from 'react';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import { AspectRatioProps } from './AspectRatio.types';
import './AspectRatio.css';

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 1, theme = 'neutral', children, ...props }, ref) => (
    <div className={`mondrian-aspect-ratio mondrian-aspect-ratio-${theme}`}>
      <AspectRatioPrimitive.Root ref={ref} ratio={ratio} {...props}>
        {children}
      </AspectRatioPrimitive.Root>
    </div>
  )
);

AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
