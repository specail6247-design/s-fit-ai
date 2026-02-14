'use client';

import React from 'react';

export default function DataSafetyBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 bg-[#0a2f1b] border border-[#10b981]/20 rounded-full px-3 py-1.5 ${className}`} title="Photos are processed securely and not shared.">
      <span className="text-[#10b981] text-xs">🛡️</span>
      <span className="text-[#10b981] text-[10px] font-bold uppercase tracking-wide">
        Securely Processed
      </span>
    </div>
  );
}
