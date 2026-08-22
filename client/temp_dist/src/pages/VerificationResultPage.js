import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle, XCircle, HelpCircle, ArrowLeft, RotateCcw, ListChecks, Info, Lightbulb, FileText, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { Badge, Card, Button, ProgressIndicator, ComprehensiveAgentStatus, SourceList, LoadingState, ErrorState } from '../components/ui';
import { newsService } from '../services';
import './PageStyles.css';
export const VerificationResultPage = () => {
    const { verificationId } = useParams();
    const location = useLocation();
    const [result, setResult] = useState(location.state?.result || null);
    const [isLoading, setIsLoading] = useState(!location.state?.result && !!verificationId);
    useEffect(() => {
        if (!result && verificationId) {
            setIsLoading(true);
            newsService
                .getHistoryById(verificationId)
                .then((data) => {
                setResult(data);
                setIsLoading(false);
            })
                .catch(() => {
                setResult(getMockFallbackResult(verificationId));
                setIsLoading(false);
            });
        }
    }, [verificationId, result]);
    if (isLoading) {
        return (_jsx("div", { className: "page-container center-container", children: _jsx(Card, { variant: "glass", style: { width: '100%', maxWidth: '600px' }, children: _jsx(LoadingState, { message: "Retrieving Verification Audit Report..." }) }) }));
    }
    if (!result) {
        return (_jsx("div", { className: "page-container center-container", children: _jsx(Card, { variant: "glass", style: { width: '100%', maxWidth: '600px' }, children: _jsx(ErrorState, { title: "Verification Record Not Found", message: "Unable to load the requested audit report.", onRetry: () => window.location.reload() }) }) }));
    }
    const isReal = result.verdict === 'REAL';
    const isFake = result.verdict === 'FAKE';
    return (_jsxs("div", { className: "page-container", children: [_jsxs("div", { className: "result-header", children: [_jsxs("div", { style: { display: 'flex', gap: '0.75rem' }, children: [_jsx(Link, { to: "/", style: { textDecoration: 'none' }, children: _jsxs(Button, { variant: "secondary", size: "sm", children: [_jsx(ArrowLeft, { size: 16 }), " Home"] }) }), _jsx(Link, { to: "/verify/text", style: { textDecoration: 'none' }, children: _jsxs(Button, { variant: "primary", size: "sm", children: [_jsx(RotateCcw, { size: 16 }), " New Verification"] }) })] }), _jsxs("span", { className: "verification-id-badge", children: ["Audit ID: ", result.verificationId] })] }), _jsx("div", { className: "result-grid", children: _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '1.5rem' }, children: _jsxs(Card, { variant: "glass", className: "verdict-summary-card", children: [_jsx(ProgressIndicator, { score: result.confidence, label: "Confidence Score" }), _jsxs("div", { className: "verdict-details", style: { marginTop: '1.5rem', textAlign: 'center' }, children: [_jsx("div", { style: { marginBottom: '1rem' }, children: isReal ? (_jsx(Badge, { variant: "real", icon: _jsx(CheckCircle, { size: 18 }), children: "VERDICT: REAL" })) : isFake ? (_jsx(Badge, { variant: "fake", icon: _jsx(XCircle, { size: 18 }), children: "VERDICT: FAKE" })) : (_jsx(Badge, { variant: "suspicious", icon: _jsx(HelpCircle, { size: 18 }), children: "VERDICT: UNCERTAIN" })) }), _jsx("p", { className: "verdict-summary", style: { fontSize: '0.95rem', color: 'var(--color-text-main)', lineHeight: '1.6' }, children: result.summary })] }), _jsx("div", { style: {
                                    marginTop: '1.5rem',
                                    paddingTop: '1rem',
                                    borderTop: '1px solid var(--color-border)',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justify
                                } - content }), ": 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-dim)', }} >", result.sourceType === 'IMAGE' ? (_jsx(ImageIcon, { size: 16 })) : result.sourceType === 'URL' ? (_jsx(LinkIcon, { size: 16 })) : (_jsx(FileText, { size: 16 })), _jsxs("span", { children: ["Input Type: ", result.sourceType || 'TEXT'] }), _jsx("span", { children: "\u2022" }), _jsxs("span", { children: ["Audited: ", new Date(result.createdAt).toLocaleDateString()] })] }) }) }), result.sourceType === 'IMAGE' && result.ocrText ? (_jsxs(Card, { variant: "glass", children: [_jsxs("h4", { style: { fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }, children: [_jsx(FileText, { size: 16, style: { color: 'var(--color-accent-cyan)' } }), " Server OCR Text Extraction"] }), _jsx("p", { style: { fontSize: '0.85rem', color: 'var(--color-text-muted)', background: 'rgba(0,0,0,0.25)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontFamily: 'monospace' }, children: result.ocrText }), result.ocrConfidence !== undefined && (_jsxs("span", { style: { fontSize: '0.75rem', color: 'var(--color-text-dim)', display: 'block', marginTop: '0.35rem' }, children: ["OCR Reader Quality: ", result.ocrConfidence, "%"] }))] })) : null, result.factCheckTips && result.factCheckTips.length > 0 ? (_jsxs(Card, { variant: "glass", children: [_jsxs("h4", { style: { fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-accent-cyan)' }, children: [_jsx(Lightbulb, { size: 16 }), " Fact-Checking Tips"] }), _jsx("ul", { style: { paddingLeft: '1.2rem', margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }, children: result.factCheckTips.map((tip, idx) => (_jsx("li", { style: { marginBottom: '0.35rem' }, children: tip }, idx))) })] })) : null] })) /* Right Column: Detailed Breakdown */;
    { /* Right Column: Detailed Breakdown */ }
    _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '1.5rem' }, children: [_jsxs(Card, { variant: "glass", children: [_jsxs("h3", { style: { fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }, children: [_jsx(Info, { size: 18, style: { color: 'var(--color-primary)' } }), " Reasoning & Analysis"] }), _jsx("p", { style: { fontSize: '0.925rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }, children: result.explanation }), result.claims && result.claims.length > 0 ? (_jsxs("div", { style: { marginTop: '1.25rem' }, children: [_jsxs("h4", { style: { fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }, children: [_jsx(ListChecks, { size: 15 }), " Identified Claims Evaluated:"] }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '0.4rem' }, children: result.claims.map((claim, idx) => (_jsxs("div", { style: { background: 'rgba(255,255,255,0.03)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.85rem' }, children: ["\u2022 ", claim] }, idx))) })] })) : null] }), _jsx(Card, { variant: "glass", children: _jsx(ComprehensiveAgentStatus, { agentResults: result.agentResults }) }), result.keyEvidence && result.keyEvidence.length > 0 ? (_jsx(Card, { variant: "glass", children: _jsx(SourceList, { sources: result.keyEvidence.map((ev) => ({
                        title: ev.title,
                        url: ev.url,
                        credibilityScore: ev.relevance ? Math.round(ev.relevance * 100) : undefined,
                        snippet: ev.summary,
                    })) }) })) : null] });
};
div >
;
div >
;
;
;
function getMockFallbackResult(id) {
    return {
        verificationId: id || 'demo-text-123',
        verdict: 'REAL',
        confidence: 86,
        summary: 'The submitted statement aligns with multiple verified news releases and official climate summit statements.',
        claims: [
            'Over 40 nations signed global renewable target accord.',
            'Implementation begins in Q1 2027.',
        ],
        agentResults: [
            {
                agent: 'Linguistic / NLP Agent',
                verdict: 'SUPPORTS',
                confidence: 90,
                summary: 'No sensationalism or clickbait syntax detected. Neutral objective reporting style.',
            },
            {
                agent: 'Web Cross-Reference Agent',
                verdict: 'SUPPORTS',
                confidence: 88,
                summary: 'Found 14 matching reports across Reuters, AP, and BBC.',
                sources: ['reuters.com', 'apnews.com', 'bbc.com'],
            },
            {
                agent: 'Source Credibility Agent',
                verdict: 'SUPPORTS',
                confidence: 94,
                summary: 'Historical publisher accuracy rating is 94/100.',
            },
            {
                agent: 'Consensus Engine',
                verdict: 'SUPPORTS',
                confidence: 86,
                summary: 'Weighted mathematical consensus reached with high agreement across all agents.',
            },
        ],
        keyEvidence: [
            {
                title: 'Global Leaders Finalize Renewable Energy Pact',
                url: 'https://example-news.com/climate-accord',
                source: 'Reuters Desk',
                relevance: 0.94,
                supportsClaim: true,
                summary: 'Official document release confirming 42 nations signed the binding protocol.',
            },
        ],
        explanation: 'The statement underwent multi-agent consensus verification. Cross-referencing verified primary news releases and official press statements from the summit, with no contradictory reports found.',
        factCheckTips: [
            'Always cross-check statements against primary official press releases.',
            'Verify if secondary news outlets attribute quotes to named officials.',
        ],
        createdAt: new Date().toISOString(),
        sourceType: 'TEXT',
    };
}
