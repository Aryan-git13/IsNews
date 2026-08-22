import React from 'react';
import './common.css';

export interface ProgressIndicatorProps {
  score: number;
  label?: string;
  size?: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  score,
  label = 'Truth Score',
  size = 140,
}) => {
  const getBorderColor = (s: number) => {
    if (s >= 70) return 'var(--color-verdict-real)';
    if (s >= 40) return 'var(--color-verdict-suspicious)';
    return 'var(--color-verdict-fake)';
  };

  const borderColor = getBorderColor(score);

  return (
    <div
      className="verdict-gauge"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderColor: borderColor,
      }}
    >
      <div className="gauge-score" style={{ color: borderColor }}>
        {score}%
      </div>
      <div className="gauge-label">{label}</div>
    </div>
  );
};
