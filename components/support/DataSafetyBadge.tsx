import React from 'react';

export const DataSafetyBadge: React.FC = () => {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-black/40 border border-[var(--color-accent)]/30 rounded-full w-fit">
      <span className="text-[var(--color-accent)] text-lg">🛡️</span>
      <span className="text-xs text-white/80 font-medium">Photos are processed securely and not shared.</span>
    </div>
  );
};
