import * as React from 'react';
import './Label.css';
import * as LabelPrimitive from '@radix-ui/react-label';
import { ComponentTheme } from '../../themes';

/**
 * Label component following Mondrian neoplasticism design principles
 */
const Label = React.forwardRef<
  HTMLLabelElement,
  Omit<React.ComponentPropsWithoutRef<'label'>, 'className'> & {
    /**
     * The theme color for the label
     * @default "blue"
     */
    theme?: ComponentTheme;

    /**
     * The size of the label
     * @default "default"
     */
    size?: 'default' | 'sm' | 'lg';

    /**
     * Position of the label
     * @default "left"
     */
    position?: 'left' | 'right' | 'top' | 'bottom' | 'floating';
  }
>(
  (
    { children, theme = 'blue', size = 'default', position = 'left', ...props },
    ref
  ) => {
    // Compose class names
    const labelClassName = [
      'mondrian-label',
      `mondrian-label-${theme}`,
      size === 'sm' ? 'mondrian-label-sm' : '',
      size === 'lg' ? 'mondrian-label-lg' : '',
      `mondrian-label-position-${position}`,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <LabelPrimitive.Root ref={ref} className={labelClassName} {...props}>
        {children}
      </LabelPrimitive.Root>
    );
  }
);

Label.displayName = 'Label';

export { Label };
