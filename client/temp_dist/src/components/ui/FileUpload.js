import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import './common.css';
export const FileUpload = ({ onFileSelect, accept = 'image/png,image/jpeg,image/webp', label = 'Click to browse or drop an image file', sublabel = 'PNG, JPG, WEBP (Max 10MB)', selectedFile, error, }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const handleFileChange = (file) => {
        onFileSelect(file);
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
        }
    };
    return (_jsxs("div", { className: "ui-form-group", children: [_jsxs("div", { className: `file-upload-zone ${isDragOver ? 'drag-over' : ''} ${error ? 'input-error' : ''}`, onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop, children: [_jsx("input", { type: "file", id: "file-upload-input", accept: accept, onChange: (e) => handleFileChange(e.target.files ? e.target.files[0] : null), className: "file-input-hidden" }), _jsxs("label", { htmlFor: "file-upload-input", className: "file-upload-label", children: [_jsx(Upload, { className: "upload-icon", size: 36 }), _jsxs("div", { children: [_jsx("p", { className: "upload-title", children: selectedFile ? selectedFile.name : label }), _jsx("p", { className: "upload-subtext", children: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB — Click or drop to replace` : sublabel })] })] }), selectedFile && (_jsx("button", { type: "button", className: "file-remove-btn", onClick: (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleFileChange(null);
                        }, "aria-label": "Remove image", children: _jsx(X, { size: 16 }) }))] }), error && _jsx("span", { className: "ui-error-text", style: { textAlign: 'center' }, children: error })] }));
};
