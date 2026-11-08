import * as React from 'react';
import { IconProps } from './icon.types';
import { getIconA11y } from './iconA11y';

/**
 * Mondrian Up Arrow Icon - follows Mondrian styling principles with rectangular shapes only
 * Uses three rectangles with the middle one shifted to indicate direction
 */
export const MondrianUpArrow = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', size = 24, title, ...props }, ref) => {
    const { svgProps, titleNode } = getIconA11y(title, props);
    return (
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
        {...svgProps}
      >
        {titleNode}
        <rect x="1" y="10" width="2" height="14" />
        <rect x="7" y="3" width="2" height="14" />
        <rect x="13" y="8" width="2" height="12" />
      </svg>
    );
  }
);

MondrianUpArrow.displayName = 'MondrianUpArrow';
