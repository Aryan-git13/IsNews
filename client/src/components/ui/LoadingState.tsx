import React from 'react';
import { Loader2 } from 'lucide-react';
import './common.css';

export interface LoadingStateProps {
  message?: string;
  submessage?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Executing Multi-Agent Verification...',
  submessage = 'Analyzing claims with neural NLP and web consensus engines.',
}) => {
  return (
    <div className="state-container loading-state-container">
      <Loader2 className="spinner-icon animate-spin" size={40} />
      <h3 className="state-title">{message}</h3>
      {submessage && <p className="state-description">{submessage}</p>}
    </div>
  );
};
