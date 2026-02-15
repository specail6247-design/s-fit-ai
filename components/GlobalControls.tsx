'use client';

import React from 'react';
import { useStore } from '@/store/useStore';

export default function GlobalControls() {
  const { setLoginModalOpen, setSupportHubOpen } = useStore();

  return (
    <>
      {/* Member Access Trigger */}
      <button
        onClick={() => setLoginModalOpen(true)}
        className="fixed top-6 right-6 z-[60] flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all group shadow-lg"
        title="Member Access"
      >
        <span className="material-symbols-outlined text-lg">person</span>
        <span className="absolute right-full mr-3 text-xs font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/80 px-2 py-1 rounded pointer-events-none">
          Member Access
        </span>
      </button>

      {/* Support Hub Trigger */}
      <button
        onClick={() => setSupportHubOpen(true)}
        className="fixed bottom-6 right-6 z-[60] flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-[#007AFF] hover:border-[#007AFF] transition-all group shadow-lg"
        title="Support Hub"
      >
        <span className="material-symbols-outlined text-lg">help</span>
        <span className="absolute right-full mr-3 text-xs font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/80 px-2 py-1 rounded pointer-events-none">
          Support Hub
        </span>
      </button>
    </>
  );
}
