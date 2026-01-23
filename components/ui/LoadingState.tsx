import React from 'react';

interface LoadingStateProps {
  type?: 'card' | 'text' | 'image';
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ type = 'card', className = '' }) => {
  const baseClasses = "relative overflow-hidden bg-[var(--color-surface)]/10 rounded-[var(--radius-md)]";

  if (type === 'image') {
    return (
      <div className={`${baseClasses} aspect-[3/4] ${className}`}>
        <div className="absolute inset-0 animate-shimmer" />
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className={`${baseClasses} h-4 w-3/4`}>
           <div className="absolute inset-0 animate-shimmer" />
        </div>
        <div className={`${baseClasses} h-4 w-1/2`}>
           <div className="absolute inset-0 animate-shimmer" />
        </div>
      </div>
    );
  }

  // Card Skeleton
  return (
    <div className={`${baseClasses} p-4 w-full h-full min-h-[300px] flex flex-col gap-4 ${className}`}>
       <div className="absolute inset-0 animate-shimmer" />
       {/* Content Overlay that mimics structure but lets shimmer show through semi-transparently */}
       <div className="w-full aspect-[3/4] bg-black/20 rounded-md" />
       <div className="h-4 w-2/3 bg-black/20 rounded" />
       <div className="h-4 w-1/2 bg-black/20 rounded" />
    </div>
  );
};
