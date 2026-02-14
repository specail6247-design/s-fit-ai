'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabaseClient';

export function MemberAccessModal() {
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
      setLoading(false);
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
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[9999]"
            onClick={() => setLoginModalOpen(false)}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full max-w-md bg-void-black border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(255,255,255,0.05)] pointer-events-auto relative overflow-hidden">

              {/* Close Button */}
              <button
                onClick={() => setLoginModalOpen(false)}
                className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-block px-3 py-1 border border-white/10 rounded-full text-[10px] font-mono tracking-widest text-cyber-lime mb-4">
                  MEMBERS ONLY
                </div>
                <h2 className="text-3xl font-serif text-white mb-2">
                  {isLogin ? 'Welcome Back' : 'Join the Club'}
                </h2>
                <p className="text-sm text-soft-gray font-light">
                  {isLogin ? 'Enter your credentials to access.' : 'Start your digital fitting journey.'}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleAuth} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-white/30 text-lg focus:border-cyber-lime focus:outline-none transition-colors font-light"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-white/30 text-lg focus:border-cyber-lime focus:outline-none transition-colors font-light"
                      required
                    />
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-red-500 text-xs text-center">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-bold text-sm tracking-widest uppercase py-4 rounded-xl hover:bg-gray-200 transition-all transform active:scale-95 disabled:opacity-50 mt-4"
                >
                  {loading ? 'Processing...' : (isLogin ? 'Enter Club' : 'Apply for Access')}
                </button>
              </form>

              {/* Social Login */}
              <div className="mt-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px bg-white/10 flex-1" />
                  <span className="text-[10px] text-white/20 tracking-widest">OR VIA</span>
                  <div className="h-px bg-white/10 flex-1" />
                </div>
                <div className="flex justify-center gap-4">
                  <button onClick={() => handleSocialLogin('google')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-lg" title="Google">
                    🇬
                  </button>
                  <button onClick={() => handleSocialLogin('apple')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-lg" title="Apple">
                    🍎
                  </button>
                  <button onClick={() => handleSocialLogin('kakao')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-lg" title="Kakao">
                    💬
                  </button>
                </div>
              </div>

              {/* Toggle Login/Signup */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-xs text-white/40 hover:text-white transition-colors tracking-wider uppercase border-b border-transparent hover:border-white/40 pb-0.5"
                >
                  {isLogin ? "New here? Apply for Access" : "Already a member? Sign In"}
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
