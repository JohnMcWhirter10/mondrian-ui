import * as React from 'react';
import { BadgeProps } from './Badge.types';
import './Badge.css';

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, theme = 'blue', size = 'default', ...props }, ref) => {
    const badgeClassName = [
      'mondrian-badge',
      `mondrian-badge-${theme}`,
      size === 'sm' ? 'mondrian-badge-sm' : '',
      size === 'lg' ? 'mondrian-badge-lg' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={badgeClassName} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
