import React from 'react';
import './common.css';

export interface BadgeProps {
  variant?: 'primary' | 'real' | 'fake' | 'suspicious' | 'neutral';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  icon,
  className = '',
}) => {
  return (
    <span className={`ui-badge badge-${variant} ${className}`.trim()}>
      {icon && <span className="badge-icon-wrap">{icon}</span>}
      {children}
    </span>
  );
};
