'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface MemberAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberAccessModal({ isOpen, onClose }: MemberAccessModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-[#c9b037]/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(201,176,55,0.15)] overflow-hidden"
          >
            {/* Ambient luxury glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#c9b037]/10 blur-[50px] pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10 p-2"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="text-center mb-8 relative z-10">
              <h2 className="text-3xl text-white font-serif tracking-[0.2em] uppercase mb-2" style={{ fontFamily: 'var(--font-geist-sans), serif' }}>
                Member Access
              </h2>
              <p className="text-[#c9b037] text-xs tracking-widest uppercase font-mono">
                Exclusive VIP Entrance
              </p>
            </div>

            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1">
                <input
                  type="email"
                  placeholder="EMAIL"
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#c9b037] outline-none transition-colors placeholder:text-white/30 tracking-widest uppercase font-mono"
                  required
                />
              </div>

              <div className="space-y-1">
                <input
                  type="password"
                  placeholder="PASSWORD"
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#c9b037] outline-none transition-colors placeholder:text-white/30 tracking-widest uppercase font-mono"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#c9b037] hover:bg-[#ebd55b] text-black font-serif text-sm tracking-[0.3em] uppercase py-4 transition-colors relative overflow-hidden group"
                >
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </div>

              <div className="text-center pt-4">
                <button
                  type="button"
                  className="text-white/40 hover:text-white text-xs tracking-widest uppercase font-mono transition-colors"
                >
                  Forgot Credentials?
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
