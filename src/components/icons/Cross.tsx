import * as React from 'react';
import { IconProps } from './icon.types';

/**
 * Cross (X) Icon - follows Mondrian styling principles
 */
export const Cross = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', size = 24, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 6L18 18M6 18L18 6"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  )
);

Cross.displayName = 'Cross';
