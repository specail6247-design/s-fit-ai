import React from 'react';

export function DataSafetyBadge() {
  return (
    <div className="flex items-center gap-2 mt-4 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-xs font-medium w-fit">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      <span>Photos are processed securely and not shared.</span>
    </div>
  );
}
