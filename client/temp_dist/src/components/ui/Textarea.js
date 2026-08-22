import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import './common.css';
export const Textarea = ({ label, error, helperText, id, className = '', ...props }) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    return (_jsxs("div", { className: "ui-form-group", children: [label && _jsx("label", { htmlFor: textareaId, className: "ui-label", children: label }), _jsx("textarea", { id: textareaId, className: `text-textarea ${error ? 'input-error' : ''} ${className}`.trim(), ...props }), error && _jsx("span", { className: "ui-error-text", children: error }), helperText && !error && _jsx("span", { className: "ui-helper-text", children: helperText })] }));
};
