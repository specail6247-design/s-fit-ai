"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemberAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberAccessModal({ isOpen, onClose }: MemberAccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-[#C9B037]/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(201,176,55,0.15)] overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9B037] to-transparent opacity-50" />

            <div className="text-center mb-8">
              <h2 className="text-3xl font-black tracking-widest text-white uppercase mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                Member <span className="text-[#C9B037]">Access</span>
              </h2>
              <p className="text-[#8A8A8A] text-xs tracking-[0.2em] uppercase font-mono">Exclusive VIP Entrance</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1">
                <label className="text-[10px] text-[#C9B037] uppercase tracking-widest font-bold font-mono">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-black/50 border-b border-white/20 focus:border-[#C9B037] outline-none text-white py-3 transition-colors text-sm font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-[#C9B037] uppercase tracking-widest font-bold font-mono">VIP Key</label>
                <input
                  type="password"
                  placeholder="Enter your key"
                  className="w-full bg-black/50 border-b border-white/20 focus:border-[#C9B037] outline-none text-white py-3 transition-colors text-sm font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-[#C9B037] hover:bg-[#ebd25b] text-black font-bold tracking-widest uppercase py-4 rounded-xl transition-all transform hover:scale-[1.02] text-sm"
              >
                Sign In
              </button>
            </form>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
