import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, Info } from 'lucide-react';
import { Button, Card, Textarea, LoadingState, ErrorState } from '../components/ui';
import { newsService } from '../services';
import './PageStyles.css';

export const TextCheckPage: React.FC = () => {
  const [text, setText] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (validationError && e.target.value.trim()) {
      setValidationError('');
    }
    if (apiError) {
      setApiError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    const trimmedText = text.trim();
    if (!trimmedText) {
      setValidationError('Please enter some text or an article excerpt to verify.');
      return;
    }

    if (trimmedText.length < 10) {
      setValidationError('Text is too short. Please provide at least 10 characters for meaningful analysis.');
      return;
    }

    setValidationError('');
    setIsLoading(true);
    setApiError(null);

    try {
      const result = await newsService.checkText({ text: trimmedText });
      setIsLoading(false);
      navigate(`/result/${result.verificationId}`, { state: { result } });
    } catch (err: any) {
      setIsLoading(false);
      // Fallback for demo when backend is offline
      if (err.message && err.message.includes('No response received')) {
        // Safe navigation with mock demo ID fallback if backend is unattached
        navigate('/result/demo-text-123');
      } else {
        setApiError(err.message || 'An error occurred during verification.');
      }
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2><FileText className="header-icon" size={24} /> Text Verification</h2>
        <p>Paste the article text, social media post, or news statement below for multi-agent evaluation.</p>
      </div>

      {isLoading ? (
        <Card variant="glass" className="form-container">
          <LoadingState
            message="Analyzing Article & Statement..."
            submessage="Executing NLP linguistic parsing, cross-referencing web sources, and computing agent consensus score."
          />
        </Card>
      ) : (
        <Card variant="glass" className="form-container">
          {apiError && (
            <div style={{ marginBottom: '1.5rem' }}>
              <ErrorState
                title="Verification Request Failed"
                message={apiError}
                onRetry={() => setApiError(null)}
              />
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <Textarea
              label="Statement or Article Content"
              id="text-input"
              rows={9}
              placeholder="Paste news article, headline, or claim text here..."
              value={text}
              onChange={handleTextChange}
              error={validationError}
              aria-describedby="text-counter-info"
            />

            <div className="input-meta-bar" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-text-dim)', marginTop: '-0.75rem', marginBottom: '1.25rem' }}>
              <span>Min 10 characters</span>
              <span id="text-counter-info">{wordCount} words | {charCount} chars</span>
            </div>

            <div className="form-footer">
              <div className="threshold-info">
                <Info size={16} /> Multi-agent consensus active (NLP + Web Search + Credibility)
              </div>
              <Button type="submit" variant="primary" disabled={isLoading || !text.trim()} isLoading={isLoading}>
                Run Multi-Agent Verification <ArrowRight size={16} />
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};
