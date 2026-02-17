'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useStore } from '@/store/useStore';

export default function MemberAccessModal() {
  const { isLoginModalOpen, setLoginModalOpen } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isLoginModalOpen) {
      setErrorMsg(null);
      // Optional: Clear fields or keep them
    }
  }, [isLoginModalOpen]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      }
      setLoginModalOpen(false);
    } catch (error: unknown) {
      setErrorMsg((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'kakao' | 'apple' | 'discord') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: unknown) {
      setErrorMsg(`${provider} Login Error: ` + (error as Error).message);
    }
  };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLoginModalOpen(false)}
            className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md p-8 md:p-12 bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden"
          >
             {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-lime to-transparent opacity-50" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyber-lime/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-light tracking-[0.2em] text-white uppercase mb-2">
                Member Access
              </h2>
              <p className="text-xs text-soft-gray tracking-widest uppercase">
                {isLogin ? 'Enter the Sanctuary' : 'Join the Collective'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleAuth} className="space-y-6">
              <div className="group relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-transparent focus:outline-none focus:border-cyber-lime transition-colors peer"
                  id="email"
                  placeholder="Email"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-3 text-sm text-soft-gray transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-cyber-lime peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-soft-gray"
                >
                  Email Address
                </label>
              </div>

              <div className="group relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-transparent focus:outline-none focus:border-cyber-lime transition-colors peer"
                  id="password"
                  placeholder="Password"
                  required
                />
                 <label
                  htmlFor="password"
                  className="absolute left-0 top-3 text-sm text-soft-gray transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-cyber-lime peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-soft-gray"
                >
                  Password
                </label>
              </div>

              {errorMsg && (
                <p className="text-red-500 text-xs text-center">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white hover:bg-cyber-lime text-black font-bold py-4 mt-4 tracking-widest uppercase text-xs transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Request Access')}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8 opacity-30">
              <div className="h-px bg-white flex-1" />
              <span className="text-[10px] text-white uppercase tracking-widest">Or</span>
              <div className="h-px bg-white flex-1" />
            </div>

            {/* Social Login */}
             <div className="grid grid-cols-4 gap-3">
              {[
                { id: 'google', icon: 'G' },
                { id: 'apple', icon: '' },
                { id: 'kakao', icon: 'K' },
                { id: 'discord', icon: 'D' }
              ].map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => handleSocialLogin(provider.id as 'google' | 'kakao' | 'apple' | 'discord')}
                  className="aspect-square flex items-center justify-center border border-white/10 hover:border-white/40 hover:bg-white/5 transition-all rounded-sm text-soft-gray hover:text-white"
                >
                  <span className="font-mono">{provider.icon}</span>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
               <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs text-soft-gray hover:text-cyber-lime transition-colors tracking-widest uppercase border-b border-transparent hover:border-cyber-lime pb-0.5"
              >
                {isLogin ? "No Access? Apply Here" : "Already a Member?"}
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setLoginModalOpen(false)}
              className="absolute top-6 right-6 text-soft-gray hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
