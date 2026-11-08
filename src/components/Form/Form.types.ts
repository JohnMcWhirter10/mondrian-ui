import * as React from 'react';

/**
 * Form props (excluding className). Layout only: it adds no label props and
 * does not manage validation.
 */
export type FormProps = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'className'
>;
