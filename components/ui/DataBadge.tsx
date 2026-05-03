import React from 'react';

export const DataBadge = () => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-medium w-fit">
      <span className="material-symbols-outlined text-[14px]">lock</span>
      Photos are processed securely and not shared
    </div>
  );
};
