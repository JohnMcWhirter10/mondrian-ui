'use client';

import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { VisuallyHidden } from '../VisuallyHidden';
import {
  ToastActionProps,
  ToastCloseProps,
  ToastDescriptionProps,
  ToastProps,
  ToastTitleProps,
  ToastViewportProps,
} from './Toast.types';
import './Toast.css';

export const ToastProvider = ToastPrimitive.Provider;

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  ToastViewportProps
>(({ position = 'bottom-right', ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={`mondrian-toast-viewport mondrian-toast-viewport-${position}`}
    {...props}
  />
));
ToastViewport.displayName = 'ToastViewport';

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ theme = 'yellow', ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={`mondrian-toast mondrian-toast-${theme}`}
    {...props}
  />
));
Toast.displayName = 'Toast';

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  ToastTitleProps
>((props, ref) => (
  <ToastPrimitive.Title ref={ref} className="mondrian-toast-title" {...props} />
));
ToastTitle.displayName = 'ToastTitle';

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  ToastDescriptionProps
>((props, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className="mondrian-toast-description"
    {...props}
  />
));
ToastDescription.displayName = 'ToastDescription';

export const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  ToastActionProps
>((props, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className="mondrian-toast-action"
    {...props}
  />
));
ToastAction.displayName = 'ToastAction';

export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  ToastCloseProps
>((props, ref) => (
  <ToastPrimitive.Close ref={ref} className="mondrian-toast-close" {...props}>
    <svg
      width="12"
      height="12"
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
    <VisuallyHidden>Close</VisuallyHidden>
  </ToastPrimitive.Close>
));
ToastClose.displayName = 'ToastClose';
