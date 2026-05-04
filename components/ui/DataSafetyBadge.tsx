import React from 'react';

export function DataSafetyBadge() {
  return (
    <div className="flex items-center justify-center gap-2 mt-4 px-3 py-2 bg-[#007AFF]/10 border border-[#007AFF]/20 rounded-lg max-w-fit mx-auto">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      <span className="text-[10px] sm:text-xs text-[#007AFF] font-medium tracking-wide">
        Photos are processed securely and not shared.
      </span>
    </div>
  );
}
