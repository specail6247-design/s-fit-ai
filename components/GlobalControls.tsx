'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';

export const GlobalControls = () => {
  const { toggleSupportHub, toggleLegalModal } = useStore();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
      {/* Legal & Terms Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => toggleLegalModal(true)}
        className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#007AFF] hover:border-[#007AFF] transition-colors shadow-lg group"
        title="Legal & Compliance"
        aria-label="Legal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      </motion.button>

      {/* Support Hub Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => toggleSupportHub(true)}
        className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#007AFF] hover:border-[#007AFF] transition-colors shadow-lg"
        title="Help & Support"
        aria-label="Support"
      >
        <span className="text-xl font-bold">?</span>
      </motion.button>
    </div>
  );
};
