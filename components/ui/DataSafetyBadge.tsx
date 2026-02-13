import React from 'react';

export function DataSafetyBadge() {
  return (
    <div
      className="flex items-center gap-2 bg-[#0a2f1b] border border-[#10b981]/20 rounded-full px-3 py-1.5 w-fit cursor-help"
      title="Photos are processed securely and not shared."
    >
      <div className="text-[#10b981]">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="M9 12l2 2 4-4"></path>
        </svg>
      </div>
      <span className="text-[10px] font-medium text-[#10b981] tracking-wide uppercase">
        Securely Processed
      </span>
    </div>
  );
}
