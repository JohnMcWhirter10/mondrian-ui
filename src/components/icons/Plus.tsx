import * as React from 'react';
import { IconProps } from './icon.types';
import { getIconA11y } from './iconA11y';

/**
 * Plus Icon - follows Mondrian styling principles with rectangular shapes only
 * Uses asymmetric rectangles forming a plus-like shape for success indication
 */
export const Plus = React.forwardRef<SVGSVGElement, IconProps>(
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
        <rect x="5" y="10" width="14" height="3" />
        <rect x="9" y="4" width="3" height="7" />
        <rect x="12" y="13" width="3" height="7" />
      </svg>
    );
  }
);

Plus.displayName = 'Plus';
