import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon, ArrowRight, Info } from 'lucide-react';
import { Button, Card, FileUpload, LoadingState, ErrorState } from '../components/ui';
import { newsService } from '../services';
import './PageStyles.css';
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
export const ImageCheckPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [validationError, setValidationError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!selectedFile) {
            setPreviewUrl(null);
            return;
        }
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [selectedFile]);
    const handleFileSelect = (file) => {
        setValidationError('');
        setApiError(null);
        if (!file) {
            setSelectedFile(null);
            return;
        }
        if (!ALLOWED_TYPES.includes(file.type)) {
            setValidationError('Unsupported file format. Please select a PNG, JPG, or WEBP image.');
            setSelectedFile(null);
            return;
        }
        if (file.size > MAX_FILE_SIZE_BYTES) {
            setValidationError(`File size exceeds limit (${MAX_FILE_SIZE_MB}MB). Please upload a smaller image.`);
            setSelectedFile(null);
            return;
        }
        setSelectedFile(file);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setValidationError('Please select an image file to analyze.');
            return;
        }
        setIsLoading(true);
        setValidationError('');
        setApiError(null);
        const formData = new FormData();
        formData.append('image', selectedFile);
        try {
            const result = await newsService.checkImage(formData);
            setIsLoading(false);
            navigate(`/result/${result.verificationId}`, { state: { result } });
        }
        catch (err) {
            setIsLoading(false);
            if (err.message && err.message.includes('No response received')) {
                // Fallback route for demo mode when backend is offline
                navigate('/result/demo-img-789');
            }
            else {
                setApiError(err.message || 'An error occurred during image forensics.');
            }
        }
    };
    return (_jsxs("div", { className: "page-container", children: [_jsxs("div", { className: "page-header", children: [_jsxs("h2", { children: [_jsx(ImageIcon, { className: "header-icon", size: 24 }), " Image & Screenshot Forensics"] }), _jsx("p", { children: "Upload a screenshot or news banner image for server-side OCR text extraction and multi-agent authenticity analysis." })] }), isLoading ? (_jsx(Card, { variant: "glass", className: "form-container", children: _jsx(LoadingState, { message: "Processing Image & Running Server OCR...", submessage: "Extracting embedded claim text, auditing visual artifacts, and cross-referencing consensus databases." }) })) : (_jsxs(Card, { variant: "glass", className: "form-container", children: [apiError && (_jsx("div", { style: { marginBottom: '1.5rem' }, children: _jsx(ErrorState, { title: "Image Analysis Error", message: apiError, onRetry: () => setApiError(null) }) })), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(FileUpload, { onFileSelect: handleFileSelect, selectedFile: selectedFile, error: validationError }), previewUrl && (_jsxs("div", { className: "image-preview-container", style: { marginTop: '1rem', textAlign: 'center' }, children: [_jsx("p", { style: { fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }, children: "Selected Image Preview:" }), _jsx("img", { src: previewUrl, alt: "Selected preview", style: {
                                            maxHeight: '220px',
                                            maxWidth: '100%',
                                            borderRadius: 'var(--radius-sm)',
                                            border: '1px solid var(--color-border)',
                                            objectFit: 'contain'
                                        } })] })), _jsxs("div", { className: "form-footer", children: [_jsxs("div", { className: "threshold-info", children: [_jsx(Info, { size: 16 }), " Server-side OCR & Metadata Inspection active"] }), _jsxs(Button, { type: "submit", variant: "primary", disabled: isLoading || !selectedFile, isLoading: isLoading, children: ["Run Image Forensics ", _jsx(ArrowRight, { size: 16 })] })] })] })] }))] }));
};
