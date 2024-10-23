import React, { useState, useEffect, forwardRef } from 'react';
import { CheckboxProps } from './Checkbox.types';
import './Checkbox.css';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      theme = 'primary',
      className,
      defaultChecked,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const [selfChecked, setSelfChecked] = useState<boolean>(
      defaultChecked || false
    );
    const uniqueId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;
      setSelfChecked(newChecked);

      if (onChange) {
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

    const handleClickMark = () => {
      setSelfChecked((prev) => {
        const newChecked = !prev;
        if (onChange) {
          onChange({
            target: { checked: newChecked },
          } as React.ChangeEvent<HTMLInputElement>);
        }
        return newChecked;
      });
    };

    return (
      <div className={`mondrian-checkbox-container ${theme} ${className}`}>
        <input
          ref={ref}
          type="checkbox"
          className="mondrian-checkbox-input"
          checked={selfChecked}
          onChange={handleToggle}
          id={uniqueId}
          {...props}
        />
        <span
          className="mondrian-checkbox-mark"
          onClick={handleClickMark}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleClickMark();
          }}
        />
        {label && (
          <label
            className={`mondrian-checkbox-label ${theme}`}
            htmlFor={uniqueId}
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
