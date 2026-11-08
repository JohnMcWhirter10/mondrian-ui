import * as React from 'react';
import { TextareaProps } from './Textarea.types';
import './Textarea.css';

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ theme = 'blue', size = 'default', ...props }, ref) => {
    const textareaClassName = [
      'mondrian-textarea',
      `mondrian-textarea-${theme}`,
      size === 'sm' ? 'mondrian-textarea-sm' : '',
      size === 'lg' ? 'mondrian-textarea-lg' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return <textarea ref={ref} {...props} className={textareaClassName} />;
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
