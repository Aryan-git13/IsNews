import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import './common.css';
export const Button = ({ variant = 'primary', size = 'md', isLoading = false, className = '', disabled, children, ...props }) => {
    const baseClass = variant === 'secondary' ? 'btn-secondary' : 'btn-primary';
    const sizeClass = size !== 'md' ? `btn-${size}` : '';
    return (_jsxs("button", { className: `${baseClass} ${sizeClass} ${isLoading ? 'btn-loading' : ''} ${className}`.trim(), disabled: disabled || isLoading, ...props, children: [isLoading ? (_jsx("span", { className: "btn-spinner", "aria-hidden": "true" })) : null, children] }));
};
