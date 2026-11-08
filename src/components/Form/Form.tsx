import * as React from 'react';
import { FormProps } from './Form.types';
import './Form.css';

/**
 * A native form that stacks its fields in one column. Compose `Label` beside
 * each control and give each control an `id`.
 */
const Form = React.forwardRef<HTMLFormElement, FormProps>((props, ref) => (
  <form ref={ref} {...props} className="mondrian-form" />
));

Form.displayName = 'Form';

export { Form };
