import * as React from 'react';
import { IconProps } from './icon.types';

/**
 * Mondrian Down Arrow Icon - follows Mondrian styling principles with rectangular shapes only
 * Uses three rectangles with the middle one shifted to indicate direction
 */
export const MondrianDownArrow = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', size = 24, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 24"
      fill="currentColor"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="square"
      strokeLinejoin="miter"
      {...props}
    >
      <rect x="1" y="0" width="2" height="14" />
      <rect x="7" y="7" width="2" height="14" />
      <rect x="13" y="4" width="2" height="12" />
    </svg>
  )
);

MondrianDownArrow.displayName = 'MondrianDownArrow';
