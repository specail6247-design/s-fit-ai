'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function MemberAccessModal() {
  const { isLoginModalOpen, setLoginModalOpen } = useStore();

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={() => setLoginModalOpen(false)}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-sm p-8 bg-[#0a0a0a] border border-[#d4af37]/30 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.1)] overflow-hidden"
          >
             {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#d4af37]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#d4af37]/5 rounded-full blur-3xl" />

            {/* Header */}
            <div className="text-center mb-10 relative z-10">
              <h2 className="text-3xl font-black text-white tracking-tighter italic mb-2 font-serif">
                MEMBER <span className="text-[#d4af37]">ACCESS</span>
              </h2>
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.4em]">Exclusive Fitting Room</p>
            </div>

            {/* Form */}
            <div className="space-y-6 relative z-10">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-[#d4af37] tracking-wider ml-1">Identity</label>
                <input
                  type="email"
                  placeholder="ENTER EMAIL ID"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/10 transition-all font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-[#d4af37] tracking-wider ml-1">Passkey</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/10 transition-all font-mono"
                />
              </div>

              <button className="w-full py-4 bg-[#d4af37] hover:bg-[#b5952f] text-black font-black uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all transform hover:scale-[1.02] mt-4">
                Enter Club
              </button>

              <div className="text-center mt-6">
                <button
                  onClick={() => setLoginModalOpen(false)}
                  className="text-[10px] text-gray-500 hover:text-white transition-colors uppercase tracking-widest border-b border-transparent hover:border-gray-500"
                >
                  Guest Access
                </button>
              </div>
            </div>

            {/* Close Button */}
            <button
                onClick={() => setLoginModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
                ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
