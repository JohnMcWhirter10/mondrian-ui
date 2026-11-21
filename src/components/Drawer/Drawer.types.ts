/**
 * Drawer Component Types
 */

import * as React from 'react';
import type {
  DialogProps,
  DialogContentProps,
  DialogTriggerProps,
  DialogCloseProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogHeaderProps,
  DialogFooterProps,
} from '../Dialog/Dialog.types';

export type DrawerSide = 'left' | 'right';

export type DrawerProps = DialogProps;
export type DrawerTriggerProps = DialogTriggerProps;
export type DrawerCloseProps = DialogCloseProps;
export type DrawerTitleProps = DialogTitleProps;
export type DrawerDescriptionProps = DialogDescriptionProps;
export type DrawerHeaderProps = DialogHeaderProps;
export type DrawerFooterProps = DialogFooterProps;

export interface DrawerContentProps
  extends Omit<DialogContentProps, 'size' | 'data-side'> {
  /**
   * Which edge of the viewport the panel is anchored to.
   * @default "right"
   */
  side?: DrawerSide;

  /**
   * Plane color of the header and corner swatch.
   * @default "blue"
   */
  theme?: DialogContentProps['theme'];

  children?: React.ReactNode;
}
