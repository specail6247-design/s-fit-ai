import React from 'react';

export default function DataSafetyBadge() {
  return (
    <div className="flex items-center gap-2 p-3 bg-[#0a2f1b] border border-[#10b981]/30 rounded-lg text-[#10b981] text-xs font-medium my-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
      <span>Photos are processed securely and not shared.</span>
    </div>
  );
}
