import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, Info } from 'lucide-react';
import { Button, Card, Textarea, LoadingState, ErrorState } from '../components/ui';
import { newsService } from '../services';
import './PageStyles.css';
export const TextCheckPage = () => {
    const [text, setText] = useState('');
    const [validationError, setValidationError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const navigate = useNavigate();
    const handleTextChange = (e) => {
        setText(e.target.value);
        if (validationError && e.target.value.trim()) {
            setValidationError('');
        }
        if (apiError) {
            setApiError(null);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Client-side validation
        const trimmedText = text.trim();
        if (!trimmedText) {
            setValidationError('Please enter some text or an article excerpt to verify.');
            return;
        }
        if (trimmedText.length < 10) {
            setValidationError('Text is too short. Please provide at least 10 characters for meaningful analysis.');
            return;
        }
        setValidationError('');
        setIsLoading(true);
        setApiError(null);
        try {
            const result = await newsService.checkText({ text: trimmedText });
            setIsLoading(false);
            navigate(`/result/${result.verificationId}`, { state: { result } });
        }
        catch (err) {
            setIsLoading(false);
            // Fallback for demo when backend is offline
            if (err.message && err.message.includes('No response received')) {
                // Safe navigation with mock demo ID fallback if backend is unattached
                navigate('/result/demo-text-123');
            }
            else {
                setApiError(err.message || 'An error occurred during verification.');
            }
        }
    };
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const charCount = text.length;
    return (_jsxs("div", { className: "page-container", children: [_jsxs("div", { className: "page-header", children: [_jsxs("h2", { children: [_jsx(FileText, { className: "header-icon", size: 24 }), " Text Verification"] }), _jsx("p", { children: "Paste the article text, social media post, or news statement below for multi-agent evaluation." })] }), isLoading ? (_jsx(Card, { variant: "glass", className: "form-container", children: _jsx(LoadingState, { message: "Analyzing Article & Statement...", submessage: "Executing NLP linguistic parsing, cross-referencing web sources, and computing agent consensus score." }) })) : (_jsxs(Card, { variant: "glass", className: "form-container", children: [apiError && (_jsx("div", { style: { marginBottom: '1.5rem' }, children: _jsx(ErrorState, { title: "Verification Request Failed", message: apiError, onRetry: () => setApiError(null) }) })), _jsxs("form", { onSubmit: handleSubmit, noValidate: true, children: [_jsx(Textarea, { label: "Statement or Article Content", id: "text-input", rows: 9, placeholder: "Paste news article, headline, or claim text here...", value: text, onChange: handleTextChange, error: validationError, "aria-describedby": "text-counter-info" }), _jsxs("div", { className: "input-meta-bar", style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-text-dim)', marginTop: '-0.75rem', marginBottom: '1.25rem' }, children: [_jsx("span", { children: "Min 10 characters" }), _jsxs("span", { id: "text-counter-info", children: [wordCount, " words | ", charCount, " chars"] })] }), _jsxs("div", { className: "form-footer", children: [_jsxs("div", { className: "threshold-info", children: [_jsx(Info, { size: 16 }), " Multi-agent consensus active (NLP + Web Search + Credibility)"] }), _jsxs(Button, { type: "submit", variant: "primary", disabled: isLoading || !text.trim(), isLoading: isLoading, children: ["Run Multi-Agent Verification ", _jsx(ArrowRight, { size: 16 })] })] })] })] }))] }));
};
