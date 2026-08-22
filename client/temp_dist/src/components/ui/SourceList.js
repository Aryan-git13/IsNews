import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import './common.css';
export const SourceList = ({ sources, title = 'Cross-Referenced Sources', }) => {
    if (!sources || sources.length === 0)
        return null;
    return (_jsxs("div", { className: "sources-card", children: [_jsx("h4", { className: "sources-title", children: title }), _jsx("ul", { className: "sources-list", children: sources.map((src, idx) => (_jsxs("li", { className: "source-item", children: [_jsxs("div", { className: "source-main", children: [_jsxs("a", { href: src.url, target: "_blank", rel: "noopener noreferrer", className: "source-link", children: [src.title || src.url, " ", _jsx(ExternalLink, { size: 14 })] }), src.credibilityScore !== undefined && (_jsxs("span", { className: "source-score-badge", children: [_jsx(CheckCircle2, { size: 12 }), " ", src.credibilityScore, "% Trust"] }))] }), src.snippet && _jsx("p", { className: "source-snippet", children: src.snippet })] }, idx))) })] }));
};
