import React from 'react';
import './common.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'panel';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'glass',
  className = '',
  children,
  ...props
}) => {
  const cardClass = variant === 'panel' ? 'glass-panel' : 'glass-card';

  return (
    <div className={`${cardClass} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};
