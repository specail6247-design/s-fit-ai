'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import SupportHub from './SupportHub';
import LegalModal from './LegalModal';

export default function GlobalControls() {
  const { setSupportHubOpen, setLegalModalOpen } = useStore();

  return (
    <>
      {/* Modals are always mounted but control their own visibility via store */}
      <SupportHub />
      <LegalModal />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">

        {/* Support Hub Trigger */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSupportHubOpen(true)}
          className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-white/20 transition-colors group"
          aria-label="Open Support Hub"
        >
          <span className="text-xl">?</span>
          <span className="absolute right-full mr-4 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Help & Support
          </span>
        </motion.button>
      </div>

      {/* Legal Links (Bottom Left, unobtrusive) */}
      <div className="fixed bottom-4 left-4 z-40 flex gap-4 text-[10px] text-gray-500 font-mono tracking-widest">
        <button onClick={() => setLegalModalOpen(true)} className="hover:text-white transition-colors">
          LEGAL & PRIVACY
        </button>
      </div>
    </>
  );
}
