'use client';

import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';

export function GlobalControls() {
  const { setLoginModalOpen, setSupportHubOpen } = useStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* Support Hub Trigger */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setSupportHubOpen(true)}
        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors shadow-lg group relative"
      >
        <span className="text-sm">?</span>
        <div className="absolute right-full mr-3 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 font-mono uppercase tracking-wider">
          Support
        </div>
      </motion.button>

      {/* Member Access Trigger */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setLoginModalOpen(true)}
        className="w-10 h-10 rounded-full bg-cyber-lime text-black flex items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.3)] hover:shadow-[0_0_25px_rgba(204,255,0,0.6)] transition-shadow group relative"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <div className="absolute right-full mr-3 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 font-mono uppercase tracking-wider">
          Member Access
        </div>
      </motion.button>
    </div>
  );
}
