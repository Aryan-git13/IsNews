import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';
import './common.css';
export const ErrorState = ({ title = 'Verification Error', message = 'An issue occurred while processing your request. Please try again.', onRetry, }) => {
    return (_jsxs("div", { className: "state-container error-state-container", children: [_jsx(AlertCircle, { className: "error-icon", size: 44 }), _jsx("h3", { className: "state-title", children: title }), _jsx("p", { className: "state-description", children: message }), onRetry && (_jsx(Button, { variant: "secondary", onClick: onRetry, style: { marginTop: '1rem' }, children: "Try Again" }))] }));
};
