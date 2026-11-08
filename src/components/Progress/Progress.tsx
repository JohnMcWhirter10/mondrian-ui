import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { ProgressProps } from './Progress.types';
import './Progress.css';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      value,
      max = 100,
      size = 'default',
      theme = 'blue',
      showValue = true,
      ...props
    },
    ref
  ) => {
    const progressClassName = [
      'mondrian-progress',
      `mondrian-progress-${theme}`,
      size === 'sm' ? 'mondrian-progress-sm' : '',
      size === 'lg' ? 'mondrian-progress-lg' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const isDeterminate =
      typeof value === 'number' && Number.isFinite(value) && max > 0;
    const percent = isDeterminate
      ? Math.min(100, Math.max(0, (value / max) * 100))
      : 0;

    return (
      <div className="mondrian-progress-wrap">
        <ProgressPrimitive.Root
          ref={ref}
          className={progressClassName}
          value={value}
          max={max}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className="mondrian-progress-indicator"
            style={
              isDeterminate
                ? { transform: `translateX(-${100 - percent}%)` }
                : undefined
            }
          />
        </ProgressPrimitive.Root>
        {isDeterminate && showValue ? (
          <span className="mondrian-progress-value" aria-hidden="true">
            {Math.round(percent)}%
          </span>
        ) : null}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };
