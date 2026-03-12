'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useStore } from '@/store/useStore';

export default function LoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isLoginModalOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setIsLoginModalOpen(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to sign in.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-black border border-white/20 p-8 rounded-2xl w-[400px] shadow-[0_0_50px_rgba(255,255,255,0.1)] relative"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
            onClick={() => setIsLoginModalOpen(false)}
          >
            ✕
          </button>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-widest text-white uppercase font-serif">Member Access</h2>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#ecab13] to-transparent mx-auto mt-4"></div>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm text-white focus:border-[#ecab13] focus:outline-none transition-colors tracking-widest"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="PASSWORD"
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm text-white focus:border-[#ecab13] focus:outline-none transition-colors tracking-widest"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-bold py-4 rounded hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm mt-4"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6 tracking-wide">
            Exclusive access for S_FIT Neo members.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
