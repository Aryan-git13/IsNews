import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Cpu, CheckCircle2, XCircle, HelpCircle, FileText, AlertTriangle } from 'lucide-react';
import { Badge } from './Badge';
import { AgentVerdict, AgentResult } from '../../types/verification';
import './common.css';
export const ComprehensiveAgentStatus = ({ agentResults, title = 'Multi-Agent Consensus Log', }) => {
    const getVerdictBadgeVariant = (verdict) => {
        switch (verdict) {
            case 'SUPPORTS':
                return 'real';
            case 'CONTRADICTS':
                return 'fake';
            case 'INSUFFICIENT':
                return 'suspicious';
            default:
                return 'neutral';
        }
    };
    const getVerdictIcon = (verdict) => {
        switch (verdict) {
            case 'SUPPORTS':
                return _jsx(CheckCircle2, { size: 14 });
            case 'CONTRADICTS':
                return _jsx(XCircle, { size: 14 });
            case 'INSUFFICIENT':
                return _jsx(HelpCircle, { size: 14 });
        }
    };
    const hasDisagreement = agentResults.some(a => a.verdict === 'CONTRADICTS') &&
        agentResults.some(a => a.verdict === 'SUPPORTS');
    return (_jsxs("div", { className: "agent-breakdown-card", children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }, children: [_jsxs("h3", { className: "agent-breakdown-title", style: { display: 'flex', alignItems: 'center', gap: '0.5rem' }, children: [_jsx(Cpu, { size: 20, className: "header-icon" }), " ", title] }), hasDisagreement && (_jsx(Badge, { variant: "suspicious", icon: _jsx(AlertTriangle, { size: 14 }), children: "Agent Disagreement Detected" }))] }), _jsx("div", { className: "agent-list", children: agentResults.map((result, idx) => {
                    const isDisagreeing = hasDisagreement && result.verdict === 'CONTRADICTS';
                    return (_jsxs("div", { className: `agent-item ${isDisagreeing ? 'disagreeing-agent-item' : ''}`, style: {
                            background: isDisagreeing ? 'rgba(239, 68, 68, 0.08)' : 'rgba(0, 0, 0, 0.2)',
                            borderColor: isDisagreeing ? 'rgba(239, 68, 68, 0.4)' : 'var(--color-border)',
                        }, children: [_jsxs("div", { className: "agent-header", style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }, children: [_jsx("span", { className: "agent-name", style: { fontWeight: 700, fontSize: '0.95rem' }, children: result.agent }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '0.5rem' }, children: [_jsxs("span", { className: "agent-confidence-pill", style: { fontSize: '0.8rem', color: 'var(--color-text-dim)' }, children: ["Confidence: ", result.confidence, "%"] }), _jsx(Badge, { variant: getVerdictBadgeVariant(result.verdict), icon: getVerdictIcon(result.verdict), children: result.verdict })] })] }), _jsx("p", { className: "agent-detail", style: { fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }, children: result.summary }), result.sources && result.sources.length > 0 && (_jsxs("div", { style: { marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-dim)' }, children: [_jsx(FileText, { size: 12, style: { display: 'inline', marginRight: '0.25rem' } }), "Sources checked: ", result.sources.join(', ')] }))] }, idx));
                }) })] }));
};
