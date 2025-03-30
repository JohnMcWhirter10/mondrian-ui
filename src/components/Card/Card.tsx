import * as React from 'react';
import {
  CardProps,
  CardHeaderProps,
  CardFooterProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
} from './Card.types';
import './Card.css';

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, theme = 'blue', size = 'default', ...props }, ref) => {
    const cardClassName = [
      'mondrian-card',
      theme,
      size === 'sm' ? 'mondrian-card-sm' : '',
      size === 'lg' ? 'mondrian-card-lg' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={cardClassName} {...props}>
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} className="mondrian-card-header" {...props}>
      {children}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, ...props }, ref) => (
    <h3 ref={ref} className="mondrian-card-title" {...props}>
      {children}
    </h3>
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ children, ...props }, ref) => (
  <p ref={ref} className="mondrian-card-description" {...props}>
    {children}
  </p>
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} className="mondrian-card-content" {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} className="mondrian-card-footer" {...props}>
      {children}
    </div>
  )
);
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
