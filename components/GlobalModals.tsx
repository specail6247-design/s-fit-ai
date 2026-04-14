'use client';
import React, { useState } from 'react';
import { LegalModal } from './LegalModal';
import { SupportHub } from './SupportHub';

export default function GlobalModals() {
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  return (
    <>
      {/* Triggers */}
      <div className="fixed bottom-4 left-4 z-30 flex gap-4 text-xs text-gray-500">
        <button onClick={() => setIsLegalOpen(true)} className="hover:text-white transition-colors">Privacy & Terms</button>
      </div>

      <div className="fixed bottom-4 right-4 z-30">
        <button
          onClick={() => setIsSupportOpen(true)}
          className="w-10 h-10 bg-[#050505] border border-[#C9B037]/50 rounded-full text-[#C9B037] flex items-center justify-center hover:bg-[#C9B037] hover:text-black transition-colors shadow-lg"
          aria-label="Support Hub"
        >
          ?
        </button>
      </div>

      {/* Modals */}
      <LegalModal isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />
      <SupportHub isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
    </>
  );
}
