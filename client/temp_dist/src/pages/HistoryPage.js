import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link } from 'react-router-dom';
import { History, ExternalLink, CheckCircle, AlertTriangle } from 'lucide-react';
import { Badge, Card } from '../components/ui';
import './PageStyles.css';
export const HistoryPage = () => {
    const mockHistory = [
        { id: 'rec-001', input: 'Global climate agreement signed by 40 nations', type: 'Text', verdict: 'REAL', score: 92, date: '2026-08-20' },
        { id: 'rec-002', input: 'Miracle cure reported to reverse aging in 2 days', type: 'URL', verdict: 'FAKE', score: 12, date: '2026-08-19' },
        { id: 'rec-003', input: 'Tech giant announces new solar-powered server farm', type: 'Text', verdict: 'REAL', score: 88, date: '2026-08-18' },
    ];
    return (_jsxs("div", { className: "page-container", children: [_jsxs("div", { className: "page-header", children: [_jsxs("h2", { children: [_jsx(History, { className: "header-icon", size: 24 }), " Verification Ledger"] }), _jsx("p", { children: "Audit trail of all recent claims analyzed by the multi-agent consensus network." })] }), _jsx(Card, { variant: "glass", className: "table-container", children: _jsxs("table", { className: "history-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "ID" }), _jsx("th", { children: "Content Sample" }), _jsx("th", { children: "Type" }), _jsx("th", { children: "Verdict" }), _jsx("th", { children: "Truth Score" }), _jsx("th", { children: "Date" }), _jsx("th", { children: "Action" })] }) }), _jsx("tbody", { children: mockHistory.map((item) => (_jsxs("tr", { children: [_jsx("td", { className: "code-text", children: item.id }), _jsx("td", { className: "content-cell", children: item.input }), _jsx("td", { children: _jsx("span", { className: "type-badge", children: item.type }) }), _jsx("td", { children: _jsx(Badge, { variant: item.verdict === 'REAL' ? 'real' : 'fake', icon: item.verdict === 'REAL' ? _jsx(CheckCircle, { size: 14 }) : _jsx(AlertTriangle, { size: 14 }), children: item.verdict }) }), _jsxs("td", { className: "score-text", children: [item.score, "%"] }), _jsx("td", { className: "date-text", children: item.date }), _jsx("td", { children: _jsxs(Link, { to: `/result/${item.id}`, className: "table-action-link", children: ["View Audit ", _jsx(ExternalLink, { size: 14 })] }) })] }, item.id))) })] }) })] }));
};
