import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import './AppLayout.css';
export const AppLayout = ({ children }) => {
    return (_jsxs("div", { className: "app-shell", children: [_jsx(Navbar, {}), _jsx("main", { className: "main-content", children: children }), _jsx(Footer, {})] }));
};
