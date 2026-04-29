import React from 'react';

export function DataSafetyBadge() {
  return (
    <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-3 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg w-fit">
      <span className="text-[#007AFF]">🔒</span>
      <span>Photos are processed securely and not shared.</span>
    </div>
  );
}
