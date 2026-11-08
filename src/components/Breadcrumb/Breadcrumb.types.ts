import * as React from 'react';
import type { PlaneTheme } from '../../themes/Theme.types';

export interface BreadcrumbProps
  extends Omit<React.ComponentPropsWithoutRef<'nav'>, 'className'> {
  /**
   * Color of the small swatch pinned to the current page. The heavy black bar
   * stays under the page, so the current page never relies on color alone.
   * @default "neutral"
   */
  theme?: PlaneTheme;
}

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
