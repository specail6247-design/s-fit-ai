import React from 'react';

const DataSafetyBadge: React.FC = () => {
  return (
    <div className="flex items-center gap-2 p-2 bg-[#0a2f1b] border border-[#10b981]/30 rounded-lg max-w-fit">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 text-[#10b981]"
        aria-hidden="true"
      >
        <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.352-.272-2.636-.759-3.804a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08l-.475-.41zM12 15a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
      <span className="text-[10px] font-medium text-[#10b981] leading-tight">
        Photos are processed securely and not shared.
      </span>
    </div>
  );
};

export default DataSafetyBadge;
