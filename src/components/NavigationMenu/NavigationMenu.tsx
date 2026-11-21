import * as React from 'react';
import * as P from '@radix-ui/react-navigation-menu';
import { MondrianDownArrow } from '../icons';
import type {
  NavigationMenuProps,
  NavigationMenuListProps,
  NavigationMenuItemProps,
  NavigationMenuTriggerProps,
  NavigationMenuContentProps,
  NavigationMenuLinkProps,
  NavigationMenuViewportProps,
} from './NavigationMenu.types';
import './NavigationMenu.css';

/**
 * Root renders the viewport by default, so content panels open beneath the
 * bar. Pass `viewport={false}` to place `NavigationMenuViewport` yourself.
 */
const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof P.Root>,
  NavigationMenuProps
>(({ children, theme = 'blue', viewport = true, ...props }, ref) => (
  <P.Root
    className={['mondrian-navigation-menu', theme].join(' ')}
    ref={ref}
    {...props}
  >
    {children}
    {viewport && <NavigationMenuViewport />}
  </P.Root>
));
NavigationMenu.displayName = 'NavigationMenu';

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof P.List>,
  NavigationMenuListProps
>((props, ref) => (
  <P.List className="mondrian-navigation-menu-list" ref={ref} {...props} />
));
NavigationMenuList.displayName = 'NavigationMenuList';

const NavigationMenuItem = React.forwardRef<
  React.ElementRef<typeof P.Item>,
  NavigationMenuItemProps
>((props, ref) => (
  <P.Item className="mondrian-navigation-menu-item" ref={ref} {...props} />
));
NavigationMenuItem.displayName = 'NavigationMenuItem';

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof P.Trigger>,
  NavigationMenuTriggerProps
>(({ children, ...props }, ref) => (
  <P.Trigger className="mondrian-navigation-menu-trigger" ref={ref} {...props}>
    {children}
    <span className="mondrian-navigation-menu-caret" aria-hidden="true">
      <MondrianDownArrow />
    </span>
  </P.Trigger>
));
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof P.Content>,
  NavigationMenuContentProps
>((props, ref) => (
  <P.Content
    className="mondrian-navigation-menu-content"
    ref={ref}
    {...props}
  />
));
NavigationMenuContent.displayName = 'NavigationMenuContent';

const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof P.Link>,
  NavigationMenuLinkProps
>((props, ref) => (
  <P.Link className="mondrian-navigation-menu-link" ref={ref} {...props} />
));
NavigationMenuLink.displayName = 'NavigationMenuLink';

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof P.Viewport>,
  NavigationMenuViewportProps
>((props, ref) => (
  <div className="mondrian-navigation-menu-viewport-position">
    <P.Viewport
      className="mondrian-navigation-menu-viewport"
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = 'NavigationMenuViewport';

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
};
