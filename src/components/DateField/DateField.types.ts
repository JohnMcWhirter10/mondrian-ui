import * as React from 'react';

/**
 * A native date field. The resting plane is black on white.
 * Focus fills that plane with Mondrian blue.
 */
export type DateFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className' | 'size' | 'type'
> & {
  /**
   * Size from the same scale as Input.
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';
};
