"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { X, Lock, Mail, Key } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function MemberAccessModal({ isOpen, onClose, onSuccess }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Welcome to the club. Please check your email for confirmation.');
      }
      onSuccess?.();
      onClose();
    } catch (err: unknown) {
      setError((err as Error).message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      setError(`${provider} Login Error: ` + (err as Error).message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-void-black border border-white/10 w-full max-w-md rounded-3xl relative overflow-hidden shadow-2xl"
            >
              {/* Decorative top gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-lime to-transparent opacity-50" />

              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-soft-gray hover:text-white transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="p-10">
                <div className="text-center mb-10">
                  <Lock className="w-8 h-8 text-cyber-lime mx-auto mb-4 opacity-80" />
                  <h2 className="text-3xl font-black text-white tracking-tighter uppercase font-serif">
                    {isLogin ? 'Member Access' : 'Request Access'}
                  </h2>
                  <p className="text-xs text-soft-gray tracking-widest uppercase mt-2 font-mono">
                    S_FIT AI Exclusive Protocol
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleAuth} className="space-y-5">
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-soft-gray w-5 h-5 group-focus-within:text-cyber-lime transition-colors" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white text-sm focus:border-cyber-lime outline-none transition-colors"
                      required
                    />
                  </div>

                  <div className="relative group">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-soft-gray w-5 h-5 group-focus-within:text-cyber-lime transition-colors" />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white text-sm focus:border-cyber-lime outline-none transition-colors"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 uppercase tracking-widest text-sm mt-4"
                  >
                    {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Join the Club')}
                  </button>
                </form>

                <div className="mt-8 flex items-center gap-4">
                  <div className="h-px bg-white/10 flex-1" />
                  <span className="text-xs text-soft-gray font-mono tracking-widest uppercase">Or</span>
                  <div className="h-px bg-white/10 flex-1" />
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl flex items-center justify-center transition-colors">
                    <span className="text-sm text-white font-bold">Google</span>
                  </button>
                  <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl flex items-center justify-center transition-colors">
                    <span className="text-sm text-white font-bold">Apple</span>
                  </button>
                </div>

                <p className="mt-8 text-center text-xs text-soft-gray">
                  {isLogin ? "Not a member yet?" : "Already a member?"}{' '}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-white hover:text-cyber-lime transition-colors border-b border-white hover:border-cyber-lime pb-0.5 ml-2 font-bold"
                  >
                    {isLogin ? 'Apply Now' : 'Sign In'}
                  </button>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
