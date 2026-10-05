import React from 'react';

export const DataSafetyBadge = () => {
  return (
    <div className="flex items-center gap-2 p-3 mt-4 bg-green-900/20 border border-green-500/30 rounded-xl">
      <span className="text-green-400 text-lg">🔒</span>
      <p className="text-[10px] text-green-400/80 leading-tight">
        <strong className="text-green-400 block">Data Safety Guaranteed</strong>
        Photos are processed securely and not shared.
      </p>
    </div>
  );
};
