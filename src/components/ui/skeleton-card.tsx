import React from 'react';

interface SkeletonCardProps {
  count?: number;
  className?: string;
}

/**
 * SkeletonCard - Renders one or more skeleton cards for loading states.
 */
export const SkeletonCard: React.FC<SkeletonCardProps> = ({ count = 1, className }) => (
  <div className={`flex gap-4 ${className || ''}`} aria-busy="true" aria-live="polite" data-testid="skeleton-card-wrapper">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="w-64 h-40 bg-gray-200 rounded-lg shadow animate-pulse flex flex-col p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4" />
        <div className="flex-1 bg-gray-100 rounded" />
      </div>
    ))}
  </div>
); 