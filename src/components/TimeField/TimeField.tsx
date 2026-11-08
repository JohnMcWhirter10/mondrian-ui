import * as React from 'react';
import { TimeFieldProps } from './TimeField.types';
import '../Input/Input.css';
import './TimeField.css';

const TimeField = React.forwardRef<HTMLInputElement, TimeFieldProps>(
  ({ theme = 'blue', size = 'default', ...props }, ref) => {
    const timeFieldClassName = [
      'mondrian-time-field',
      `mondrian-time-field-${theme}`,
      size === 'sm' ? 'mondrian-time-field-sm' : '',
      size === 'lg' ? 'mondrian-time-field-lg' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <input ref={ref} {...props} type="time" className={timeFieldClassName} />
    );
  }
);

TimeField.displayName = 'TimeField';

export { TimeField };
