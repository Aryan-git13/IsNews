import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import './common.css';
export const Card = ({ variant = 'glass', className = '', children, ...props }) => {
    const cardClass = variant === 'panel' ? 'glass-panel' : 'glass-card';
    return (_jsx("div", { className: `${cardClass} ${className}`.trim(), ...props, children: children }));
};
