'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

interface MemberAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MemberAccessModal({ isOpen, onClose }: MemberAccessModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      }
      onClose();
    } catch (error: unknown) {
      alert((error as Error).message);
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
      alert(`${provider} Login Error: ` + (error as Error).message);
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
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-void-black border border-white/10 p-10 overflow-hidden"
            >
              {/* Premium Shimmer Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold to-transparent opacity-50" />

              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-soft-gray hover:text-white transition-colors"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="text-center mb-10 mt-4">
                <h2 className="text-3xl font-black tracking-widest uppercase font-mono text-white mb-2">
                  VIP ACCESS
                </h2>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="h-px w-8 bg-luxury-gold/50" />
                  <span className="text-xs text-luxury-gold tracking-[0.2em]">S_FIT CLUB</span>
                  <div className="h-px w-8 bg-luxury-gold/50" />
                </div>
                <p className="text-xs text-soft-gray tracking-wider uppercase">
                  {isLogin ? 'Enter your credentials' : 'Request membership'}
                </p>
              </div>

              <form className="space-y-6 relative z-10" onSubmit={handleAuth}>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-soft-gray uppercase tracking-widest pl-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full bg-transparent border-b border-white/20 px-1 py-3 text-white text-sm focus:border-luxury-gold outline-none transition-colors placeholder:text-white/20"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-soft-gray uppercase tracking-widest pl-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent border-b border-white/20 px-1 py-3 text-white text-sm focus:border-luxury-gold outline-none transition-colors placeholder:text-white/20 tracking-widest"
                    required
                  />
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black font-bold py-4 text-xs tracking-[0.2em] uppercase hover:bg-luxury-gold hover:text-black transition-all duration-300 relative overflow-hidden group disabled:opacity-50"
                  >
                    <span className="relative z-10">{loading ? 'PROCESSING...' : (isLogin ? 'SIGN IN' : 'REQUEST ACCESS')}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none" />
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center space-y-4">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[10px] text-soft-gray uppercase tracking-widest hover:text-white transition-colors"
                >
                  {isLogin ? 'Apply for membership' : 'Already a member? Sign in'}
                </button>

                <div className="flex items-center gap-2">
                  <div className="h-px bg-white/10 flex-1" />
                  <span className="text-[10px] text-soft-gray tracking-widest">OR</span>
                  <div className="h-px bg-white/10 flex-1" />
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 rounded-xl flex items-center justify-center transition-colors" title="Google">
                    <span className="text-lg">🇬</span>
                  </button>
                  <button onClick={() => handleSocialLogin('kakao')} className="bg-[#FAE100] hover:bg-[#FADB00] text-[#371D1E] py-2.5 rounded-xl flex items-center justify-center transition-colors" title="Kakao">
                    <span className="text-lg">💬</span>
                  </button>
                  <button onClick={() => handleSocialLogin('apple')} className="bg-white hover:bg-gray-100 text-black py-2.5 rounded-xl flex items-center justify-center transition-colors" title="Apple">
                    <span className="text-lg">🍎</span>
                  </button>
                  <button onClick={() => handleSocialLogin('discord')} className="bg-[#5865F2] hover:bg-[#4752C4] text-white py-2.5 rounded-xl flex items-center justify-center transition-colors" title="Discord">
                    <span className="text-lg">🎮</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
