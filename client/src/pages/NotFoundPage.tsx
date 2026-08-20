import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';
import './PageStyles.css';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="page-container center-container">
      <div className="glass-card not-found-card">
        <AlertCircle size={64} className="not-found-icon" />
        <h1>404 - Page Not Found</h1>
        <p>The verification view or ledger endpoint you are looking for does not exist.</p>
        <Link to="/" className="btn-primary">
          <Home size={16} /> Return to Home
        </Link>
      </div>
    </div>
  );
};
