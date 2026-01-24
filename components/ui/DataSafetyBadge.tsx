import React from 'react';

export function DataSafetyBadge() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-green-900/20 border border-green-500/30 rounded-lg max-w-fit mt-2">
      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(34,197,94,0.4)]">
        <span className="material-symbols-outlined text-[12px] text-black font-bold">lock</span>
      </div>
      <p className="text-[10px] text-green-400 font-medium leading-tight">
        Photos are processed securely and not shared.
      </p>
    </div>
  );
}
