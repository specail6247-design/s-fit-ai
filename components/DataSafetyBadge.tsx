import React from 'react';

export const DataSafetyBadge: React.FC = () => {
  return (
    <div className="flex items-center gap-2 bg-black/40 border border-green-500/30 rounded-lg px-3 py-2 mt-4">
      <span className="text-green-500 text-lg">🔒</span>
      <div>
        <div className="text-xs font-bold text-green-400">Secure Processing</div>
        <div className="text-[10px] text-gray-400">Photos are processed securely and not shared.</div>
      </div>
    </div>
  );
};
