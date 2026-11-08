import * as React from 'react';

export interface BreadcrumbProps
  extends Omit<React.ComponentPropsWithoutRef<'nav'>, 'className'> {}

export interface BreadcrumbListProps
  extends Omit<React.ComponentPropsWithoutRef<'ol'>, 'className'> {}

export interface BreadcrumbItemProps
  extends Omit<React.ComponentPropsWithoutRef<'li'>, 'className'> {}

export interface BreadcrumbLinkProps
  extends Omit<React.ComponentPropsWithoutRef<'a'>, 'className'> {
  /**
   * Render the child element as the link instead of an anchor,
   * so a router link can be passed in.
   * @default false
   */
  asChild?: boolean;
}

export interface BreadcrumbPageProps
  extends Omit<React.ComponentPropsWithoutRef<'span'>, 'className'> {}

export interface BreadcrumbSeparatorProps
  extends Omit<React.ComponentPropsWithoutRef<'li'>, 'className'> {}
