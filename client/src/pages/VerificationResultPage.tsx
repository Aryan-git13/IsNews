import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Cpu, ArrowLeft } from 'lucide-react';
import './PageStyles.css';

export const VerificationResultPage: React.FC = () => {
  const { verificationId } = useParams<{ verificationId: string }>();

  // Demo fallback state
  const mockVerdict = {
    id: verificationId || 'demo-123',
    score: 84, // 84% Real
    status: 'REAL',
    confidence: 'HIGH',
    summary: 'The submitted claims regarding renewable energy targets align with published press releases from official governmental and scientific sources.',
    agents: [
      { name: 'Linguistic / NLP Agent', status: 'Completed', detail: 'No sensationalist syntax or emotional manipulation markers detected.' },
      { name: 'Web Cross-Reference Agent', status: 'Completed', detail: 'Found 14 matching consensus reports across trusted news outlets.' },
      { name: 'Source Credibility Agent', status: 'Completed', detail: 'Domain authority score 92/100. High historical accuracy.' },
      { name: 'Consensus Decision Engine', status: 'Completed', detail: 'Final weighted probability: 84% Truth Score.' }
    ]
  };

  return (
    <div className="page-container">
      <div className="result-header">
        <Link to="/verify/text" className="btn-secondary">
          <ArrowLeft size={16} /> New Verification
        </Link>
        <span className="verification-id-badge">ID: {mockVerdict.id}</span>
      </div>

      <div className="result-grid">
        {/* Main Verdict Card */}
        <div className="glass-card verdict-summary-card">
          <div className="verdict-gauge">
            <div className="gauge-score">{mockVerdict.score}%</div>
            <div className="gauge-label">Truth Score</div>
          </div>

          <div className="verdict-details">
            <div className="verdict-badge verdict-real">
              <CheckCircle size={20} /> VERDICT: {mockVerdict.status}
            </div>
            <p className="verdict-summary">{mockVerdict.summary}</p>
          </div>
        </div>

        {/* Multi-Agent Breakdown Panel */}
        <div className="glass-card agent-breakdown-card">
          <h3><Cpu size={20} /> Multi-Agent Execution Log</h3>
          <div className="agent-list">
            {mockVerdict.agents.map((agent, idx) => (
              <div key={idx} className="agent-item">
                <div className="agent-header">
                  <span className="agent-name">{agent.name}</span>
                  <span className="agent-status">{agent.status}</span>
                </div>
                <p className="agent-detail">{agent.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
