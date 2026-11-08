import * as React from 'react';
import { LoaderProps } from './Loader.types';
import './Loader.css';

const Loader = React.forwardRef<HTMLSpanElement, LoaderProps>(
  ({ label = 'Loading', size = 'default', ...props }, ref) => {
    const loaderClassName = [
      'mondrian-loader',
      size === 'sm' ? 'mondrian-loader-sm' : '',
      size === 'lg' ? 'mondrian-loader-lg' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        className={loaderClassName}
        {...props}
      >
        <span
          className="mondrian-loader-block mondrian-loader-block-narrow"
          aria-hidden="true"
        />
        <span
          className="mondrian-loader-block mondrian-loader-block-medium"
          aria-hidden="true"
        />
        <span
          className="mondrian-loader-block mondrian-loader-block-wide"
          aria-hidden="true"
        />
        <span className="mondrian-loader-mover" aria-hidden="true" />
      </span>
    );
  }
);

Loader.displayName = 'Loader';

export { Loader };
