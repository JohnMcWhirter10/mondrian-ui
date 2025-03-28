import * as React from 'react';
import { InputTheme } from './Input.types';
import './Input.css';

const Input = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'size'> & {
    /**
     * The theme color for the input
     * @default "blue"
     */
    theme?: InputTheme;

    /**
     * The size of the input
     * @default "default"
     */
    size?: 'default' | 'sm' | 'lg';
  }
>(({ theme = 'blue', size = 'default', ...props }, ref) => {
  // Compose class names
  const inputClassName = [
    'mondrian-input',
    theme,
    size === 'sm' ? 'mondrian-input-sm' : '',
    size === 'lg' ? 'mondrian-input-lg' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return <input ref={ref} className={inputClassName} {...props} />;
});

Input.displayName = 'Input';

export { Input };
