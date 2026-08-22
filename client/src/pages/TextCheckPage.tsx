import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, Info } from 'lucide-react';
import './PageStyles.css';

export const TextCheckPage: React.FC = () => {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    // Route to result view with demo state ID
    navigate('/result/demo-text-123');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2><FileText className="header-icon" size={24} /> Text Verification</h2>
        <p>Paste the article text, social media post, or news statement below for multi-agent evaluation.</p>
      </div>

      <div className="glass-card form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="text-input">Statement or Article Content</label>
            <textarea
              id="text-input"
              rows={8}
              placeholder="Paste article text here (min 20 words recommended)..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="text-textarea"
            />
          </div>

          <div className="form-footer">
            <div className="threshold-info">
              <Info size={16} /> Multi-agent consensus active (NLP + Web Search + Credibility)
            </div>
            <button type="submit" className="btn-primary" disabled={!text.trim()}>
              Run Multi-Agent Verification <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
