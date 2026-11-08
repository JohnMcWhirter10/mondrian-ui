import * as React from 'react';
import { KbdProps } from './Kbd.types';
import './Kbd.css';

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ children, theme = 'neutral', ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={`mondrian-kbd mondrian-kbd-${theme}`}
        {...props}
      >
        {children}
      </kbd>
    );
  }
);

Kbd.displayName = 'Kbd';

export { Kbd };
