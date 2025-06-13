import React from 'react';

interface ValidationSummaryProps {
  errors: Record<string, string | undefined>;
  className?: string;
}

/**
 * Displays a summary of all validation errors in a form.
 * Renders nothing if there are no errors.
 */
export const ValidationSummary: React.FC<ValidationSummaryProps> = ({ errors, className }) => {
  const errorList = Object.entries(errors).filter(([_, msg]) => !!msg);
  if (errorList.length === 0) return null;
  return (
    <div role="alert" className={className || 'text-sm text-red-600 my-2'}>
      <ul>
        {errorList.map(([field, msg]) => (
          <li key={field}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}; 