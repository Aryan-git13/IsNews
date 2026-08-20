import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as LinkIcon, ArrowRight, Info } from 'lucide-react';
import './PageStyles.css';

export const UrlCheckPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    navigate('/result/demo-url-456');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2><LinkIcon className="header-icon" size={24} /> URL & Link Verification</h2>
        <p>Enter a news article or web URL to perform automated web scraping and source credibility evaluation.</p>
      </div>

      <div className="glass-card form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="url-input">Article Web URL</label>
            <input
              id="url-input"
              type="url"
              placeholder="https://example-news.com/article/123"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="text-input-field"
            />
          </div>

          <div className="form-footer">
            <div className="threshold-info">
              <Info size={16} /> Web scraper & domain authority checker ready
            </div>
            <button type="submit" className="btn-primary" disabled={!url.trim()}>
              Scrape & Audit Article <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
