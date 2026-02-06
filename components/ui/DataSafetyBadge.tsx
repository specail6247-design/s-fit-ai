import React from 'react';

export default function DataSafetyBadge() {
  return (
    <div className="flex items-center gap-2 py-2 px-3 bg-green-500/10 border border-green-500/20 rounded-lg max-w-fit">
      <span className="text-lg">🛡️</span>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-green-400 uppercase tracking-wide">Data Safety</span>
        <span className="text-[9px] text-green-500/80">Photos processed securely. Not stored.</span>
      </div>
    </div>
  );
}
