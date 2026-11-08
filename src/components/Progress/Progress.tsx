import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { ProgressProps } from './Progress.types';
import './Progress.css';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ value, max = 100, size = 'default', ...props }, ref) => {
  const progressClassName = [
    'mondrian-progress',
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
  );
});

Progress.displayName = 'Progress';

export { Progress };
