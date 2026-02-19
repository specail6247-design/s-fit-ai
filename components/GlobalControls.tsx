'use client';

import React from 'react';
import { useStore } from '@/store/useStore';

export default function GlobalControls() {
  const { setSupportOpen, setLegalOpen } = useStore();

  return (
    <div className="fixed bottom-6 right-6 z-[9990] flex flex-col gap-4">
      {/* Support Button */}
      <button
        onClick={() => setSupportOpen(true)}
        aria-label="Open Support Hub"
        className="w-12 h-12 bg-white/10 hover:bg-[#007AFF] backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110 group"
      >
        <span className="sr-only">Support</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 group-hover:animate-pulse">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
        </svg>
      </button>

      {/* Legal Button */}
      <button
        onClick={() => setLegalOpen(true)}
        aria-label="Legal & Compliance"
        className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110"
      >
        <span className="sr-only">Legal</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      </button>
    </div>
  );
}
