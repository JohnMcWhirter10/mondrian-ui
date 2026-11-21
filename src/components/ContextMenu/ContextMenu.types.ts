import * as P from '@radix-ui/react-context-menu';
import { ComponentTheme } from '../../themes';

export type ContextMenuTheme = ComponentTheme;

export type ContextMenuProps = P.ContextMenuProps & {
  /**
   * Plane colour of the menu swatch and highlighted row
   * @default "blue"
   */
  theme?: ContextMenuTheme;
};

type NoClass<T> = Omit<T, 'className'>;

export type ContextMenuTriggerProps = P.ContextMenuTriggerProps;
export type ContextMenuContentProps = NoClass<P.ContextMenuContentProps> & {
  /** @default inherited from ContextMenu */
  theme?: ContextMenuTheme;
};
export type ContextMenuItemProps = NoClass<P.ContextMenuItemProps>;
export type ContextMenuCheckboxItemProps =
  NoClass<P.ContextMenuCheckboxItemProps>;
export type ContextMenuRadioGroupProps = NoClass<P.ContextMenuRadioGroupProps>;
export type ContextMenuRadioItemProps = NoClass<P.ContextMenuRadioItemProps>;
export type ContextMenuLabelProps = NoClass<P.ContextMenuLabelProps>;
export type ContextMenuSeparatorProps = NoClass<P.ContextMenuSeparatorProps>;
export type ContextMenuGroupProps = NoClass<P.ContextMenuGroupProps>;
export type ContextMenuSubProps = P.ContextMenuSubProps;
export type ContextMenuSubTriggerProps = NoClass<P.ContextMenuSubTriggerProps>;
export type ContextMenuSubContentProps =
  NoClass<P.ContextMenuSubContentProps> & {
    /** @default inherited from ContextMenu */
    theme?: ContextMenuTheme;
  };
