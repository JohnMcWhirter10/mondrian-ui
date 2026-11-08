import * as React from 'react';
import { IconProps } from './icon.types';
import { getIconA11y } from './iconA11y';

/**
 * Square Alert Icon - follows Mondrian styling principles with rectangular shapes only
 */
export const SquareAlert = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', size = 24, title, ...props }, ref) => {
    const { svgProps, titleNode } = getIconA11y(title, props);
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        {...svgProps}
      >
        {titleNode}
        {/* Square container with slightly asymmetric dimensions - Mondrian style */}
        <rect x="3" y="3" width="18" height="18" />

        {/* Vertical exclamation line */}
        <path d="M12 8v5" />

        {/* Exclamation point */}
        <rect x="11" y="16" width="2" height="2" />
      </svg>
    );
  }
);

SquareAlert.displayName = 'SquareAlert';
