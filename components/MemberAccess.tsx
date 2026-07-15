'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemberAccessProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberAccess({ isOpen, onClose }: MemberAccessProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login for VIP access
    console.log('Authenticating VIP:', email);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          <div className="absolute inset-0" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-[#050505] border border-white/20 w-full max-w-md rounded-xl p-8 relative z-10 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              ✕
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-cinzel text-white mb-2 tracking-widest uppercase">
                Member Access
              </h2>
              <div className="h-px w-16 bg-[#007AFF] mx-auto opacity-50 mb-4" />
              <p className="text-xs text-gray-400 tracking-widest uppercase">
                Welcome to the S_FIT VIP Club
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block pl-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-[#007AFF] outline-none transition-colors"
                  placeholder="Enter your VIP email"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block pl-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-[#007AFF] outline-none transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-white hover:bg-gray-200 text-black font-cinzel font-bold text-sm tracking-[0.2em] uppercase rounded-lg transition-all mt-4"
              >
                Sign In
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
