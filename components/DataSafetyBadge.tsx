import React from 'react';

export function DataSafetyBadge() {
  return (
    <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 mt-4 border border-white/5 rounded-lg p-2 bg-black/20 w-fit mx-auto">
      <span className="text-green-500">🔒</span>
      <span>Photos are processed securely and not shared.</span>
    </div>
  );
}
