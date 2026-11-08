import * as React from 'react';
import * as VisuallyHiddenPrimitive from '@radix-ui/react-visually-hidden';
import { VisuallyHiddenProps } from './VisuallyHidden.types';

/**
 * Text for assistive technology only, such as the name of an icon-only button.
 */
const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  (props, ref) => <VisuallyHiddenPrimitive.Root ref={ref} {...props} />
);

VisuallyHidden.displayName = 'VisuallyHidden';

export { VisuallyHidden };
