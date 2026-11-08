import * as React from 'react';
import { IconProps } from './icon.types';
import { getIconA11y } from './iconA11y';

/**
 * Mondrian Right Arrow Icon - follows Mondrian styling principles with rectangular shapes only
 * Uses three rectangles with the middle one shifted to indicate direction
 */
export const MondrianRightArrow = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', size = 24, title, ...props }, ref) => {
    const { svgProps, titleNode } = getIconA11y(title, props);
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 16"
        fill="currentColor"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="square"
        strokeLinejoin="miter"
        {...svgProps}
      >
        {titleNode}
        <rect x="0" y="1" width="14" height="2" />
        <rect x="7" y="7" width="14" height="2" />
        <rect x="4" y="13" width="12" height="2" />
      </svg>
    );
  }
);

MondrianRightArrow.displayName = 'MondrianRightArrow';
