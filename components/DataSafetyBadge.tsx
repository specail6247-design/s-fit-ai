import React from 'react';

export default function DataSafetyBadge() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-xs mt-2 w-max">
      <span className="text-sm">🛡️</span>
      <span>Photos are processed securely and not shared.</span>
    </div>
  );
}
