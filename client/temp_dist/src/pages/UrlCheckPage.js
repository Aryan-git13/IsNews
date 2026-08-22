import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as LinkIcon, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { Button, Card, Input, LoadingState, ErrorState } from '../components/ui';
import { newsService } from '../services';
import './PageStyles.css';
export const UrlCheckPage = () => {
    const [url, setUrl] = useState('');
    const [validationError, setValidationError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const navigate = useNavigate();
    const validateUrlSyntax = (inputUrl) => {
        try {
            const parsed = new URL(inputUrl);
            return parsed.protocol === 'http:' || parsed.protocol === 'https:';
        }
        catch {
            return false;
        }
    };
    const handleUrlChange = (e) => {
        setUrl(e.target.value);
        if (validationError) {
            setValidationError('');
        }
        if (apiError) {
            setApiError(null);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedUrl = url.trim();
        if (!trimmedUrl) {
            setValidationError('Please enter a web URL to verify.');
            return;
        }
        if (!validateUrlSyntax(trimmedUrl)) {
            setValidationError('Please enter a valid URL starting with http:// or https://');
            return;
        }
        setValidationError('');
        setIsLoading(true);
        setApiError(null);
        try {
            const result = await newsService.checkUrl({ url: trimmedUrl });
            setIsLoading(false);
            navigate(`/result/${result.verificationId}`, { state: { result } });
        }
        catch (err) {
            setIsLoading(false);
            if (err.message && err.message.includes('No response received')) {
                // Fallback for demo mode when backend server is unattached
                navigate('/result/demo-url-456');
            }
            else {
                setApiError(err.message || 'Failed to verify URL. Please check the address and try again.');
            }
        }
    };
    return (_jsxs("div", { className: "page-container", children: [_jsxs("div", { className: "page-header", children: [_jsxs("h2", { children: [_jsx(LinkIcon, { className: "header-icon", size: 24 }), " URL & Link Verification"] }), _jsx("p", { children: "Enter a news article link for backend web scraping, publisher domain authority, and claim verification." })] }), isLoading ? (_jsx(Card, { variant: "glass", className: "form-container", children: _jsx(LoadingState, { message: "Fetching Article & Evaluating Domain...", submessage: "The backend is securely scraping article contents, checking SSRF filters, and running cross-reference agents." }) })) : (_jsxs(Card, { variant: "glass", className: "form-container", children: [apiError && (_jsx("div", { style: { marginBottom: '1.5rem' }, children: _jsx(ErrorState, { title: "URL Verification Failed", message: apiError, onRetry: () => setApiError(null) }) })), _jsxs("form", { onSubmit: handleSubmit, noValidate: true, children: [_jsx(Input, { label: "Article Web URL", id: "url-input", type: "url", placeholder: "https://example-news.com/article/123", value: url, onChange: handleUrlChange, error: validationError, helperText: "Full web link including https://" }), _jsxs("div", { className: "ssrf-notice-box", style: {
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0.65rem',
                                    background: 'rgba(99, 102, 241, 0.08)',
                                    border: '1px solid var(--color-border-accent)',
                                    padding: '0.85rem 1rem',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: '0.85rem',
                                    color: 'var(--color-text-muted)',
                                    marginBottom: '1.5rem',
                                }, children: [_jsx(ShieldCheck, { size: 18, style: { color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' } }), _jsxs("div", { children: [_jsx("strong", { style: { color: 'var(--color-text-main)' }, children: "Secure Backend Fetching: " }), "Target websites are fetched entirely on the server with active SSRF protection, IP sanitization, and DNS validation. The browser does not connect directly to the target URL."] })] }), _jsxs("div", { className: "form-footer", children: [_jsxs("div", { className: "threshold-info", children: [_jsx(Info, { size: 16 }), " Web Scraper & Domain Authority active"] }), _jsxs(Button, { type: "submit", variant: "primary", disabled: isLoading || !url.trim(), isLoading: isLoading, children: ["Scrape & Audit Article ", _jsx(ArrowRight, { size: 16 })] })] })] })] }))] }));
};
