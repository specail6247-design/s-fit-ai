'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export function LoginModal() {
  const { isLoginOpen, setIsLoginOpen } = useStore();
  const [email, setEmail] = useState('');

  return (
    <AnimatePresence>
      {isLoginOpen && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={() => setIsLoginOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md bg-void-black border border-white/10 rounded-2xl overflow-hidden glass-card shadow-2xl"
        >
          {/* Header */}
          <div className="px-8 py-10 text-center relative">
            <h2 className="text-3xl font-black text-white tracking-widest font-cinzel uppercase mb-2">Member Access</h2>
            <p className="text-xs text-gray-400 tracking-widest uppercase">The Vault</p>

            <button
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <div className="px-8 pb-10 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors font-mono text-sm"
              />
            </div>

            <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors tracking-widest uppercase text-sm">
              Sign In
            </button>

            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-xs text-gray-500 font-mono">By entering, you agree to our Terms of Service.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
