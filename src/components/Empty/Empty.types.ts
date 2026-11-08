import * as React from 'react';

type NoClassName<T> = Omit<T, 'className'>;

export type EmptyProps = NoClassName<React.HTMLAttributes<HTMLDivElement>>;

export type EmptyTitleProps = NoClassName<
  React.HTMLAttributes<HTMLHeadingElement>
>;

export type EmptyDescriptionProps = NoClassName<
  React.HTMLAttributes<HTMLParagraphElement>
>;

export type EmptyActionsProps = NoClassName<
  React.HTMLAttributes<HTMLDivElement>
>;
