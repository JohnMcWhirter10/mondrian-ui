import * as React from 'react';
import { HeadingProps, TextProps } from './Typography.types';
import './Typography.css';

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, as, children, ...props }, ref) => {
    const tag: string = as ?? `h${level}`;
    const headingClassName = [
      'mondrian-heading',
      `mondrian-heading-${level}`,
    ].join(' ');

    return React.createElement(
      tag,
      { ref, className: headingClassName, ...props },
      children
    );
  }
);

Heading.displayName = 'Heading';

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ as = 'p', size = 'small', children, ...props }, ref) => {
    const textClassName = ['mondrian-text', `mondrian-text-${size}`].join(' ');

    return React.createElement(
      as,
      { ref, className: textClassName, ...props },
      children
    );
  }
);

Text.displayName = 'Text';

export { Heading, Text };
