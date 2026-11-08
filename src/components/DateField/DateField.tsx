import * as React from 'react';
import { DateFieldProps } from './DateField.types';
import './DateField.css';

const DateField = React.forwardRef<HTMLInputElement, DateFieldProps>(
  ({ size = 'default', ...props }, ref) => {
    const dateFieldClassName = [
      'mondrian-date-field',
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
