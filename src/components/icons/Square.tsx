import * as React from 'react';
import { IconProps } from './icon.types';
import { getIconA11y } from './iconA11y';

export const Square: React.FC<IconProps> = ({ size = 16, title, ...props }) => {
  const { svgProps, titleNode } = getIconA11y(title, props);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      {titleNode}
      <rect
        x="2"
        y="2"
        width="12"
        height="12"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
};

Square.displayName = 'SquareIcon';
