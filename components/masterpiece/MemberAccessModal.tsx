'use client';

import React from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface MemberAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, damping: 25, stiffness: 300 }
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export default function MemberAccessModal({ isOpen, onClose }: MemberAccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div key="modal-container" className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-void-black/90 backdrop-blur-md"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-md bg-void-black border border-luxury-gold/30 rounded-2xl p-8 shadow-2xl overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="absolute top-0 right-0 p-4">
              <button
                onClick={onClose}
                className="text-soft-gray hover:text-luxury-gold transition-colors font-mono text-sm"
              >
                [ CLOSE ]
              </button>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold text-luxury-gold tracking-widest uppercase mb-2">
                Member Access
              </h2>
              <p className="text-soft-gray text-xs font-mono tracking-widest uppercase">
                VIP Private Club
              </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1">
                <label className="text-xs font-mono text-soft-gray uppercase tracking-wider block">
                  Identifier
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-pure-white focus:outline-none focus:border-luxury-gold transition-colors font-mono placeholder:text-white/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-soft-gray uppercase tracking-wider block">
                  Passkey
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-pure-white focus:outline-none focus:border-luxury-gold transition-colors font-mono placeholder:text-white/20"
                />
              </div>

              <div className="pt-4">
                <button className="w-full bg-luxury-gold text-void-black py-4 font-bold tracking-[0.2em] uppercase text-sm hover:bg-white transition-colors">
                  Sign In
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-xs text-soft-gray font-mono">
                Not a member? <button className="text-luxury-gold hover:text-white transition-colors underline underline-offset-4 ml-1">Request Access</button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
