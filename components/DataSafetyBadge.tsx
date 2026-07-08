import React from 'react';

export default function DataSafetyBadge() {
  return (
    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400 opacity-70 hover:opacity-100 transition-opacity">
      <span className="text-green-500">🔒</span>
      <span>Photos are processed securely and not shared.</span>
    </div>
  );
}
