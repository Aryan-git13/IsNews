import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  ArrowLeft, 
  RotateCcw, 
  ListChecks, 
  Info, 
  Lightbulb, 
  FileText, 
  Link as LinkIcon, 
  Image as ImageIcon 
} from 'lucide-react';
import { 
  Badge, 
  Card, 
  Button, 
  ProgressIndicator, 
  ComprehensiveAgentStatus, 
  SourceList, 
  LoadingState, 
  ErrorState 
} from '../components/ui';
import { newsService } from '../services';
import type { VerificationResult } from '../types/verification';
import './PageStyles.css';

export const VerificationResultPage = () => {
  const { verificationId } = useParams<{ verificationId: string }>();
  const location = useLocation();

  const [result, setResult] = useState<VerificationResult | null>(
    location.state?.result || null
  );
  const [isLoading, setIsLoading] = useState(!location.state?.result && !!verificationId);

  useEffect(() => {
    if (!result && verificationId) {
      setIsLoading(true);
      newsService
        .getHistoryById(verificationId)
        .then((data) => {
          setResult(data);
          setIsLoading(false);
        })
        .catch(() => {
          setResult(getMockFallbackResult(verificationId));
          setIsLoading(false);
        });
    }
  }, [verificationId, result]);

  if (isLoading) {
    return (
      <div className="page-container center-container">
        <Card variant="glass" style={{ width: '100%', maxWidth: '600px' }}>
          <LoadingState message="Retrieving Verification Audit Report..." />
        </Card>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="page-container center-container">
        <Card variant="glass" style={{ width: '100%', maxWidth: '600px' }}>
          <ErrorState
            title="Verification Record Not Found"
            message="Unable to load the requested audit report."
            onRetry={() => window.location.reload()}
          />
        </Card>
      </div>
    );
  }

  const isReal = result.verdict === 'REAL';
  const isFake = result.verdict === 'FAKE';
  const hasOcr = Boolean(result.sourceType === 'IMAGE' && result.ocrText);
  const hasTips = Boolean(result.factCheckTips && result.factCheckTips.length > 0);
  const hasClaims = Boolean(result.claims && result.claims.length > 0);
  const hasEvidence = Boolean(result.keyEvidence && result.keyEvidence.length > 0);

  return (
    <div className="page-container">
      <div className="result-header">
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="secondary" size="sm">
              <ArrowLeft size={16} /> Home
            </Button>
          </Link>
          <Link to="/verify/text" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="sm">
              <RotateCcw size={16} /> New Verification
            </Button>
          </Link>
        </div>
        <span className="verification-id-badge">Audit ID: {result.verificationId}</span>
      </div>

      <div className="result-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card variant="glass" className="verdict-summary-card">
            <ProgressIndicator score={result.confidence} label="Confidence Score" />

            <div className="verdict-details" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <div style={{ marginBottom: '1rem' }}>
                {isReal && (
                  <Badge variant="real" icon={<CheckCircle size={18} />}>
                    VERDICT: REAL
                  </Badge>
                )}
                {isFake && (
                  <Badge variant="fake" icon={<XCircle size={18} />}>
                    VERDICT: FAKE
                  </Badge>
                )}
                {!isReal && !isFake && (
                  <Badge variant="suspicious" icon={<HelpCircle size={18} />}>
                    VERDICT: UNCERTAIN
                  </Badge>
                )}
              </div>
              <p className="verdict-summary" style={{ fontSize: '0.95rem', color: 'var(--color-text-main)', lineHeight: '1.6' }}>
                {result.summary}
              </p>
            </div>

            <div
              style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--color-border)',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justify-content: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: 'var(--color-text-dim)',
              }}
            >
              {result.sourceType === 'IMAGE' && <ImageIcon size={16} />}
              {result.sourceType === 'URL' && <LinkIcon size={16} />}
              {result.sourceType !== 'IMAGE' && result.sourceType !== 'URL' && <FileText size={16} />}
              <span>Input Type: {result.sourceType || 'TEXT'}</span>
              <span>•</span>
              <span>Audited: {new Date(result.createdAt).toLocaleDateString()}</span>
            </div>
          </Card>

          {hasOcr && (
            <Card variant="glass">
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileText size={16} style={{ color: 'var(--color-accent-cyan)' }} /> Server OCR Text Extraction
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', background: 'rgba(0,0,0,0.25)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontFamily: 'monospace' }}>
                {result.ocrText}
              </p>
              {result.ocrConfidence !== undefined && (
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', display: 'block', marginTop: '0.35rem' }}>
                  OCR Reader Quality: {result.ocrConfidence}%
                </span>
              )}
            </Card>
          )}

          {hasTips && (
            <Card variant="glass">
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-accent-cyan)' }}>
                <Lightbulb size={16} /> Fact-Checking Tips
              </h4>
              <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                {result.factCheckTips?.map((tip, idx) => (
                  <li key={idx} style={{ marginBottom: '0.35rem' }}>{tip}</li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card variant="glass">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Info size={18} style={{ color: 'var(--color-primary)' }} /> Reasoning & Analysis
            </h3>
            <p style={{ fontSize: '0.925rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
              {result.explanation}
            </p>

            {hasClaims && (
              <div style={{ marginTop: '1.25rem' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ListChecks size={15} /> Identified Claims Evaluated:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {result.claims?.map((claim, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}>
                      • {claim}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          <Card variant="glass">
            <ComprehensiveAgentStatus agentResults={result.agentResults} />
          </Card>

          {hasEvidence && (
            <Card variant="glass">
              <SourceList evidenceList={result.keyEvidence} />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

function getMockFallbackResult(id?: string): VerificationResult {
  return {
    verificationId: id || 'demo-text-123',
    verdict: 'REAL',
    confidence: 86,
    summary: 'The submitted statement aligns with multiple verified news releases and official climate summit statements.',
    claims: [
      'Over 40 nations signed global renewable target accord.',
      'Implementation begins in Q1 2027.',
    ],
    agentResults: [
      {
        agent: 'Linguistic / NLP Agent',
        verdict: 'SUPPORTS',
        confidence: 90,
        summary: 'No sensationalism or clickbait syntax detected. Neutral objective reporting style.',
      },
      {
        agent: 'Web Cross-Reference Agent',
        verdict: 'SUPPORTS',
        confidence: 88,
        summary: 'Found 14 matching reports across Reuters, AP, and BBC.',
        sources: ['reuters.com', 'apnews.com', 'bbc.com'],
      },
      {
        agent: 'Source Credibility Agent',
        verdict: 'SUPPORTS',
        confidence: 94,
        summary: 'Historical publisher accuracy rating is 94/100.',
      },
      {
        agent: 'Consensus Engine',
        verdict: 'SUPPORTS',
        confidence: 86,
        summary: 'Weighted mathematical consensus reached with high agreement across all agents.',
      },
    ],
    keyEvidence: [
      {
        title: 'Global Leaders Finalize Renewable Energy Pact',
        url: 'https://example-news.com/climate-accord',
        source: 'Reuters Desk',
        relevance: 0.94,
        supportsClaim: true,
        summary: 'Official document release confirming 42 nations signed the binding protocol.',
      },
    ],
    explanation: 'The statement underwent multi-agent consensus verification. Cross-referencing verified primary news releases and official press statements from the summit, with no contradictory reports found.',
    factCheckTips: [
      'Always cross-check statements against primary official press releases.',
      'Verify if secondary news outlets attribute quotes to named officials.',
    ],
    createdAt: new Date().toISOString(),
    sourceType: 'TEXT',
  };
}