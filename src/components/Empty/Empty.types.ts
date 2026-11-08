import * as React from 'react';
import type { PlaneTheme } from '../../themes/Theme.types';

type NoClassName<T> = Omit<T, 'className'>;

export interface EmptyProps
  extends NoClassName<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * Color of the small corner swatch.
   * @default "blue"
   */
  theme?: PlaneTheme;
}

export type EmptyTitleProps = NoClassName<
  React.HTMLAttributes<HTMLHeadingElement>
>;

export type EmptyDescriptionProps = NoClassName<
  React.HTMLAttributes<HTMLParagraphElement>
>;

export type EmptyActionsProps = NoClassName<
  React.HTMLAttributes<HTMLDivElement>
>;
