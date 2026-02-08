import React from 'react';

export const DataSafetyBadge: React.FC = () => {
  return (
    <div className="flex items-center gap-3 p-3 bg-[#0a2f1b] border border-[#10b981]/20 rounded-lg mt-4">
      <div className="p-2 bg-[#10b981]/10 rounded-full text-[#10b981]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#10b981] uppercase tracking-wide">Data Safety Guarantee</p>
        <p className="text-[10px] text-[#10b981]/80">Photos are processed securely & not stored.</p>
      </div>
    </div>
  );
};
