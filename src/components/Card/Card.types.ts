import * as React from 'react';

export type CardTheme = 'blue' | 'red' | 'yellow' | 'green' | 'neutral';

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  /**
   * The theme color for the card
   * @default "blue"
   */
  theme?: CardTheme;

  /**
   * The size of the card
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';
}

export interface CardHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {}

export interface CardFooterProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {}

export interface CardTitleProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'className'> {}

export interface CardDescriptionProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'className'> {}

export interface CardContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {} 