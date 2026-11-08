import * as React from 'react';
import { IconProps } from './icon.types';
import { getIconA11y } from './iconA11y';

/**
 * Cross Icon - rectangles only, no diagonals or curves, in keeping with
 * Mondrian's neoplastic grid. Two stepped diagonals made of squares.
 */
export const Cross = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', size = 24, title, ...props }, ref) => {
    const { svgProps, titleNode } = getIconA11y(title, props);
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        {...svgProps}
      >
        {titleNode}
        <rect x="4" y="4" width="4" height="4" />
        <rect x="16" y="4" width="4" height="4" />
        <rect x="10" y="10" width="4" height="4" />
        <rect x="4" y="16" width="4" height="4" />
        <rect x="16" y="16" width="4" height="4" />
      </svg>
    );
  }
);

Cross.displayName = 'Cross';
