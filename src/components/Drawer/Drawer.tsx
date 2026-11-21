'use client';

import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '../Dialog';
import './Drawer.css';
import { DrawerContentProps } from './Drawer.types';

/*
 * Drawer is Dialog anchored to a side. Overlay, focus trap, Escape and
 * close behavior all come from Dialog; this file only adds the anchor.
 */
const Drawer = Dialog;
const DrawerTrigger = DialogTrigger;
const DrawerClose = DialogClose;
const DrawerHeader = DialogHeader;
const DrawerFooter = DialogFooter;
const DrawerTitle = DialogTitle;
const DrawerDescription = DialogDescription;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogContent>,
  DrawerContentProps
>(({ side = 'right', ...props }, ref) => (
  <DialogContent ref={ref} {...props} data-side={side} />
));
DrawerContent.displayName = 'DrawerContent';

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
