import React from 'react';

export function DataSafetyBadge() {
  return (
    <div className="flex items-center gap-2 bg-[#007AFF]/10 text-[#007AFF] px-3 py-2 rounded-lg text-xs border border-[#007AFF]/20 w-fit">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      <span className="font-medium">Photos are processed securely and not shared.</span>
    </div>
  );
}
