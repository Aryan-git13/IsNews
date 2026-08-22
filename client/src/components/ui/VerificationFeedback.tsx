import React, { useState } from 'react';
import { Star, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, Button, Textarea } from './index';
import { newsService } from '../../services';
import './common.css';

export interface VerificationFeedbackProps {
  verificationId: string;
  onSubmitted?: () => void;
}

export const VerificationFeedback: React.FC<VerificationFeedbackProps> = ({
  verificationId,
  onSubmitted,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      setErrorMessage('Please select a star rating between 1 and 5.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await newsService.submitFeedback({
        verificationId,
        rating,
        isAccurate: rating >= 3,
        comment: comment.trim() || undefined,
      });

      setSubmitted(true);
      if (onSubmitted) {
        onSubmitted();
      }
    } catch {
      // Show user-friendly error without leaking backend implementation stack traces
      setErrorMessage('Unable to record your feedback right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card variant="glass" style={{ padding: '1.25rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--color-verdict-real)', fontWeight: 600 }}>
          <CheckCircle2 size={20} /> Thank you! Your feedback has been recorded.
        </div>
      </Card>
    );
  }

  return (
    <Card variant="glass">
      <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>
        Was this audit helpful & accurate?
      </h4>
      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)', marginBottom: '1rem' }}>
        Help improve our multi-agent AI verification consensus network.
      </p>

      {errorMessage && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: '#fca5a5', marginBottom: '1rem' }}>
          <AlertCircle size={16} /> {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginRight: '0.5rem' }}>Rating:</span>
          {[1, 2, 3, 4, 5].map((star) => {
            const active = star <= (hoverRating || rating);
            return (
              <button
                key={star}
                type="button"
                onClick={() => {
                  setRating(star);
                  if (errorMessage) setErrorMessage(null);
                }}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.2rem',
                  color: active ? '#fbbf24' : 'rgba(255,255,255,0.2)',
                  transition: 'color 0.15s ease',
                }}
              >
                <Star size={22} fill={active ? '#fbbf24' : 'transparent'} />
              </button>
            );
          })}
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', marginLeft: '0.5rem' }}>
            {rating > 0 ? `${rating} / 5 Stars` : ''}
          </span>
        </div>

        <Textarea
          placeholder="Optional comments or suggestions regarding this claim audit..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          disabled={isSubmitting}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={isSubmitting || rating === 0}
            isLoading={isSubmitting}
          >
            <Send size={14} /> Submit Feedback
          </Button>
        </div>
      </form>
    </Card>
  );
};
