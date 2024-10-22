import React from 'react';
import { ButtonProps } from './Button.types';
import './Button.css';

const Button: React.FC<ButtonProps> = ({ children, theme = 'primary', ...props }) => {
    const className = `mondrian-button ${theme}`; 

    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};

export default Button;