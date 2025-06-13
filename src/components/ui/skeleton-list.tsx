import React from 'react';

interface SkeletonListProps {
  count?: number;
  className?: string;
}

/**
 * SkeletonList - Renders a list of skeleton rows for loading states.
 */
export const SkeletonList: React.FC<SkeletonListProps> = ({ count = 5, className }) => (
  <ul className={className || ''} aria-busy="true" aria-live="polite">
    {Array.from({ length: count }).map((_, i) => (
      <li key={i} className="my-2 h-6 bg-gray-200 rounded animate-pulse" />
    ))}
  </ul>
); 