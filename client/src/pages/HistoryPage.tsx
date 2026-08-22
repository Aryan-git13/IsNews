import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  History, 
  ExternalLink, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  FileText, 
  Link as LinkIcon, 
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Badge, Card, Button, LoadingState, ErrorState, EmptyState } from '../components/ui';
import { newsService } from '../services';
import type { VerificationResult } from '../types/verification';
import './PageStyles.css';

const LOCAL_STORAGE_CACHE_KEY = 'truthguard_verification_history_cache';
const ITEMS_PER_PAGE = 8;

export const HistoryPage = () => {
  const navigate = useNavigate();
  const [historyList, setHistoryList] = useState<VerificationResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchHistory = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await newsService.getHistory();
      const resultsArray = Array.isArray(data) ? data : [];
      setHistoryList(resultsArray);
      
      // Update optional fallback cache
      try {
        localStorage.setItem(LOCAL_STORAGE_CACHE_KEY, JSON.stringify(resultsArray));
      } catch {
        // Ignore localStorage quota or private mode errors
      }
    } catch (err: any) {
      // Attempt to load optional local cache on network error
      let fallbackData: VerificationResult[] = [];
      try {
        const cached = localStorage.getItem(LOCAL_STORAGE_CACHE_KEY);
        if (cached) {
          fallbackData = JSON.parse(cached);
        }
      } catch {
        fallbackData = [];
      }

      if (fallbackData.length > 0) {
        setHistoryList(fallbackData);
      } else {
        setError(err.message || 'Failed to fetch verification audit log from backend.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const totalPages = Math.ceil(historyList.length / ITEMS_PER_PAGE) || 1;
  const paginatedList = historyList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleRowClick = (item: VerificationResult) => {
    navigate(`/result/${item.verificationId}`, { state: { result: item } });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2><History className="header-icon" size={24} /> Verification Ledger</h2>
        <p>Audit trail of all recent claims analyzed by the multi-agent consensus network.</p>
      </div>

      {isLoading ? (
        <Card variant="glass" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
          <LoadingState message="Loading Verification History from Backend API..." />
        </Card>
      ) : error ? (
        <Card variant="glass" style={{ padding: '2rem 1.5rem' }}>
          <ErrorState
            title="Ledger Retrieval Error"
            message={error}
            onRetry={fetchHistory}
          />
        </Card>
      ) : historyList.length === 0 ? (
        <Card variant="glass" style={{ padding: '3rem 1.5rem' }}>
          <EmptyState
            title="No Verifications Recorded"
            message="You haven't run any fact-check requests yet. Submit text, an image, or a news URL to view audit logs."
            actionLabel="Start New Verification"
            onAction={() => navigate('/verify/text')}
          />
        </Card>
      ) : (
        <Card variant="glass" className="table-container">
          <table className="history-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                <th style={{ padding: '1rem 0.75rem' }}>Audit ID</th>
                <th style={{ padding: '1rem 0.75rem' }}>Claim / Summary</th>
                <th style={{ padding: '1rem 0.75rem' }}>Source Type</th>
                <th style={{ padding: '1rem 0.75rem' }}>Verdict</th>
                <th style={{ padding: '1rem 0.75rem' }}>Confidence</th>
                <th style={{ padding: '1rem 0.75rem' }}>Audit Date</th>
                <th style={{ padding: '1rem 0.75rem', textAlign: 'right' }}>Report</th>
              </tr>
            </thead>
            <tbody>
              {paginatedList.map((item) => {
                const claimText =
                  item.claims && item.claims.length > 0
                    ? item.claims[0]
                    : item.summary || 'Audit record sample';
                const isReal = item.verdict === 'REAL';
                const isFake = item.verdict === 'FAKE';

                return (
                  <tr
                    key={item.verificationId}
                    onClick={() => handleRowClick(item)}
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td className="code-text" style={{ padding: '0.85rem 0.75rem', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>
                      {item.verificationId}
                    </td>
                    <td className="content-cell" style={{ padding: '0.85rem 0.75rem', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.875rem' }}>
                      {claimText}
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <span className="type-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}>
                        {item.sourceType === 'IMAGE' && <ImageIcon size={12} />}
                        {item.sourceType === 'URL' && <LinkIcon size={12} />}
                        {item.sourceType !== 'IMAGE' && item.sourceType !== 'URL' && <FileText size={12} />}
                        {item.sourceType || 'TEXT'}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      {isReal && (
                        <Badge variant="real" icon={<CheckCircle size={13} />}>
                          REAL
                        </Badge>
                      )}
                      {isFake && (
                        <Badge variant="fake" icon={<XCircle size={13} />}>
                          FAKE
                        </Badge>
                      )}
                      {!isReal && !isFake && (
                        <Badge variant="suspicious" icon={<HelpCircle size={13} />}>
                          UNCERTAIN
                        </Badge>
                      )}
                    </td>
                    <td className="score-text" style={{ padding: '0.85rem 0.75rem', fontWeight: 600, fontSize: '0.875rem' }}>
                      {item.confidence}%
                    </td>
                    <td className="date-text" style={{ padding: '0.85rem 0.75rem', fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem', textAlign: 'right' }}>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(item);
                        }}
                      >
                        View <ExternalLink size={12} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div
              className="pagination-controls"
              style={{
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                padding: '1.25rem 1rem 0.5rem 1rem',
                borderTop: '1px solid var(--color-border)',
                marginTop: '0.5rem',
              }}
            >
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>
                Page {currentPage} of {totalPages} ({historyList.length} total records)
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  <ChevronLeft size={14} /> Previous
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  Next <ChevronRight size={14} />
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
