import React from 'react';

export const DataSafetyBadge = () => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm max-w-xs">
      <div className="flex-shrink-0 text-xl">🛡️</div>
      <div className="flex flex-col">
        <span className="text-xs font-bold text-white/90">Data Safety Verified</span>
        <span className="text-[10px] text-white/60 leading-tight">
          Photos are processed securely and automatically deleted.
        </span>
      </div>
    </div>
  );
};
