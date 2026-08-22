import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import './common.css';

export interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  accept?: string;
  label?: string;
  sublabel?: string;
  selectedFile?: File | null;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = 'image/png,image/jpeg,image/webp',
  label = 'Click to browse or drop an image file',
  sublabel = 'PNG, JPG, WEBP (Max 10MB)',
  selectedFile,
  error,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (file: File | null) => {
    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="ui-form-group">
      <div
        className={`file-upload-zone ${isDragOver ? 'drag-over' : ''} ${error ? 'input-error' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload-input"
          accept={accept}
          onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
          className="file-input-hidden"
        />
        <label htmlFor="file-upload-input" className="file-upload-label">
          <Upload className="upload-icon" size={36} />
          <div>
            <p className="upload-title">{selectedFile ? selectedFile.name : label}</p>
            <p className="upload-subtext">{selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB — Click or drop to replace` : sublabel}</p>
          </div>
        </label>

        {selectedFile && (
          <button
            type="button"
            className="file-remove-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleFileChange(null);
            }}
            aria-label="Remove image"
          >
            <X size={16} />
          </button>
        )}
      </div>
      {error && <span className="ui-error-text" style={{ textAlign: 'center' }}>{error}</span>}
    </div>
  );
};
