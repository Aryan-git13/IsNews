import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Link as LinkIcon, Image as ImageIcon, Zap } from 'lucide-react';
import './PageStyles.css';

export const HomePage: React.FC = () => {
  return (
    <div className="page-container">
      <section className="hero-section">
        <div className="hero-badge">
          <Zap size={14} /> Multi-Agent Consensus Verification
        </div>
        <h1 className="hero-title">
          Combat Misinformation with <span className="gradient-text">AI Verification</span>
        </h1>
        <p className="hero-description">
          TruthGuard deploys 4 specialized AI agents—Linguistic Analysis, Web Cross-Referencing, Source Credibility, and Consensus Engine—to audit articles, links, and media in real time.
        </p>

        <div className="hero-cards-grid">
          <Link to="/verify/text" className="glass-card mode-card">
            <FileText className="card-icon text-icon" size={32} />
            <h3>Text Verification</h3>
            <p>Paste raw text, news articles, or statement excerpts for instant multi-agent credibility analysis.</p>
            <span className="card-action">Verify Text &rarr;</span>
          </Link>

          <Link to="/verify/url" className="glass-card mode-card">
            <LinkIcon className="card-icon url-icon" size={32} />
            <h3>URL Verification</h3>
            <p>Analyze live web URLs to automatically extract content, check publisher reputation, and cross-reference claims.</p>
            <span className="card-action">Verify Link &rarr;</span>
          </Link>

          <Link to="/verify/image" className="glass-card mode-card">
            <ImageIcon className="card-icon image-icon" size={32} />
            <h3>Media Check</h3>
            <p>Upload screenshots, infographics, or claims in image format for OCR text extraction and image forensics.</p>
            <span className="card-action">Verify Media &rarr;</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
