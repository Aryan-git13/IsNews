import { Cpu, CheckCircle2, XCircle, HelpCircle, FileText, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Badge } from './Badge';
import type { AgentVerdict, AgentResult } from '../../types/verification';
import './common.css';

export interface ComprehensiveAgentStatusProps {
  agentResults?: AgentResult[];
  title?: string;
}

export const ComprehensiveAgentStatus = ({
  agentResults = [],
  title = 'Multi-Agent Consensus Breakdown',
}: ComprehensiveAgentStatusProps) => {
  if (!agentResults || agentResults.length === 0) {
    return (
      <div className="agent-breakdown-card">
        <h3 className="agent-breakdown-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Cpu size={20} className="header-icon" /> {title}
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-dim)', fontStyle: 'italic', margin: 0 }}>
          No agent analysis data recorded for this audit.
        </p>
      </div>
    );
  }

  const getVerdictBadgeVariant = (verdict: AgentVerdict) => {
    switch (verdict) {
      case 'SUPPORTS':
        return 'real';
      case 'CONTRADICTS':
        return 'fake';
      case 'INSUFFICIENT':
        return 'suspicious';
      default:
        return 'neutral';
    }
  };

  const getVerdictIcon = (verdict: AgentVerdict) => {
    switch (verdict) {
      case 'SUPPORTS':
        return <CheckCircle2 size={14} />;
      case 'CONTRADICTS':
        return <XCircle size={14} />;
      case 'INSUFFICIENT':
        return <HelpCircle size={14} />;
      default:
        return <ShieldAlert size={14} />;
    }
  };

  const sanitizeSummary = (summary?: string): string => {
    if (!summary) return 'No summary provided by agent.';
    // Prevent internal technical stack traces from leaking to user UI
    if (summary.includes('Error:') || summary.includes('at ') || summary.includes('node_modules')) {
      return 'Agent encountered an internal processing warning while evaluating claims.';
    }
    return summary;
  };

  const hasDisagreement =
    agentResults.some((a) => a.verdict === 'CONTRADICTS') &&
    agentResults.some((a) => a.verdict === 'SUPPORTS');

  return (
    <div className="agent-breakdown-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h3 className="agent-breakdown-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
          <Cpu size={20} className="header-icon" /> {title}
        </h3>
        {hasDisagreement && (
          <Badge variant="suspicious" icon={<AlertTriangle size={14} />}>
            Agent Disagreement Detected
          </Badge>
        )}
      </div>

      <div className="agent-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {agentResults.map((result, idx) => {
          const isDisagreeing = hasDisagreement && result.verdict === 'CONTRADICTS';
          const safeSummary = sanitizeSummary(result.summary);
          const safeConfidence = typeof result.confidence === 'number' ? result.confidence : 0;

          return (
            <div
              key={idx}
              className={`agent-item ${isDisagreeing ? 'disagreeing-agent-item' : ''}`}
              style={{
                background: isDisagreeing ? 'rgba(239, 68, 68, 0.08)' : 'rgba(0, 0, 0, 0.2)',
                borderColor: isDisagreeing ? 'rgba(239, 68, 68, 0.4)' : 'var(--color-border)',
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="agent-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span className="agent-name" style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-main)' }}>
                  {result.agent || `Agent #${idx + 1}`}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="agent-confidence-pill" style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>
                    Confidence: {safeConfidence}%
                  </span>
                  <Badge variant={getVerdictBadgeVariant(result.verdict)} icon={getVerdictIcon(result.verdict)}>
                    {result.verdict || 'INSUFFICIENT'}
                  </Badge>
                </div>
              </div>

              <p className="agent-detail" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: '1.5', margin: 0 }}>
                {safeSummary}
              </p>

              {result.sources && result.sources.length > 0 && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>
                  <FileText size={12} style={{ display: 'inline', marginRight: '0.25rem' }} />
                  Sources evaluated: {result.sources.join(', ')}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

