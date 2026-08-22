import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';
import './PageStyles.css';
export const NotFoundPage = () => {
    return (_jsx("div", { className: "page-container center-container", children: _jsxs("div", { className: "glass-card not-found-card", children: [_jsx(AlertCircle, { size: 64, className: "not-found-icon" }), _jsx("h1", { children: "404 - Page Not Found" }), _jsx("p", { children: "The verification view or ledger endpoint you are looking for does not exist." }), _jsxs(Link, { to: "/", className: "btn-primary", children: [_jsx(Home, { size: 16 }), " Return to Home"] })] }) }));
};
