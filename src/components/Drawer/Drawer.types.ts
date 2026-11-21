/**
 * Drawer Component Types
 */

import type { DialogContentProps } from '../Dialog/Dialog.types';

export type DrawerSide = 'left' | 'right';

export type {
  DialogProps as DrawerProps,
  DialogTriggerProps as DrawerTriggerProps,
  DialogCloseProps as DrawerCloseProps,
  DialogTitleProps as DrawerTitleProps,
  DialogDescriptionProps as DrawerDescriptionProps,
  DialogHeaderProps as DrawerHeaderProps,
  DialogFooterProps as DrawerFooterProps,
} from '../Dialog/Dialog.types';

export interface DrawerContentProps extends Omit<DialogContentProps, 'size'> {
  /**
   * Which edge of the viewport the panel is anchored to.
   * @default "right"
   */
  side?: DrawerSide;
}
