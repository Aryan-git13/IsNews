import React from 'react';
import { Inbox } from 'lucide-react';
import './common.css';

export interface EmptyStateProps {
  title?: string;
  message?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Data Found',
  message = 'There are no records available to display.',
  action,
}) => {
  return (
    <div className="state-container empty-state-container">
      <Inbox className="empty-icon" size={44} />
      <h3 className="state-title">{title}</h3>
      <p className="state-description">{message}</p>
      {action && <div style={{ marginTop: '1rem' }}>{action}</div>}
    </div>
  );
};
