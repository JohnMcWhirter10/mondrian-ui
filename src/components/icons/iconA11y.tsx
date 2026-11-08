import * as React from 'react';
import type { IconProps } from './icon.types';

/**
 * Icons are decorative by default (aria-hidden, not focusable).
 * They become images with an accessible name when a `title`,
 * `aria-label` or `aria-labelledby` is supplied.
 */
export function getIconA11y(
  title: string | undefined,
  props: Omit<IconProps, 'size' | 'title'>
): {
  svgProps: React.SVGProps<SVGSVGElement>;
  titleNode: React.ReactNode;
} {
  const labelled =
    Boolean(title) ||
    Boolean(props['aria-label']) ||
    Boolean(props['aria-labelledby']);

  if (!labelled) {
    return {
      svgProps: { ...props, 'aria-hidden': true, focusable: false },
      titleNode: null,
    };
  }

  return {
    svgProps: {
      ...props,
      role: props.role ?? 'img',
      'aria-hidden': undefined,
      focusable: false,
      ...(title && !props['aria-label'] && !props['aria-labelledby']
        ? { 'aria-label': title }
        : {}),
    },
    titleNode: title ? <title>{title}</title> : null,
  };
}
