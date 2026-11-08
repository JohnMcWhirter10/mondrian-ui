import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import {
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
} from './Avatar.types';
import './Avatar.css';

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ size = 'default', ...props }, ref) => {
    const avatarClassName = [
      'mondrian-avatar',
      size === 'sm' ? 'mondrian-avatar-sm' : '',
      size === 'lg' ? 'mondrian-avatar-lg' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <AvatarPrimitive.Root ref={ref} className={avatarClassName} {...props} />
    );
  }
);

Avatar.displayName = 'Avatar';

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  (props, ref) => (
    <AvatarPrimitive.Image
      ref={ref}
      className="mondrian-avatar-image"
      {...props}
    />
  )
);

AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  (props, ref) => (
    <AvatarPrimitive.Fallback
      ref={ref}
      className="mondrian-avatar-fallback"
      {...props}
    />
  )
);

AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };
