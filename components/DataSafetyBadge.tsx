import React from 'react';

export default function DataSafetyBadge() {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-white/10 rounded-full text-[10px] text-gray-400 mt-4 mx-auto w-fit" title="Data Safety">
      <span className="text-[#007AFF]">🔒</span>
      <span>Photos are processed securely and not shared.</span>
    </div>
  );
}
