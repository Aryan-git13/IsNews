import React from 'react';
import { Link } from 'react-router-dom';
import { History, ExternalLink, CheckCircle, AlertTriangle } from 'lucide-react';
import './PageStyles.css';

export const HistoryPage: React.FC = () => {
  const mockHistory = [
    { id: 'rec-001', input: 'Global climate agreement signed by 40 nations', type: 'Text', verdict: 'REAL', score: 92, date: '2026-08-20' },
    { id: 'rec-002', input: 'Miracle cure reported to reverse aging in 2 days', type: 'URL', verdict: 'FAKE', score: 12, date: '2026-08-19' },
    { id: 'rec-003', input: 'Tech giant announces new solar-powered server farm', type: 'Text', verdict: 'REAL', score: 88, date: '2026-08-18' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h2><History className="header-icon" size={24} /> Verification Ledger</h2>
        <p>Audit trail of all recent claims analyzed by the multi-agent consensus network.</p>
      </div>

      <div className="glass-card table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Content Sample</th>
              <th>Type</th>
              <th>Verdict</th>
              <th>Truth Score</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockHistory.map((item) => (
              <tr key={item.id}>
                <td className="code-text">{item.id}</td>
                <td className="content-cell">{item.input}</td>
                <td><span className="type-badge">{item.type}</span></td>
                <td>
                  <span className={`verdict-pill ${item.verdict === 'REAL' ? 'pill-real' : 'pill-fake'}`}>
                    {item.verdict === 'REAL' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />} {item.verdict}
                  </span>
                </td>
                <td className="score-text">{item.score}%</td>
                <td className="date-text">{item.date}</td>
                <td>
                  <Link to={`/result/${item.id}`} className="table-action-link">
                    View Audit <ExternalLink size={14} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
