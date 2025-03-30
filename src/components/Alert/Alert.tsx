import * as React from 'react';
import {
  AlertProps,
  AlertTitleProps,
  AlertDescriptionProps,
} from './Alert.types';
import './Alert.css';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ children, theme = 'blue', size = 'default', ...props }, ref) => {
    const alertClassName = [
      'mondrian-alert',
      `mondrian-alert-${theme}`,
      size === 'sm' ? 'mondrian-alert-sm' : '',
      size === 'lg' ? 'mondrian-alert-lg' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={alertClassName} role="alert" {...props}>
        {children}
      </div>
    );
  }
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ children, ...props }, ref) => (
    <h5 ref={ref} className="mondrian-alert-title" {...props}>
      {children}
    </h5>
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDescriptionProps
>(({ children, ...props }, ref) => (
  <div ref={ref} className="mondrian-alert-description" {...props}>
    {children}
  </div>
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
