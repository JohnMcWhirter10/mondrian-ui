'use client';

import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { VisuallyHidden } from '../VisuallyHidden';
import {
  ToastActionProps,
  ToastCloseProps,
  ToastDescriptionProps,
  ToastProps,
  ToastProviderProps,
  ToastTitleProps,
  ToastViewportProps,
} from './Toast.types';
import './Toast.css';

const DEFAULT_DURATION = 5000;

/** Radix does not expose the provider's duration, so we keep a copy. */
const ToastDurationContext = React.createContext(DEFAULT_DURATION);

export const ToastProvider = ({
  duration = DEFAULT_DURATION,
  ...props
}: ToastProviderProps) => (
  <ToastDurationContext.Provider value={duration}>
    <ToastPrimitive.Provider duration={duration} {...props} />
  </ToastDurationContext.Provider>
);
ToastProvider.displayName = 'ToastProvider';

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
>(
  (
    {
      theme = 'yellow',
      progress = false,
      duration,
      onPause,
      onResume,
      children,
      ...props
    },
    ref
  ) => {
    const providerDuration = React.useContext(ToastDurationContext);
    const resolved = duration ?? providerDuration;
    const [paused, setPaused] = React.useState(false);
    // A toast that never closes has nothing to count down.
    const showBar = progress && Number.isFinite(resolved);

    return (
      <ToastPrimitive.Root
        ref={ref}
        className={`mondrian-toast mondrian-toast-${theme}`}
        duration={duration}
        data-paused={paused || undefined}
        onPause={() => {
          setPaused(true);
          onPause?.();
        }}
        onResume={() => {
          setPaused(false);
          onResume?.();
        }}
        {...props}
      >
        {children}
        {showBar && (
          <span
            className="mondrian-toast-progress"
            style={
              {
                '--mondrian-toast-duration': `${resolved}ms`,
              } as React.CSSProperties
            }
            aria-hidden="true"
            data-testid="toast-progress"
          />
        )}
      </ToastPrimitive.Root>
    );
  }
);
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
