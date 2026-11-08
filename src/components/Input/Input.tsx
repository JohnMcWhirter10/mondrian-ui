import * as React from 'react';
import { InputProps } from './Input.types';
import './Input.css';

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ theme = 'blue', size = 'default', ...props }, ref) => {
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
