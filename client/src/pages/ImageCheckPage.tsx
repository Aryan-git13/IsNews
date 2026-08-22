import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon, ArrowRight, Info } from 'lucide-react';
import { Button, Card, FileUpload, LoadingState, ErrorState } from '../components/ui';
import { newsService } from '../services';
import './PageStyles.css';

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

export const ImageCheckPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [validationError, setValidationError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

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

  const handleFileSelect = (file: File | null) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
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
    } catch (err: any) {
      setIsLoading(false);
      if (err.message && err.message.includes('No response received')) {
        // Fallback route for demo mode when backend is offline
        navigate('/result/demo-img-789');
      } else {
        setApiError(err.message || 'An error occurred during image forensics.');
      }
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2><ImageIcon className="header-icon" size={24} /> Image & Screenshot Forensics</h2>
        <p>Upload a screenshot or news banner image for server-side OCR text extraction and multi-agent authenticity analysis.</p>
      </div>

      {isLoading ? (
        <Card variant="glass" className="form-container">
          <LoadingState
            message="Processing Image & Running Server OCR..."
            submessage="Extracting embedded claim text, auditing visual artifacts, and cross-referencing consensus databases."
          />
        </Card>
      ) : (
        <Card variant="glass" className="form-container">
          {apiError && (
            <div style={{ marginBottom: '1.5rem' }}>
              <ErrorState
                title="Image Analysis Error"
                message={apiError}
                onRetry={() => setApiError(null)}
              />
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <FileUpload
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              error={validationError}
            />

            {previewUrl && (
              <div className="image-preview-container" style={{ marginTop: '1rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Selected Image Preview:</p>
                <img
                  src={previewUrl}
                  alt="Selected preview"
                  style={{
                    maxHeight: '220px',
                    maxWidth: '100%',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    objectFit: 'contain'
                  }}
                />
              </div>
            )}

            <div className="form-footer">
              <div className="threshold-info">
                <Info size={16} /> Server-side OCR & Metadata Inspection active
              </div>
              <Button type="submit" variant="primary" disabled={isLoading || !selectedFile} isLoading={isLoading}>
                Run Image Forensics <ArrowRight size={16} />
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};
