import React, { useState, useEffect, forwardRef } from 'react';
import { CheckboxProps } from './Checkbox.types';
import './Checkbox.css';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { label, theme = 'primary', className, defaultChecked, onChange, ...props },
    ref
  ) => {
    const [selfChecked, setSelfChecked] = useState<boolean>(
      defaultChecked || false
    );

    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = !selfChecked;
      setSelfChecked(newChecked);

      if (onChange) {
        onChange({
          ...event,
          target: { ...event.target, checked: newChecked },
        });
      }
    };

    const handleClick = (
      event: React.MouseEvent<HTMLInputElement | HTMLLabelElement>
    ) => {
      const newChecked = !selfChecked;
      setSelfChecked(newChecked);

      if (onChange) {
        // @ts-ignore
        onChange({
          ...event,
          target: { ...event.target, checked: newChecked },
        });
      }
    };

    useEffect(() => {
      if (onChange) {
        onChange({
          target: { checked: selfChecked },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }, [selfChecked, onChange]);

    return (
      <div className={`mondrian-checkbox-container ${theme} ${className}`}>
        <input
          ref={ref}
          type="checkbox"
          className="mondrian-checkbox-input"
          checked={selfChecked}
          onChange={handleToggle}
          {...props}
        />
        <span className="mondrian-checkbox-mark" onClick={handleClick} />
        {label && (
          <label
            className={`mondrian-checkbox-label ${theme}`}
            htmlFor={props.id}
            onClick={handleClick}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
