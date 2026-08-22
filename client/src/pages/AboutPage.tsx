import { 
  ShieldCheck, 
  Cpu, 
  Database, 
  Search, 
  Scale, 
  AlertTriangle, 
  Info, 
  HelpCircle,
  FileCheck2
} from 'lucide-react';
import { Card, Badge } from '../components/ui';
import './PageStyles.css';

export const AboutPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h2><ShieldCheck className="header-icon" size={24} /> About Multi-Agent Verification</h2>
        <p>Transparent overview of TruthGuard's AI-assisted multi-source fact-checking platform.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Core Mission & Disclaimer Banner */}
        <Card variant="glass" style={{ borderLeft: '4px solid var(--color-verdict-suspicious)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <AlertTriangle size={20} style={{ color: 'var(--color-verdict-suspicious)' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--color-text-main)' }}>
              Honest Platform Disclaimer & Scope
            </h3>
          </div>
          <p style={{ fontSize: '0.925rem', color: 'var(--color-text-muted)', lineHeight: '1.6', margin: 0 }}>
            TruthGuard provides <strong>AI-assisted multi-source verification</strong> to help users analyze online claims, news articles, and media. 
            However, <strong>this system is not a 100% infallible guarantee of absolute truth</strong>. Real-world evidence can be incomplete, outdated, paywalled, unavailable, or contradictory.
          </p>
        </Card>

        {/* How the Multi-Agent Architecture Works */}
        <Card variant="glass">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={20} style={{ color: 'var(--color-primary)' }} /> How the Multi-Agent Consensus System Works
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
            Rather than relying on a single AI prompt, TruthGuard deploys specialized autonomous verification agents that investigate claims from multiple distinct analytical angles before reaching a mathematical consensus.
          </p>

          <div className="architecture-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.25)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
              <Cpu className="arch-icon" size={24} style={{ color: 'var(--color-accent-cyan)', marginBottom: '0.5rem' }} />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 0.35rem 0' }}>1. Linguistic & NLP Agent</h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--color-text-dim)', margin: 0, lineHeight: '1.45' }}>
                Scans text structure for emotional manipulation, clickbait phrasing, biased sentiment, and syntactic anomalies.
              </p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.25)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
              <Search className="arch-icon" size={24} style={{ color: 'var(--color-primary-light)', marginBottom: '0.5rem' }} />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 0.35rem 0' }}>2. Web Cross-Reference Agent</h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--color-text-dim)', margin: 0, lineHeight: '1.45' }}>
                Queries trusted web indexes and news databases to locate corroborating reports or active debunking releases.
              </p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.25)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
              <Database className="arch-icon" size={24} style={{ color: 'var(--color-accent-cyan)', marginBottom: '0.5rem' }} />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 0.35rem 0' }}>3. Source Credibility Agent</h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--color-text-dim)', margin: 0, lineHeight: '1.45' }}>
                Evaluates publishing entity domain authority, historical reliability ratings, and editorial metadata.
              </p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.25)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
              <Scale className="arch-icon" size={24} style={{ color: 'var(--color-verdict-real)', marginBottom: '0.5rem' }} />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 0.35rem 0' }}>4. Weighted Consensus Engine</h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--color-text-dim)', margin: 0, lineHeight: '1.45' }}>
                Synthesizes agent verdicts and confidence metrics into a final verdict with transparent reasoning.
              </p>
            </div>
          </div>
        </Card>

        {/* Understanding Verdicts & Uncertain Outcome */}
        <Card variant="glass">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HelpCircle size={20} style={{ color: 'var(--color-verdict-suspicious)' }} /> Understanding Verdicts & "UNCERTAIN" Outcomes
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>
            TruthGuard categorizes claims into three possible audit outcomes based on evidence strength:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
              <Badge variant="real">REAL</Badge>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                Strong multi-source alignment found across high-credibility primary reporting outlets.
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
              <Badge variant="fake">FAKE</Badge>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                Contradicted by verified facts, primary documents, or official debunkings.
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
              <Badge variant="suspicious">UNCERTAIN</Badge>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                <strong>Crucial distinction:</strong> Returned when evidence is insufficient, contradictory across major agents, unverified, or breaking news without primary corroboration. We explicitly present UNCERTAIN rather than guessing.
              </span>
            </div>
          </div>
        </Card>

        {/* Fact-Checking Tips */}
        <Card variant="glass">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileCheck2 size={20} style={{ color: 'var(--color-accent-cyan)' }} /> Media Literacy Guidelines
          </h3>
          <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
            <li>Always check the primary source link and publication date.</li>
            <li>Look for coverage across multiple independent news organizations.</li>
            <li>Be cautious of sensational, emotionally charged headlines designed to provoke rapid sharing.</li>
            <li>Treat social media screenshots as unverified until verified through primary web indexes.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
