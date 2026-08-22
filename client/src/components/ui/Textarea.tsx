import React from 'react';
import './common.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  id,
  className = '',
  ...props
}) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="ui-form-group">
      {label && <label htmlFor={textareaId} className="ui-label">{label}</label>}
      <textarea
        id={textareaId}
        className={`text-textarea ${error ? 'input-error' : ''} ${className}`.trim()}
        {...props}
      />
      {error && <span className="ui-error-text">{error}</span>}
      {helperText && !error && <span className="ui-helper-text">{helperText}</span>}
    </div>
  );
};
