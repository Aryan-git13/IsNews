import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';
import './common.css';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Verification Error',
  message = 'An issue occurred while processing your request. Please try again.',
  onRetry,
}) => {
  return (
    <div className="state-container error-state-container" role="alert" aria-live="assertive">
      <AlertCircle className="error-icon" size={44} aria-hidden="true" />
      <h3 className="state-title">{title}</h3>
      <p className="state-description">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} style={{ marginTop: '1rem' }}>
          Try Again
        </Button>
      )}
    </div>
  );
};
