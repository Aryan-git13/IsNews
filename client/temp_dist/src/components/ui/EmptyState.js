import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Inbox } from 'lucide-react';
import './common.css';
export const EmptyState = ({ title = 'No Data Found', message = 'There are no records available to display.', action, }) => {
    return (_jsxs("div", { className: "state-container empty-state-container", children: [_jsx(Inbox, { className: "empty-icon", size: 44 }), _jsx("h3", { className: "state-title", children: title }), _jsx("p", { className: "state-description", children: message }), action && _jsx("div", { style: { marginTop: '1rem' }, children: action })] }));
};
