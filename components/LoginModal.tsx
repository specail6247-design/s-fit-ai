'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Cinzel } from 'next/font/google';
import { useState } from 'react';

const cinzel = Cinzel({ subsets: ['latin'] });

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

export function LoginModal() {
  const { showLoginModal, setShowLoginModal } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setShowLoginModal(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      handleClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {showLoginModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-void-black/90 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md glass-card overflow-hidden border border-luxury-gold/20 shadow-2xl shadow-luxury-gold/5"
            variants={modalVariants}
          >
            {/* Header */}
            <div className="p-8 text-center border-b border-white/5">
              <h2 className={`${cinzel.className} text-3xl font-bold text-luxury-gold mb-2`}>
                Member Access
              </h2>
              <p className="text-soft-gray text-xs tracking-widest uppercase">
                Welcome to the Inner Circle
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-soft-gray uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-pure-white placeholder-white/20 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                  placeholder="enter@email.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-soft-gray uppercase tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-pure-white placeholder-white/20 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 bg-luxury-gold text-void-black font-bold rounded-lg hover:bg-[#e8d282] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 ${cinzel.className}`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-void-black/30 border-t-void-black rounded-full animate-spin" />
                ) : (
                  'SIGN IN'
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="p-6 bg-white/5 text-center">
              <p className="text-[10px] text-soft-gray">
                Not a member?{' '}
                <button className="text-luxury-gold hover:underline">
                  Request Invitation
                </button>
              </p>
            </div>

            {/* Decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold to-transparent opacity-50" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
