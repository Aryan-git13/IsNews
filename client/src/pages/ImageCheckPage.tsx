import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon, Upload, ArrowRight, Info } from 'lucide-react';
import './PageStyles.css';

export const ImageCheckPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    navigate('/result/demo-img-789');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2><ImageIcon className="header-icon" size={24} /> Image & Screenshot Forensics</h2>
        <p>Upload a screenshot or news banner image for OCR text extraction and image authenticity analysis.</p>
      </div>

      <div className="glass-card form-container">
        <form onSubmit={handleSubmit}>
          <div className="file-upload-zone">
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input-hidden"
            />
            <label htmlFor="file-input" className="file-upload-label">
              <Upload size={36} className="upload-icon" />
              {selectedFile ? (
                <span className="file-name">{selectedFile.name}</span>
              ) : (
                <span>Click to browse or drop an image file (PNG, JPG, WebP)</span>
              )}
            </label>
          </div>

          <div className="form-footer">
            <div className="threshold-info">
              <Info size={16} /> OCR Engine & Image Metadata Inspection ready
            </div>
            <button type="submit" className="btn-primary" disabled={!selectedFile}>
              Run Image Forensics <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
