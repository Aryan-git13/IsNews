import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import './common.css';
export const ProgressIndicator = ({ score, label = 'Truth Score', size = 140, }) => {
    const getBorderColor = (s) => {
        if (s >= 70)
            return 'var(--color-verdict-real)';
        if (s >= 40)
            return 'var(--color-verdict-suspicious)';
        return 'var(--color-verdict-fake)';
    };
    const borderColor = getBorderColor(score);
    return (_jsxs("div", { className: "verdict-gauge", style: {
            width: `${size}px`,
            height: `${size}px`,
            borderColor: borderColor,
        }, children: [_jsxs("div", { className: "gauge-score", style: { color: borderColor }, children: [score, "%"] }), _jsx("div", { className: "gauge-label", children: label })] }));
};
