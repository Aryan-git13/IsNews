import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ShieldCheck, FileText, Image as ImageIcon, Link as LinkIcon, History, Info, Menu, X } from 'lucide-react';
import './Navbar.css';
export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
    };
    return (_jsx("header", { className: "navbar-header glass-panel", children: _jsxs("div", { className: "navbar-container", children: [_jsxs(NavLink, { to: "/", className: "navbar-brand", "aria-label": "TruthGuard AI Home", children: [_jsx(ShieldCheck, { className: "brand-icon", size: 28 }), _jsxs("span", { className: "brand-name", children: ["TruthGuard ", _jsx("span", { className: "brand-tag", children: "AI" })] })] }), _jsx("button", { className: "mobile-menu-toggle", onClick: toggleMobileMenu, "aria-label": isMobileMenuOpen ? "Close menu" : "Open menu", "aria-expanded": isMobileMenuOpen, children: isMobileMenuOpen ? _jsx(X, { size: 24 }) : _jsx(Menu, { size: 24 }) }), _jsxs("nav", { className: `navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`, children: [_jsx(NavLink, { to: "/", end: true, className: ({ isActive }) => `nav-item ${isActive ? 'active' : ''}`, children: "Home" }), _jsxs(NavLink, { to: "/verify/text", className: ({ isActive }) => `nav-item ${isActive ? 'active' : ''}`, children: [_jsx(FileText, { size: 16 }), " Text Check"] }), _jsxs(NavLink, { to: "/verify/url", className: ({ isActive }) => `nav-item ${isActive ? 'active' : ''}`, children: [_jsx(LinkIcon, { size: 16 }), " URL Check"] }), _jsxs(NavLink, { to: "/verify/image", className: ({ isActive }) => `nav-item ${isActive ? 'active' : ''}`, children: [_jsx(ImageIcon, { size: 16 }), " Image Check"] }), _jsxs(NavLink, { to: "/history", className: ({ isActive }) => `nav-item ${isActive ? 'active' : ''}`, children: [_jsx(History, { size: 16 }), " Ledger"] }), _jsxs(NavLink, { to: "/about", className: ({ isActive }) => `nav-item ${isActive ? 'active' : ''}`, children: [_jsx(Info, { size: 16 }), " Architecture"] }), _jsx("div", { className: "mobile-status-container", children: _jsxs("div", { className: "navbar-status", children: [_jsx("span", { className: "status-dot" }), _jsx("span", { className: "status-text", children: "Multi-Agent Active" })] }) })] }), _jsxs("div", { className: "navbar-status desktop-status", children: [_jsx("span", { className: "status-dot" }), _jsx("span", { className: "status-text", children: "Multi-Agent Active" })] })] }) }));
};
