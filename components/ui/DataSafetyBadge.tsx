import React from 'react';

export default function DataSafetyBadge() {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-[#10b981]/20 bg-[#0a2f1b] px-3 py-1.5 backdrop-blur-sm transition-all hover:bg-[#0a2f1b]/80"
      title="Photos are processed securely and not shared."
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-3.5 text-[#10b981]"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      <span className="text-[10px] font-medium uppercase tracking-wider text-[#10b981]">
        Securely Processed
      </span>
    </div>
  );
}
