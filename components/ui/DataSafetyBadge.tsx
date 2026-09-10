import React from 'react';

export default function DataSafetyBadge() {
  return (
    <div className="flex items-center gap-2 mt-4 p-3 bg-[#007AFF]/10 border border-[#007AFF]/20 rounded-lg">
      <span className="text-[#007AFF] text-lg">🛡️</span>
      <p className="text-[10px] text-gray-300 leading-tight">
        <strong className="text-[#007AFF] font-bold">100% Secure.</strong><br/>
        Photos are processed securely and are never stored or shared.
      </p>
    </div>
  );
}
