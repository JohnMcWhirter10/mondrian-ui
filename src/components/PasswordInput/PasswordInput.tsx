import * as React from 'react';
import { PasswordInputProps } from './PasswordInput.types';
import './PasswordInput.css';

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      theme = 'neutral',
      size = 'default',
      id,
      visible: visibleProp,
      defaultVisible = false,
      onVisibleChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [uncontrolledVisible, setUncontrolledVisible] =
      React.useState(defaultVisible);
    const shown = visibleProp ?? uncontrolledVisible;

    const setShown = (next: boolean) => {
      if (visibleProp === undefined) setUncontrolledVisible(next);
      onVisibleChange?.(next);
    };

    const rootClassName = [
      'mondrian-password-input',
      `mondrian-password-input-${theme}`,
      size === 'sm' ? 'mondrian-password-input-sm' : '',
      size === 'lg' ? 'mondrian-password-input-lg' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={rootClassName}>
        <input
          ref={ref}
          {...props}
          id={id}
          disabled={disabled}
          type={shown ? 'text' : 'password'}
          className="mondrian-password-input-field"
        />
        <button
          type="button"
          className="mondrian-password-input-toggle"
          aria-label={shown ? 'Hide password' : 'Show password'}
          aria-pressed={shown}
          aria-controls={id}
          disabled={disabled}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => setShown(!shown)}
        >
          {shown ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
