import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Cpu } from 'lucide-react';
import './common.css';
export const AgentStatus = ({ agents, title = 'Multi-Agent Execution Log', }) => {
    return (_jsxs("div", { className: "agent-breakdown-card", children: [_jsxs("h3", { className: "agent-breakdown-title", children: [_jsx(Cpu, { size: 20, className: "header-icon" }), " ", title] }), _jsx("div", { className: "agent-list", children: agents.map((agent, idx) => (_jsxs("div", { className: "agent-item", children: [_jsxs("div", { className: "agent-header", children: [_jsx("span", { className: "agent-name", children: agent.name }), _jsx("span", { className: "agent-status", children: agent.status })] }), _jsx("p", { className: "agent-detail", children: agent.detail })] }, idx))) })] }));
};
