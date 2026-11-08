import * as React from 'react';
import { IconProps } from './icon.types';
import { getIconA11y } from './iconA11y';

/**
 * Menu Icon - three horizontal bars of unequal length, rectangles only.
 */
export const Menu = React.forwardRef<SVGSVGElement, IconProps>(
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
        <rect x="3" y="4" width="18" height="3" />
        <rect x="3" y="10.5" width="12" height="3" />
        <rect x="3" y="17" width="16" height="3" />
      </svg>
    );
  }
);

Menu.displayName = 'Menu';
