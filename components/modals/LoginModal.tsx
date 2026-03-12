'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useStore } from '@/store/useStore';

export function LoginModal() {
  const isLoginModalOpen = useStore((state) => state.isLoginModalOpen);
  const setLoginModalOpen = useStore((state) => state.setLoginModalOpen);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isLoginModalOpen) return null;

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
      setLoginModalOpen(false);
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-[#0A0A0A] border border-white/10 w-full max-w-md rounded-3xl p-8 relative overflow-hidden shadow-2xl"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9B037] to-transparent opacity-50" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#C9B037]/10 rounded-full blur-3xl pointer-events-none" />

          <button
            onClick={() => setLoginModalOpen(false)}
            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
          >
            ✕
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">
              Member <span className="text-[#C9B037]">Access</span>
            </h2>
            <p className="text-sm text-gray-400 font-mono">
              {isLogin ? 'Enter the S_FIT Vault' : 'Join the Elite'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4 mb-8 relative z-10">
            <div>
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-xs font-mono tracking-widest focus:border-[#C9B037] focus:bg-white/10 outline-none transition-all placeholder:text-gray-600"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-xs font-mono tracking-widest focus:border-[#C9B037] focus:bg-white/10 outline-none transition-all placeholder:text-gray-600"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C9B037] text-black font-black py-4 rounded-xl hover:bg-white transition-colors disabled:opacity-50 mt-4 tracking-widest text-sm uppercase"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Join')}
            </button>
          </form>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-xs text-gray-500 font-mono tracking-widest">OR</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
            <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl flex items-center justify-center gap-2 transition-all group">
              <span className="text-lg grayscale group-hover:grayscale-0 transition-all">🇬</span>
            </button>
            <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl flex items-center justify-center gap-2 transition-all group">
              <span className="text-lg grayscale group-hover:grayscale-0 transition-all">🍎</span>
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-gray-500 font-mono">
            {isLogin ? "NOT A MEMBER YET?" : "ALREADY A MEMBER?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#C9B037] hover:text-white transition-colors ml-2"
            >
              {isLogin ? 'APPLY NOW' : 'SIGN IN'}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
