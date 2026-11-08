import * as React from 'react';
import { SkeletonProps } from './Skeleton.types';
import './Skeleton.css';

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ width = '100%', height = 16, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className="mondrian-skeleton"
        style={{ width, height, ...style }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };
