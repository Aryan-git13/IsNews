import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Loader2 } from 'lucide-react';
import './common.css';
export const LoadingState = ({ message = 'Executing Multi-Agent Verification...', submessage = 'Analyzing claims with neural NLP and web consensus engines.', }) => {
    return (_jsxs("div", { className: "state-container loading-state-container", children: [_jsx(Loader2, { className: "spinner-icon animate-spin", size: 40 }), _jsx("h3", { className: "state-title", children: message }), submessage && _jsx("p", { className: "state-description", children: submessage })] }));
};
