import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import './common.css';
export const Input = ({ label, error, helperText, id, className = '', ...props }) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    return (_jsxs("div", { className: "ui-form-group", children: [label && _jsx("label", { htmlFor: inputId, className: "ui-label", children: label }), _jsx("input", { id: inputId, className: `text-input-field ${error ? 'input-error' : ''} ${className}`.trim(), ...props }), error && _jsx("span", { className: "ui-error-text", children: error }), helperText && !error && _jsx("span", { className: "ui-helper-text", children: helperText })] }));
};
