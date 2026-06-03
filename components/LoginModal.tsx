import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
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
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(204,255,0,0.05)] overflow-hidden"
          >
            {/* VIP Glow Effect */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#ccff00]/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#ccff00]/10 rounded-full blur-[80px] pointer-events-none" />

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>

            <div className="relative z-10 space-y-8">
              <header className="text-center space-y-2">
                <h2 className="text-2xl font-bold tracking-widest uppercase text-white font-mono">
                  Member Access
                </h2>
                <div className="w-12 h-px bg-[#ccff00]/50 mx-auto" />
              </header>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#ccff00] transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#ccff00] transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-white hover:bg-[#ccff00] text-black text-sm font-bold tracking-widest uppercase transition-colors"
                  >
                    Sign In
                  </button>
                </div>
              </form>

              <div className="text-center">
                <a href="#" className="text-xs text-white/50 hover:text-white transition-colors">
                  Don&apos;t have an account? Apply for membership.
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
