import React from 'react';

interface ValidationMessageProps {
  message?: string;
  className?: string;
}

/**
 * Displays a validation error message for a form field.
 * Renders nothing if no message is provided.
 */
export const ValidationMessage: React.FC<ValidationMessageProps> = ({ message, className }) => {
  if (!message) return null;
  return (
    <div
      role="alert"
      aria-live="polite"
      className={className || 'text-sm text-red-600 mt-1'}
      style={{ minHeight: 20 }}
    >
      {message}
    </div>
  );
}; 