import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import type { PlaneTheme } from '../../themes/Theme.types';

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

  /**
   * Color of the fallback plane. Text is white on red and blue, black on
   * yellow and neutral (black on white, white on black in dark mode).
   * @default "blue"
   */
  theme?: PlaneTheme;
}

export type AvatarImageProps = Omit<
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>,
  'className'
>;

export type AvatarFallbackProps = Omit<
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>,
  'className'
>;
