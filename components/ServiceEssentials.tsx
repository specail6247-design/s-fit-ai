'use client';

import React, { useState } from 'react';
import { AuthButton } from '@/components/AuthButton';
import { SupportHub } from '@/components/SupportHub';

export function ServiceEssentials() {
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  return (
    <>
      {/* Global Auth Button (Top Right) */}
      <div className="fixed top-6 right-6 z-50">
        <AuthButton />
      </div>

      {/* Support Hub Trigger (Bottom Right) */}
      <button
        onClick={() => setIsSupportOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-white/10 hover:bg-cyber-lime hover:text-black text-white backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-cyber-lime/50"
        aria-label="Open Support"
      >
        <span className="text-lg font-bold">?</span>
      </button>

      {/* Support Hub Drawer */}
      <SupportHub isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
    </>
  );
}
