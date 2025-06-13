import React from 'react';

export type FieldStatusType = 'valid' | 'invalid' | 'untouched';

interface FieldStatusProps {
  status: FieldStatusType;
  className?: string;
}

/**
 * Renders a visual indicator for field validation status.
 */
export const FieldStatus: React.FC<FieldStatusProps> = ({ status, className }) => {
  let color = '';
  let icon = null;
  switch (status) {
    case 'valid':
      color = 'text-green-600';
      icon = (
        <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeWidth="2" d="M4 8.5l3 3 5-5"/></svg>
      );
      break;
    case 'invalid':
      color = 'text-red-600';
      icon = (
        <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeWidth="2" d="M4 4l8 8m0-8l-8 8"/></svg>
      );
      break;
    default:
      color = 'text-gray-400';
      icon = (
        <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2"/></svg>
      );
  }
  return <span className={`${color} ${className || ''}`}>{icon}</span>;
}; 