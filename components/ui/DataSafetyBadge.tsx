import React from 'react';

export const DataSafetyBadge: React.FC = () => {
  return (
    <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
      <span className="material-symbols-outlined text-sm">lock</span>
      <span className="text-[10px] font-medium tracking-wide">
        Photos are processed securely and not shared.
      </span>
    </div>
  );
};
