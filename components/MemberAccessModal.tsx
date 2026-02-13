'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export const MemberAccessModal = () => {
  const { isLoginModalOpen, setLoginModalOpen, setPremium } = useStore();

  const handleClose = () => setLoginModalOpen(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic -> Auto-grant premium for demo
    setPremium(true);
    handleClose();
  };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999]"
          />

          {/* Modal */}
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[10000] p-4"
          >
             <div className="relative bg-[#050505] border border-[#ecab13]/30 p-8 md:p-12 shadow-[0_0_50px_rgba(236,171,19,0.15)] overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ecab13] to-transparent opacity-50" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ecab13] to-transparent opacity-20" />
                <div className="absolute -right-20 -top-20 w-60 h-60 bg-[#ecab13]/5 rounded-full blur-3xl pointer-events-none" />

                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-serif text-[#ecab13] tracking-wider uppercase mb-3 drop-shadow-[0_0_10px_rgba(236,171,19,0.3)]">Member Access</h2>
                  <p className="text-[10px] text-white/40 font-mono tracking-[0.3em] uppercase">Private Terminal // Authorized Only</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-8">
                  <div className="space-y-2 group">
                    <label className="text-[10px] uppercase tracking-widest text-[#ecab13]/70 block group-focus-within:text-[#ecab13] transition-colors">Identity</label>
                    <input
                      type="email"
                      placeholder="ENTER ID"
                      className="w-full bg-white/5 border border-white/10 p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#ecab13] focus:bg-white/10 transition-all duration-300 font-mono text-sm tracking-wide"
                      required
                    />
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-[10px] uppercase tracking-widest text-[#ecab13]/70 block group-focus-within:text-[#ecab13] transition-colors">Passcode</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#ecab13] focus:bg-white/10 transition-all duration-300 font-mono text-sm tracking-wide"
                      required
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#ffc12e" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full mt-8 bg-[#ecab13] text-black py-4 font-bold tracking-[0.2em] shadow-[0_0_20px_rgba(236,171,19,0.3)] hover:shadow-[0_0_30px_rgba(236,171,19,0.5)] transition-all uppercase text-xs"
                  >
                    Authenticate
                  </motion.button>
                </form>

                <div className="mt-8 text-center">
                  <button onClick={handleClose} className="text-[10px] text-white/30 hover:text-white transition-colors uppercase tracking-widest hover:underline decoration-[#ecab13] underline-offset-4">
                    Cancel Sequence
                  </button>
                </div>
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
