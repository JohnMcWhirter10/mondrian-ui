import * as React from 'react';
import * as VisuallyHiddenPrimitive from '@radix-ui/react-visually-hidden';

/**
 * VisuallyHidden props (excluding className). The content stays available to
 * screen readers and is not painted.
 */
export type VisuallyHiddenProps = Omit<
  React.ComponentPropsWithoutRef<typeof VisuallyHiddenPrimitive.Root>,
  'className' | 'style'
>;
