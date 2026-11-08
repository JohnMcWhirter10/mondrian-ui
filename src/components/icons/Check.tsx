import * as React from 'react';
import { IconProps } from './icon.types';
import { getIconA11y } from './iconA11y';

/**
 * Check Icon - rectangles only, no diagonals or curves, in keeping with
 * Mondrian's neoplastic grid. A short vertical stroke stepping into a long horizontal bar.
 */
export const Check = React.forwardRef<SVGSVGElement, IconProps>(
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
        <rect x="3" y="12" width="4" height="4" />
        <rect x="7" y="16" width="4" height="4" />
        <rect x="11" y="12" width="4" height="4" />
        <rect x="15" y="8" width="4" height="4" />
        <rect x="19" y="4" width="2" height="4" />
      </svg>
    );
  }
);

Check.displayName = 'Check';
