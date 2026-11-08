'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import '../../styles/native-scroll.css';
import './Dialog.css';
import {
  DialogContentProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogTriggerProps,
} from './Dialog.types';

// Root dialog component
const Dialog = DialogPrimitive.Root;

// Dialog trigger
const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Trigger>,
  DialogTriggerProps
>(({ asChild = false, theme = 'blue', size = 'default', ...props }, ref) => (
  <DialogPrimitive.Trigger
    ref={ref}
    className={[
      'mondrian-dialog-trigger',
      theme,
      size !== 'default' ? `mondrian-dialog-trigger-${size}` : '',
    ]
      .filter(Boolean)
      .join(' ')}
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
>(({ theme = 'blue', size = 'default', children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={[
        'mondrian-dialog-content',
        theme,
        size !== 'default' ? `mondrian-dialog-content-${size}` : '',
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <div className="mondrian-dialog-body mondrian-native-scroll">
        {children}
      </div>
      <DialogPrimitive.Close className="mondrian-dialog-close">
        <svg
          className="mondrian-dialog-close-icon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M2 2L14 14M14 2L2 14"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="square"
            fill="none"
          />
        </svg>
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

// Dialog header
const DialogHeader = (props: DialogHeaderProps) => <div className="mondrian-dialog-header" {...props} />;
DialogHeader.displayName = 'DialogHeader';

// Dialog footer
const DialogFooter = (props: DialogFooterProps) => <div className="mondrian-dialog-footer" {...props} />;
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
