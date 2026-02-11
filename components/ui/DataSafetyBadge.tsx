import React from 'react';

export default function DataSafetyBadge() {
  return (
    <div className="flex items-center gap-2 p-2 bg-[#0a2f1b] border border-[#10b981]/30 rounded-lg w-full">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#10b981]/20 flex items-center justify-center">
        <span className="material-symbols-outlined text-[#10b981] text-lg" aria-hidden="true">
          encrypted
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-bold text-[#10b981] uppercase tracking-wider">
          Secure Processing
        </span>
        <span className="text-[10px] text-gray-400 leading-tight">
          Photos are processed securely and not shared.
        </span>
      </div>
    </div>
  );
}
