import * as React from 'react';
import { DateFieldProps } from './DateField.types';
import '../Input/Input.css';
import './DateField.css';

const DateField = React.forwardRef<HTMLInputElement, DateFieldProps>(
  ({ theme = 'blue', size = 'default', ...props }, ref) => {
    const dateFieldClassName = [
      'mondrian-date-field',
      `mondrian-date-field-${theme}`,
      size === 'sm' ? 'mondrian-date-field-sm' : '',
      size === 'lg' ? 'mondrian-date-field-lg' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <input ref={ref} {...props} type="date" className={dateFieldClassName} />
    );
  }
);

DateField.displayName = 'DateField';

export { DateField };
