import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import './common.css';
export const Badge = ({ variant = 'neutral', children, icon, className = '', }) => {
    return (_jsxs("span", { className: `ui-badge badge-${variant} ${className}`.trim(), children: [icon && _jsx("span", { className: "badge-icon-wrap", children: icon }), children] }));
};
