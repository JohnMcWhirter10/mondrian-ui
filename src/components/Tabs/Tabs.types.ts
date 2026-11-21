import * as TabsPrimitive from '@radix-ui/react-tabs';
import { ComponentTheme } from '../../themes';

export type TabsTheme = ComponentTheme;

export type TabsProps = Omit<TabsPrimitive.TabsProps, 'className'> & {
  /**
   * Colour of the active tab
   * @default "yellow"
   */
  theme?: TabsTheme;
};

export type TabsListProps = Omit<TabsPrimitive.TabsListProps, 'className'>;
export type TabsTriggerProps = Omit<
  TabsPrimitive.TabsTriggerProps,
  'className'
>;
export type TabsContentProps = Omit<
  TabsPrimitive.TabsContentProps,
  'className'
>;
