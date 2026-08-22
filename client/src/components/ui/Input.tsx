import React from 'react';
import './common.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="ui-form-group">
      {label && <label htmlFor={inputId} className="ui-label">{label}</label>}
      <input
        id={inputId}
        className={`text-input-field ${error ? 'input-error' : ''} ${className}`.trim()}
        {...props}
      />
      {error && <span className="ui-error-text">{error}</span>}
      {helperText && !error && <span className="ui-helper-text">{helperText}</span>}
    </div>
  );
};
