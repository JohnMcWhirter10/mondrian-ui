import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { ButtonTheme } from './Button.types';
import './Button.css';

const Button = React.forwardRef<
  HTMLButtonElement,
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
    /**
     * Determines the button's visual style
     * @default "blue"
     *
     * Values: 'blue', 'neutral', 'red', 'green', 'yellow'
     */
    theme?: ButtonTheme;

    /**
     * Determines the button's size
     * @default "default"
     */
    size?: 'default' | 'sm' | 'lg';

    /**
     * When true, the component renders its children directly with props forwarded.
     * @default false
     */
    asChild?: boolean;
  }
>(
  (
    { children, theme = 'blue', size = 'default', asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    // Compose the class name based on theme and size
    const buttonClassName = [
      'mondrian-button',
      theme,
      size === 'sm' ? 'mondrian-button-sm' : '',
      size === 'lg' ? 'mondrian-button-lg' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Comp ref={ref} className={buttonClassName} {...props}>
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button };
