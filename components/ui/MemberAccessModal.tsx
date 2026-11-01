'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemberAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuth: (email: string, password: string, isLogin: boolean) => Promise<void>;
}

export function MemberAccessModal({ isOpen, onClose, onAuth }: MemberAccessModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onAuth(email, password, isLogin);
    } catch (_error) { // eslint-disable-line @typescript-eslint/no-unused-vars
      // Error handled in parent
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="relative w-full max-w-md bg-[#0A0A0A] border border-[var(--color-primary)]/20 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="p-8 text-center border-b border-white/5 relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-soft-gray hover:text-white transition-colors"
            >
              ✕
            </button>
            <h2 className="text-2xl font-display font-semibold text-white tracking-wide">
              {isLogin ? 'Member Access' : 'Join the Club'}
            </h2>
            <p className="text-soft-gray mt-2 text-sm font-mono tracking-widest uppercase">
              VIP ONLY
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white placeholder-soft-gray focus:border-[var(--color-primary)] outline-none transition-colors font-mono text-sm"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white placeholder-soft-gray focus:border-[var(--color-primary)] outline-none transition-colors font-mono text-sm"
                />
              </div>

              <button
                disabled={loading}
                className="w-full py-4 bg-[var(--color-primary)] text-[#0A0A0A] font-bold tracking-widest uppercase hover:brightness-110 transition-all disabled:opacity-50"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Request Access')}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-soft-gray text-xs font-mono uppercase tracking-widest hover:text-white transition-colors"
              >
                {isLogin ? 'Apply for Membership' : 'Already a Member?'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
