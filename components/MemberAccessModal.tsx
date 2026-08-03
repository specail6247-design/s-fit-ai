'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemberAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MemberAccessModal({ isOpen, onClose }: MemberAccessModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div key="modal-overlay-and-content" className="fixed inset-0 z-[100]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm z-[101] p-6"
          >
            <div className="bg-[#0a0a0a] border border-[#C9B037]/30 p-8 shadow-2xl shadow-[#C9B037]/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9B037] to-transparent opacity-50" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              >
                ✕
              </button>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-serif text-white tracking-wider mb-2">Member Access</h2>
                <p className="text-[#C9B037] text-xs font-mono uppercase tracking-[0.3em]">Exclusive Entry</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="EMAIL ADDRESS"
                    className="w-full bg-transparent border-b border-white/20 text-white py-2 px-0 text-sm focus:outline-none focus:border-[#C9B037] transition-colors placeholder:text-white/20 placeholder:font-mono placeholder:tracking-widest"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="PASSWORD"
                    className="w-full bg-transparent border-b border-white/20 text-white py-2 px-0 text-sm focus:outline-none focus:border-[#C9B037] transition-colors placeholder:text-white/20 placeholder:font-mono placeholder:tracking-widest"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-black font-serif text-lg py-4 hover:bg-[#C9B037] hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {isLoading ? 'VERIFYING...' : 'SIGN IN'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button type="button" className="text-white/40 text-xs font-light hover:text-[#C9B037] transition-colors underline-offset-4 hover:underline">
                  Request Invitation
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
