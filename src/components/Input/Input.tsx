import React from 'react';
import { InputProps } from './Input.types';
import './Input.css';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, theme = 'primary', ...props }, ref) => {
        const inputClassName = `mondrian-input ${theme}`;

        return (
            <div className='mondrian-input-container'>
                {label && (
                    <label className={`mondrian-input-label ${theme}`} htmlFor={props.id}>
                        {label}
                    </label>
                )}
                <div className={`mondrian-input-wrapper ${theme}`}>
                    <input
                        ref={ref}
                        className={inputClassName}
                        id={props.id} 
                        {...props}
                    />
                </div>
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
