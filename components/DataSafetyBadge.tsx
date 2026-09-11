import React from 'react';

export function DataSafetyBadge() {
  return (
    <div className="flex items-center gap-2 bg-[#1A1A1A] border border-green-500/30 rounded-lg px-3 py-2 mt-4 shadow-[0_0_10px_rgba(0,255,0,0.05)] w-fit mx-auto sm:mx-0">
      <span className="text-green-500 text-lg">🛡️</span>
      <span className="text-[10px] sm:text-xs text-gray-300 font-medium">
        Photos are processed securely and not shared.
      </span>
    </div>
  );
}
