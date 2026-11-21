import * as P from '@radix-ui/react-navigation-menu';
import { ComponentTheme } from '../../themes';

export type NavigationMenuTheme = ComponentTheme;

type NoClass<T> = Omit<T, 'className'>;

export type NavigationMenuProps = NoClass<P.NavigationMenuProps> & {
  /**
   * Plane colour of the active item and open trigger
   * @default "blue"
   */
  theme?: NavigationMenuTheme;
  /**
   * Render the shared viewport beneath the bar. Set false to place
   * `NavigationMenuViewport` yourself.
   * @default true
   */
  viewport?: boolean;
};
export type NavigationMenuListProps = NoClass<P.NavigationMenuListProps>;
export type NavigationMenuItemProps = NoClass<P.NavigationMenuItemProps>;
export type NavigationMenuTriggerProps = NoClass<P.NavigationMenuTriggerProps>;
export type NavigationMenuContentProps = NoClass<P.NavigationMenuContentProps>;
export type NavigationMenuLinkProps = NoClass<P.NavigationMenuLinkProps>;
export type NavigationMenuViewportProps =
  NoClass<P.NavigationMenuViewportProps>;
