import React from 'react';

interface RetryButtonProps {
  onRetry: () => void;
  loading?: boolean;
  label?: string;
  className?: string;
}

/**
 * RetryButton - Button for retrying failed async operations.
 */
export const RetryButton: React.FC<RetryButtonProps> = ({ onRetry, loading = false, label = 'Retry', className }) => (
  <button
    type="button"
    onClick={onRetry}
    disabled={loading}
    className={`inline-flex items-center px-3 py-1.5 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 ${className || ''}`}
  >
    {loading ? (
      <svg className="animate-spin mr-2 h-4 w-4 text-white" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>
    ) : (
      <svg className="mr-2 h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor"><path d="M4.293 6.707a1 1 0 011.414 0L10 11l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z" /></svg>
    )}
    {label}
  </button>
); 