import React from 'react';

export function DataSafetyBadge() {
  return (
    <div className="flex items-center gap-2 mt-2 text-[#007AFF] bg-[#007AFF]/10 p-2 rounded-lg border border-[#007AFF]/20">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
      <span className="text-[10px] font-medium tracking-wide">
        Photos are processed securely and not shared.
      </span>
    </div>
  );
}
