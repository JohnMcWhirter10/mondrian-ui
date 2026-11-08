import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import {
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbPageProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps,
} from './Breadcrumb.types';
import './Breadcrumb.css';

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    { 'aria-label': ariaLabel = 'Breadcrumb', theme = 'neutral', ...props },
    ref
  ) => (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={`mondrian-breadcrumb mondrian-breadcrumb-${theme}`}
      {...props}
    />
  )
);

Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  (props, ref) => (
    <ol ref={ref} className="mondrian-breadcrumb-list" {...props} />
  )
);

BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  (props, ref) => (
    <li ref={ref} className="mondrian-breadcrumb-item" {...props} />
  )
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a';
    return <Comp ref={ref} className="mondrian-breadcrumb-link" {...props} />;
  }
);

BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  (props, ref) => (
    <span
      ref={ref}
      aria-current="page"
      className="mondrian-breadcrumb-page"
      {...props}
    />
  )
);

BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  BreadcrumbSeparatorProps
>((props, ref) => (
  <li
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className="mondrian-breadcrumb-separator"
    {...props}
  />
));

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
