import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function DataSafetyBadge() {
  return (
    <div className="flex items-center gap-2 mt-4 p-3 bg-[#007AFF]/10 border border-[#007AFF]/30 rounded-lg">
      <ShieldCheck className="w-5 h-5 text-[#007AFF]" />
      <span className="text-xs text-gray-300">
        Photos are processed securely and not shared.
      </span>
    </div>
  );
}
