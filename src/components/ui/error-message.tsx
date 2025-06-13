import React from 'react';

interface ErrorMessageProps {
  message: string;
  details?: string;
  severity?: 'info' | 'warning' | 'error';
  className?: string;
}

/**
 * ErrorMessage - Displays a user-friendly error message with optional details and severity.
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, details, severity = 'error', className }) => {
  let color = '';
  switch (severity) {
    case 'info':
      color = 'bg-blue-50 text-blue-700';
      break;
    case 'warning':
      color = 'bg-yellow-50 text-yellow-800';
      break;
    case 'error':
    default:
      color = 'bg-red-50 text-red-700';
  }
  return (
    <div className={`p-3 rounded ${color} ${className || ''}`} role="alert" aria-live="assertive">
      <div className="font-semibold mb-1">{message}</div>
      {details && <div className="text-xs opacity-80 whitespace-pre-wrap">{details}</div>}
    </div>
  );
}; 