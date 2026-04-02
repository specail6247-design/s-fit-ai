'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MemberAccess({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 p-10 shadow-2xl rounded-2xl overflow-hidden"
          >
            {/* Elegant close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
              aria-label="Close Member Access"
            >
              <span className="material-symbols-outlined font-light text-xl">close</span>
            </button>

            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif text-white tracking-widest uppercase mb-2">Member Access</h2>
              <p className="text-xs text-white/40 tracking-[0.2em] uppercase font-light">Exclusive VIP Entry</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors peer placeholder-transparent"
                  placeholder="Email Address"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-3 text-white/50 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white pointer-events-none uppercase tracking-wider"
                >
                  Email Address
                </label>
              </div>

              <div className="relative group">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors peer placeholder-transparent"
                  placeholder="Password"
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 top-3 text-white/50 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white pointer-events-none uppercase tracking-wider"
                >
                  Password
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-white text-black py-4 rounded-lg font-bold tracking-widest uppercase text-sm hover:bg-gray-200 transition-colors"
                >
                  Sign In
                </button>
              </div>

              <div className="text-center mt-6">
                <a href="#" className="text-xs text-white/40 hover:text-white transition-colors uppercase tracking-wider">
                  Forgot Password?
                </a>
              </div>
            </form>

            {/* Subtle light effect at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
