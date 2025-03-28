'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross } from '../icons';
import './Dialog.css';
import { DialogContentProps, DialogTriggerProps } from './Dialog.types';

// Root dialog component
const Dialog = DialogPrimitive.Root;

// Dialog trigger
const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Trigger>,
  DialogTriggerProps
>(({ asChild = false, theme = 'primary', size = 'default', ...props }, ref) => (
  <DialogPrimitive.Trigger
    ref={ref}
    className={`mondrian-dialog-trigger ${theme} ${size !== 'default' ? `mondrian-dialog-trigger-${size}` : ''}`}
    asChild={asChild}
    {...props}
  />
));
DialogTrigger.displayName = DialogPrimitive.Trigger.displayName;

// Dialog portal
const DialogPortal = DialogPrimitive.Portal;

// Dialog overlay
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  Omit<
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>,
    'className'
  >
>(({ ...props }, ref) => (
  <DialogPrimitive.Overlay
    className="mondrian-dialog-overlay"
    {...props}
    ref={ref}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// Dialog close button
const DialogClose = DialogPrimitive.Close;

// Dialog content
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ theme = 'primary', size = 'default', children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={`mondrian-dialog-content ${theme} ${size !== 'default' ? `mondrian-dialog-content-${size}` : ''}`}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="mondrian-dialog-close">
        <Cross className="mondrian-dialog-close-icon" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

// Dialog header
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="mondrian-dialog-header" {...props} />
);
DialogHeader.displayName = 'DialogHeader';

// Dialog footer
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="mondrian-dialog-footer" {...props} />
);
DialogFooter.displayName = 'DialogFooter';

// Dialog title
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  Omit<
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>,
    'className'
  >
>(({ ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className="mondrian-dialog-title"
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// Dialog description
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  Omit<
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>,
    'className'
  >
>(({ ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className="mondrian-dialog-description"
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
