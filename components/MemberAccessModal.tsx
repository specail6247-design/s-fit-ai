'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MemberAccessModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#050505] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* VIP Glow Effect */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#007AFF]/20 rounded-full blur-[80px] pointer-events-none" />

            <div className="p-8 relative z-10">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors text-sm font-mono"
              >
                [ESC]
              </button>

              <div className="mb-10 text-center">
                <h2 className="text-2xl font-bold tracking-widest text-white uppercase mb-2">Member Access</h2>
                <div className="h-px w-12 bg-[#007AFF] mx-auto opacity-50" />
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest pl-1">Credentials</label>
                  <input
                    type="email"
                    placeholder="E-MAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm font-mono focus:border-[#007AFF] focus:bg-white/10 outline-none transition-all placeholder:text-white/20"
                  />
                </div>

                <div className="space-y-1">
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm font-mono focus:border-[#007AFF] focus:bg-white/10 outline-none transition-all placeholder:text-white/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-gray-200 transition-colors mt-4 text-sm"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-8 text-center">
                <button className="text-[10px] font-mono text-white/40 hover:text-white transition-colors uppercase tracking-widest underline decoration-white/20 underline-offset-4">
                  Request Invite
                </button>
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#007AFF] to-transparent opacity-50" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
