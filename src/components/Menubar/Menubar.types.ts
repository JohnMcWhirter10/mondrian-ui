import * as P from '@radix-ui/react-menubar';
import { ComponentTheme } from '../../themes';

export type MenubarTheme = ComponentTheme;

type NoClass<T> = Omit<T, 'className'>;

export type MenubarProps = NoClass<P.MenubarProps> & {
  /**
   * Plane colour of open menus and the active trigger
   * @default "blue"
   */
  theme?: MenubarTheme;
};
export type MenubarMenuProps = P.MenubarMenuProps;
export type MenubarTriggerProps = NoClass<P.MenubarTriggerProps>;
export type MenubarContentProps = NoClass<P.MenubarContentProps> & {
  /** @default inherited from Menubar */
  theme?: MenubarTheme;
};
export type MenubarItemProps = NoClass<P.MenubarItemProps>;
export type MenubarCheckboxItemProps = NoClass<P.MenubarCheckboxItemProps>;
export type MenubarRadioGroupProps = NoClass<P.MenubarRadioGroupProps>;
export type MenubarRadioItemProps = NoClass<P.MenubarRadioItemProps>;
export type MenubarLabelProps = NoClass<P.MenubarLabelProps>;
export type MenubarSeparatorProps = NoClass<P.MenubarSeparatorProps>;
export type MenubarGroupProps = NoClass<P.MenubarGroupProps>;
export type MenubarSubProps = P.MenubarSubProps;
export type MenubarSubTriggerProps = NoClass<P.MenubarSubTriggerProps>;
export type MenubarSubContentProps = NoClass<P.MenubarSubContentProps> & {
  /** @default inherited from Menubar */
  theme?: MenubarTheme;
};
