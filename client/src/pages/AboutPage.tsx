import React from 'react';
import { ShieldCheck, Cpu, Database, Search, Award } from 'lucide-react';
import './PageStyles.css';

export const AboutPage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h2><ShieldCheck className="header-icon" size={24} /> Multi-Agent AI Architecture</h2>
        <p>Learn how TruthGuard leverages specialized AI agents to combat digital misinformation.</p>
      </div>

      <div className="architecture-grid">
        <div className="glass-card arch-card">
          <Cpu className="arch-icon" size={32} />
          <h3>1. NLP & Linguistic Agent</h3>
          <p>Scans text for emotional manipulation, sensationalist clickbait phrasing, biased tone, and syntactic anomalies.</p>
        </div>

        <div className="glass-card arch-card">
          <Search className="arch-icon" size={32} />
          <h3>2. Cross-Reference Agent</h3>
          <p>Queries trusted global news databases and web indexes to identify corroborating sources or existing debunking reports.</p>
        </div>

        <div className="glass-card arch-card">
          <Database className="arch-icon" size={32} />
          <h3>3. Source Credibility Agent</h3>
          <p>Evaluates domain authority, historical reliability scores, and publishing entity metadata.</p>
        </div>

        <div className="glass-card arch-card">
          <Award className="arch-icon" size={32} />
          <h3>4. Consensus Engine</h3>
          <p>Combines weighted agent outputs into a unified Truth Score with detailed explainability evidence.</p>
        </div>
      </div>
    </div>
  );
};
