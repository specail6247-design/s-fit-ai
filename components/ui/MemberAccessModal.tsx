'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.3,
    },
  },
};

export function MemberAccessModal() {
  const { isLoginModalOpen, setLoginModalOpen, setPremium } = useStore();
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setLoginModalOpen(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock Login - in reality this would hit an API
    setTimeout(() => {
      setIsLoading(false);
      setPremium(true); // Grant VIP access for demo
      handleClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-void-black/90 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl rounded-none"
            variants={modalVariants}
          >
            {/* Gold Border Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold to-transparent opacity-70" />

            <div className="p-10 flex flex-col items-center">
              {/* Header */}
              <div className="mb-10 text-center space-y-2">
                <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400">Restricted Area</span>
                <h2 className="text-3xl font-cinzel text-white">MEMBER ACCESS</h2>
                <div className="w-12 h-[1px] bg-luxury-gold/50 mx-auto mt-4" />
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="w-full space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold ml-1">Email / ID</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/50 border-b border-white/20 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-luxury-gold transition-colors font-mono text-sm"
                    placeholder="vip@s-fit.ai"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold ml-1">Passcode</label>
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full bg-black/50 border-b border-white/20 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-luxury-gold transition-colors font-mono text-sm tracking-widest"
                    placeholder="••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-8 bg-white text-black py-4 font-cinzel font-bold text-sm hover:bg-luxury-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'VERIFYING...' : 'SIGN IN'}
                </button>
              </form>

              <button
                onClick={handleClose}
                className="mt-6 text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
