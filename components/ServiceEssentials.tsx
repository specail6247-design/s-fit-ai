'use client';

import React, { useState } from 'react';
import { AuthButton } from '@/components/AuthButton';
import SupportHub from '@/components/SupportHub';

export default function ServiceEssentials() {
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  return (
    <>
      {/* Top Right Auth - Global Access */}
      <div className="fixed top-4 right-4 z-50 pointer-events-auto">
        <AuthButton />
      </div>

      {/* Bottom Right Support Trigger - Global Help */}
      <div className="fixed bottom-4 right-4 z-50 pointer-events-auto">
        <button
          onClick={() => setIsSupportOpen(true)}
          className="w-10 h-10 rounded-full bg-void-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-lg hover:scale-110 group"
          aria-label="Open Support"
        >
          <span className="text-lg group-hover:rotate-12 transition-transform">?</span>
        </button>
      </div>

      <SupportHub isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
    </>
  );
}
