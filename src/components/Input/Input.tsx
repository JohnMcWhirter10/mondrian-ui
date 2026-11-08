import * as React from 'react';
import { InputTheme } from './Input.types';
import './Input.css';

const Input = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'size'> & {
    /**
     * The plane color of the swatch on the bottom bar. The field stays white
     * (black in dark mode) inside a black grid.
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
    `mondrian-input-${theme}`,
    size === 'sm' ? 'mondrian-input-sm' : '',
    size === 'lg' ? 'mondrian-input-lg' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return <input ref={ref} {...props} className={inputClassName} />;
});

Input.displayName = 'Input';

export { Input };
