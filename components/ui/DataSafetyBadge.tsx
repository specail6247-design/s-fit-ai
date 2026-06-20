import React from 'react';

export const DataSafetyBadge: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-gray-400">
      <span className="material-symbols-outlined text-[14px]">lock</span>
      <span>Photos are processed securely and not shared.</span>
    </div>
  );
};
