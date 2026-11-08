import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

export type AvatarSize = 'default' | 'sm' | 'lg';

export interface AvatarProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    'className'
  > {
  /**
   * Frame size from the library scale.
   * @default "default"
   */
  size?: AvatarSize;
}

export type AvatarImageProps = Omit<
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>,
  'className'
>;

export type AvatarFallbackProps = Omit<
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>,
  'className'
>;
