import React from 'react';

export const DataSafetyBadge = () => {
  return (
    <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg max-w-sm mt-4">
      <div className="flex-shrink-0 text-green-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
      </div>
      <p className="text-[10px] text-gray-300 leading-tight">
        <span className="font-bold text-green-500 block mb-0.5">Secure Processing</span>
        Photos are processed securely and not shared. Automatically deleted after session.
      </p>
    </div>
  );
};
