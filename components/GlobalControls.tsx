'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function GlobalControls() {
  const { setLoginModalOpen, setSupportHubOpen } = useStore();

  return (
    <div className="fixed bottom-6 right-6 z-[80] flex flex-col gap-4">
      {/* Support Hub Trigger */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSupportHubOpen(true)}
        className="w-12 h-12 bg-black/80 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:border-cyber-lime hover:text-cyber-lime transition-colors shadow-lg group relative"
        aria-label="Open Support Hub"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <path d="M12 17h.01"/>
        </svg>

        {/* Tooltip */}
        <span className="absolute right-full mr-3 bg-black/90 text-white text-[10px] px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Support Hub
        </span>
      </motion.button>

      {/* Member Access Trigger */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setLoginModalOpen(true)}
        className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-cyber-lime transition-colors shadow-lg group relative"
        aria-label="Member Access"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>

        {/* Tooltip */}
        <span className="absolute right-full mr-3 bg-black/90 text-white text-[10px] px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Member Access
        </span>
      </motion.button>
    </div>
  );
}
