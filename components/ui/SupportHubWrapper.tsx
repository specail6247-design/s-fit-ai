"use client";

import React, { useState } from 'react';
import { SupportHub } from './SupportHub';

export function SupportHubWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-black/50 backdrop-blur-md border border-white/20 text-white/70 hover:text-white px-3 py-2 rounded-full text-xs font-mono transition-all hover:bg-black/80 flex items-center gap-2"
      >
        <span>?</span> Support & Legal
      </button>
      <SupportHub isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}