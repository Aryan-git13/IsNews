import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Link as LinkIcon, Image as ImageIcon, Zap, Shield, Search, CheckCircle, ArrowRight } from 'lucide-react';
import { Badge, Card } from '../components/ui';
import './PageStyles.css';

export const HomePage: React.FC = () => {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div style={{ marginBottom: '1.25rem', display: 'inline-block' }}>
          <Badge variant="primary" icon={<Zap size={14} />}>
            Multi-Agent Consensus Verification Engine
          </Badge>
        </div>
        <h1 className="hero-title">
          Combat Misinformation with <span className="gradient-text">AI Verification</span>
        </h1>
        <p className="hero-description">
          TruthGuard deploys 4 specialized AI agents—Linguistic Analysis, Web Cross-Referencing, Source Credibility, and Consensus Engine—to audit articles, web links, and media in real time.
        </p>

        {/* Action Entry Cards */}
        <div className="hero-cards-grid">
          <Link to="/verify/text" className="mode-card-link" aria-label="Navigate to Text Verification">
            <Card variant="glass" className="mode-card">
              <div className="card-header">
                <FileText className="card-icon text-icon" size={32} />
                <Badge variant="neutral" className="card-badge">NLP Agent</Badge>
              </div>
              <h3>Text Verification</h3>
              <p>Paste raw text, news articles, or statement excerpts for instant multi-agent credibility analysis.</p>
              <div className="card-action">
                <span>Verify Text</span>
                <ArrowRight size={16} />
              </div>
            </Card>
          </Link>

          <Link to="/verify/url" className="mode-card-link" aria-label="Navigate to URL Verification">
            <Card variant="glass" className="mode-card">
              <div className="card-header">
                <LinkIcon className="card-icon url-icon" size={32} />
                <Badge variant="neutral" className="card-badge">Web Scraper</Badge>
              </div>
              <h3>URL Verification</h3>
              <p>Analyze live web URLs to automatically extract content, check publisher reputation, and cross-reference claims.</p>
              <div className="card-action">
                <span>Verify Link</span>
                <ArrowRight size={16} />
              </div>
            </Card>
          </Link>

          <Link to="/verify/image" className="mode-card-link" aria-label="Navigate to Image Check">
            <Card variant="glass" className="mode-card">
              <div className="card-header">
                <ImageIcon className="card-icon image-icon" size={32} />
                <Badge variant="neutral" className="card-badge">OCR + Forensics</Badge>
              </div>
              <h3>Media Check</h3>
              <p>Upload screenshots, infographics, or claims in image format for OCR text extraction and image forensics.</p>
              <div className="card-action">
                <span>Verify Media</span>
                <ArrowRight size={16} />
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="features-section" style={{ marginTop: '4rem', marginBottom: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Why <span className="gradient-text">TruthGuard AI</span>?
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Single-model LLMs suffer from hallucinations. TruthGuard uses a multi-agent consensus architecture to eliminate single points of failure.
          </p>
        </div>

        <div className="architecture-grid">
          <Card variant="glass" className="arch-card">
            <Shield className="arch-icon" size={28} />
            <h3>Source Credibility Engine</h3>
            <p>Evaluates historical domain accuracy, bias indices, and publisher transparency indicators.</p>
          </Card>

          <Card variant="glass" className="arch-card">
            <Search className="arch-icon" size={28} />
            <h3>Web Cross-Referencing</h3>
            <p>Scrapes real-time web search results to find matching or contradicting coverage from authoritative news desks.</p>
          </Card>

          <Card variant="glass" className="arch-card">
            <CheckCircle className="arch-icon" size={28} />
            <h3>Consensus Decision Layer</h3>
            <p>Aggregates agent votes through weighted mathematical consensus to deliver an unbiased final Truth Score.</p>
          </Card>
        </div>
      </section>
    </div>
  );
};
