import React from 'react';

export default function DataSafetyBadge() {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-400 justify-center mt-4 bg-black/40 py-2 px-4 rounded-full border border-white/5 mx-auto max-w-fit cursor-default" title="Photos are processed securely and not shared.">
      <span className="text-green-400">🔒</span>
      <span>Photos are processed securely and not shared.</span>
    </div>
  );
}
