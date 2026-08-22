import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-container glass-panel">
      <div className="footer-content">
        <div className="footer-brand-section">
          <div className="footer-brand">
            <ShieldCheck className="footer-brand-icon" size={24} />
            <span className="footer-brand-name">TruthGuard <span className="brand-tag">AI</span></span>
          </div>
          <p className="footer-description">
            Multi-Agent Neural Fake News & Misinformation Verification System built with MERN architecture and LLM reasoning verification.
          </p>
        </div>

        <div className="footer-links-group">
          <div className="footer-col">
            <h4 className="footer-col-title">Verification Modes</h4>
            <NavLink to="/verify/text" className="footer-link">Text Content Analysis</NavLink>
            <NavLink to="/verify/url" className="footer-link">URL & Web Domain</NavLink>
            <NavLink to="/verify/image" className="footer-link">Image Deepfake Check</NavLink>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">System</h4>
            <NavLink to="/history" className="footer-link">Verification Ledger</NavLink>
            <NavLink to="/about" className="footer-link">Agent Architecture</NavLink>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copyright">
          © {new Date().getFullYear()} TruthGuard AI. All rights reserved.
        </span>
        <div className="footer-meta">
          <span className="footer-badge">MERN Engine v2.0</span>
        </div>
      </div>
    </footer>
  );
};
