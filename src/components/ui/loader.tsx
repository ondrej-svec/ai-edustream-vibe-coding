import React from 'react';

interface LoaderProps {
  size?: number;
  className?: string;
  label?: string;
}

/**
 * Loader - A simple accessible loading spinner.
 */
export const Loader: React.FC<LoaderProps> = ({ size = 24, className, label = 'Loading...' }) => (
  <div className={`flex items-center justify-center ${className || ''}`} role="status" aria-live="polite">
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin text-gray-400"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
    <span className="sr-only">{label}</span>
  </div>
); 