import React from 'react';

export const DataSafetyBadge = () => {
  return (
    <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
      <span className="text-green-400 text-lg">🛡️</span>
      <span className="text-xs text-green-100/70">
        Photos are processed securely and not shared.
      </span>
    </div>
  );
};
