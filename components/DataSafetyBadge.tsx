import React from 'react';

export default function DataSafetyBadge() {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-[#007AFF]/10 border border-[#007AFF]/20 text-[#007AFF] text-[10px] font-medium max-w-fit cursor-help group relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-4 h-4 flex-shrink-0"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
      <span>Photos are processed securely & automatically deleted</span>

      {/* Tooltip */}
      <div className="absolute top-full left-0 mt-2 w-64 p-3 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
        Your privacy is our priority. Images are encrypted in transit, processed ephemerally, and never shared with third parties for marketing.
      </div>
    </div>
  );
}
