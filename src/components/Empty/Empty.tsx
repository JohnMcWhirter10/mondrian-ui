import * as React from 'react';
import {
  EmptyActionsProps,
  EmptyDescriptionProps,
  EmptyProps,
  EmptyTitleProps,
} from './Empty.types';
import './Empty.css';

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ children, theme = 'blue', ...props }, ref) => (
    <div
      ref={ref}
      className={`mondrian-empty mondrian-empty-${theme}`}
      {...props}
    >
      {children}
    </div>
  )
);
Empty.displayName = 'Empty';

const EmptyTitle = React.forwardRef<HTMLHeadingElement, EmptyTitleProps>(
  ({ children, ...props }, ref) => (
    <h3 ref={ref} className="mondrian-empty-title" {...props}>
      {children}
    </h3>
  )
);
EmptyTitle.displayName = 'EmptyTitle';

const EmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  EmptyDescriptionProps
>(({ children, ...props }, ref) => (
  <p ref={ref} className="mondrian-empty-description" {...props}>
    {children}
  </p>
));
EmptyDescription.displayName = 'EmptyDescription';

const EmptyActions = React.forwardRef<HTMLDivElement, EmptyActionsProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} className="mondrian-empty-actions" {...props}>
      {children}
    </div>
  )
);
EmptyActions.displayName = 'EmptyActions';

export { Empty, EmptyTitle, EmptyDescription, EmptyActions };
