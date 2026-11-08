'use client';

import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { Button } from '../Button/Button';
import '../Dialog/Dialog.css';
import './AlertDialog.css';
import {
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogContentProps,
  AlertDialogFooterProps,
  AlertDialogHeaderProps,
} from './AlertDialog.types';

export const AlertDialog = AlertDialogPrimitive.Root;

export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

/**
 * Content reuses the Dialog overlay and frame. There is no close cell and
 * the overlay does not dismiss: the user must pick Action or Cancel (or press
 * Escape). Radix focuses Cancel first.
 */
export const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  AlertDialogContentProps
>(({ theme = 'red', ...props }, ref) => (
  <AlertDialogPrimitive.Portal>
    <AlertDialogPrimitive.Overlay className="mondrian-dialog-overlay" />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={`mondrian-dialog-content mondrian-alert-dialog-content ${theme}`}
      {...props}
    />
  </AlertDialogPrimitive.Portal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

export const AlertDialogHeader = (props: AlertDialogHeaderProps) => (
  <div className="mondrian-dialog-header" {...props} />
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

export const AlertDialogFooter = (props: AlertDialogFooterProps) => (
  <div className="mondrian-dialog-footer" {...props} />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

export const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  Omit<
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>,
    'className'
  >
>((props, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className="mondrian-dialog-title"
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

export const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  Omit<
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>,
    'className'
  >
>((props, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className="mondrian-dialog-description"
    {...props}
  />
));
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

/** Confirm button. Red by default for destructive confirms. */
export const AlertDialogAction = React.forwardRef<
  HTMLButtonElement,
  AlertDialogActionProps
>(({ theme = 'red', ...props }, ref) => (
  <AlertDialogPrimitive.Action asChild>
    <Button ref={ref} theme={theme} {...props} />
  </AlertDialogPrimitive.Action>
));
AlertDialogAction.displayName = 'AlertDialogAction';

/** Cancel button. Receives initial focus. */
export const AlertDialogCancel = React.forwardRef<
  HTMLButtonElement,
  AlertDialogCancelProps
>(({ theme = 'neutral', ...props }, ref) => (
  <AlertDialogPrimitive.Cancel asChild>
    <Button ref={ref} theme={theme} {...props} />
  </AlertDialogPrimitive.Cancel>
));
AlertDialogCancel.displayName = 'AlertDialogCancel';
