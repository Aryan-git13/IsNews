import { ExternalLink, CheckCircle2, XCircle, FileText, Globe, Landmark, BookOpen, AlertCircle } from 'lucide-react';
import { Badge } from './Badge';
import type { Evidence } from '../../types/verification';
import './common.css';

export interface EvidenceListProps {
  evidenceList?: Evidence[];
  title?: string;
}

export const SourceList = ({
  evidenceList = [],
  title = 'Verified Key Evidence & Web Sources',
}: EvidenceListProps) => {
  if (!evidenceList || evidenceList.length === 0) {
    return (
      <div className="sources-card">
        <h4 className="sources-title">{title}</h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)', fontStyle: 'italic' }}>
          No direct web evidence or primary sources linked for this claim.
        </p>
      </div>
    );
  }

  const getSourceTypeIcon = (sourceType?: string, url?: string) => {
    const typeStr = (sourceType || url || '').toLowerCase();
    if (typeStr.includes('gov') || typeStr.includes('official') || typeStr.includes('landmark')) {
      return <Landmark size={14} style={{ color: 'var(--color-accent-cyan)' }} />;
    }
    if (typeStr.includes('edu') || typeStr.includes('research') || typeStr.includes('paper')) {
      return <BookOpen size={14} style={{ color: 'var(--color-primary)' }} />;
    }
    if (typeStr.includes('fact') || typeStr.includes('check') || typeStr.includes('audit')) {
      return <AlertCircle size={14} style={{ color: 'var(--color-verdict-suspicious)' }} />;
    }
    if (typeStr.includes('news') || typeStr.includes('reuters') || typeStr.includes('apnews')) {
      return <FileText size={14} style={{ color: 'var(--color-verdict-real)' }} />;
    }
    return <Globe size={14} style={{ color: 'var(--color-text-dim)' }} />;
  };

  const getCategoryLabel = (sourceType?: string, url?: string) => {
    const typeStr = (sourceType || url || '').toLowerCase();
    if (typeStr.includes('gov') || typeStr.includes('official')) return 'Official / Gov';
    if (typeStr.includes('edu') || typeStr.includes('research')) return 'Research / Academic';
    if (typeStr.includes('fact') || typeStr.includes('check')) return 'Fact-Check Org';
    if (typeStr.includes('news') || typeStr.includes('reuters') || typeStr.includes('ap')) return 'News Outlet';
    return 'Web Source';
  };

  return (
    <div className="sources-card">
      <h4 className="sources-title" style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-main)' }}>
        {title}
      </h4>
      <ul className="sources-list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {evidenceList.map((item, idx) => {
          const supports = item.supportsClaim !== false;
          const relevanceScore = typeof item.relevance === 'number' ? Math.round(item.relevance * 100) : null;
          const category = getCategoryLabel(item.sourceType || item.source, item.url);

          const isSafeUrl = item.url && (item.url.startsWith('http://') || item.url.startsWith('https://'));
          const safeHref = isSafeUrl ? item.url : '#';

          return (
            <li
              key={idx}
              className="source-item"
              style={{
                background: 'rgba(0, 0, 0, 0.25)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem 1rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 240px' }}>
                  <a
                    href={safeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="source-link"
                    style={{
                      fontSize: '0.925rem',
                      fontWeight: 600,
                      color: 'var(--color-primary-light)',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    {item.title || item.source || item.url} <ExternalLink size={14} />
                  </a>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.35rem', fontSize: '0.775rem', color: 'var(--color-text-dim)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      {getSourceTypeIcon(item.sourceType || item.source, item.url)} {item.source || category}
                    </span>
                    {item.publishedAt && (
                      <>
                        <span>•</span>
                        <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {relevanceScore !== null && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                      {relevanceScore}% Relevance
                    </span>
                  )}
                  <Badge variant={supports ? 'real' : 'fake'} icon={supports ? <CheckCircle2 size={12} /> : <XCircle size={12} />}>
                    {supports ? 'SUPPORTS' : 'CONTRADICTS'}
                  </Badge>
                </div>
              </div>

              {item.summary && (
                <p className="source-snippet" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.5rem', marginBottom: 0, lineHeight: '1.45' }}>
                  "{item.summary}"
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
