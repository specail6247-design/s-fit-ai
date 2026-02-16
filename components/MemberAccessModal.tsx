'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { useState } from 'react';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const, // Expo out
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function MemberAccessModal() {
  const { isLoginModalOpen, setLoginModalOpen } = useStore();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setLoginModalOpen(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    setTimeout(() => {
        setLoading(false);
        setLoginModalOpen(false);
        // In a real app, we'd set user state here
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-void-black/90 backdrop-blur-md"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Top Gold Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-luxury-gold to-transparent opacity-50" />

            <div className="relative p-10 flex flex-col items-center">
              {/* Header */}
              <div className="text-center mb-12 space-y-2">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="w-12 h-12 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10 text-xl"
                >
                    💎
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-light tracking-tight text-white font-display"
                >
                  MEMBER ACCESS
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-zinc-500 text-xs font-mono tracking-[0.2em] uppercase"
                >
                  The Inner Circle
                </motion.p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="w-full space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-[10px] font-mono text-cyber-lime uppercase tracking-wider pl-1">
                    Email Credentials
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-none border-b border-t-0 border-x-0 focus:border-cyber-lime transition-all px-0 py-3 text-white placeholder-zinc-700 focus:outline-none focus:ring-0 font-mono text-sm text-center"
                    placeholder="ENTER YOUR EMAIL"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full mt-8 bg-white text-black font-bold py-4 rounded-sm hover:bg-cyber-lime transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[0.15em] text-xs shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(204,255,0,0.4)]"
                >
                  {loading ? 'AUTHENTICATING...' : 'SIGN IN'}
                </motion.button>
              </form>

              {/* Footer */}
              <div className="mt-10 text-center">
                 <p className="text-[10px] text-zinc-600 font-mono">
                    Protected by S_FIT Secure Enclave.
                 </p>
              </div>
            </div>

            {/* Close Button */}
            <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-zinc-600 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
